import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { BaseCardComponent } from '../../common-views/base-card/base-card.component';
import { Subscription, BehaviorSubject } from 'rxjs';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { EnderecoService, PontoTaxiService } from '../../../api/to_de_taxi/services';
import { FormEnderecoComponent } from '../../common-views/forms/form-endereco/form-endereco.component';
import { ConfirmDialogComponent } from '../../common-views/confirm-dialog/confirm-dialog.component';
import { BusyStack } from '../../@core/utils/busy_stack';
import { PontoTaxiSummary } from '../../../api/to_de_taxi/models/ponto-taxi-summary';
import { FormIdentificacaoComponent } from './form-identificacao/form-identificacao.component';

export enum Modo
{
	mdEdicao,
	mdCriacao,
	mdVisualizacao
}

@Component({
	selector: 'ngx-pontos-taxi',
	templateUrl: './pontos-taxi.component.html',
	styleUrls: ['./pontos-taxi.component.scss'],
})
export class PontosTaxiComponent implements OnInit, AfterViewInit, OnDestroy
{
	@ViewChild('card_listagem', null) cardListagem: BaseCardComponent;
	@ViewChild('card_detalhes', null) cardDetalhes: BaseCardComponent;
	@ViewChild('card_foto', null) cardFoto: BaseCardComponent;

	@ViewChild('pesquisaPontoTaxi', null) inputPesquisaPontoTaxi: ElementRef;

	@ViewChild('formIdentificacao', null) formIdentificacao: FormIdentificacaoComponent;
	@ViewChild('formEndereco', null) formEndereco: FormEnderecoComponent;

	_modo: Modo = Modo.mdVisualizacao;
	get modo(): Modo
	{
		return this._modo;
	}

	taxistaSelecionado = new BehaviorSubject<PontoTaxiSummary>(null);

	// indicação de carregamento de dados da API em background
	busyStackListagem = new BusyStack();
	busyStackDetalhes = new BusyStack();

	pontoTaxi: PontoTaxiSummary = null;
	pontosTaxi: PontoTaxiSummary[] = [];

	pontosTaxiPesquisa: PontoTaxiSummary[] = [];

	get endereco() { return this.pontoTaxi ? this.pontoTaxi.endereco : null; }

	pontoTaxiSelSub: Subscription;
	busyStackListagemSub: Subscription = null;
	busyStackDetalhesSub: Subscription = null;

	get registroAlterado(): boolean
	{
		const self = this;

		if (!self.pontoTaxi) return false;
		return (self.formEndereco.alterado || self.formIdentificacao.alterado);
	}

	constructor(
		private dialogSrv: NbDialogService,
		private pontoTaxiSrv: PontoTaxiService,
		private enderecoSrv: EnderecoService,
		private toastSrv: NbToastrService)
	{
	}

	ngOnInit(): void
	{
		const self = this;
	}

	ngOnDestroy(): void
	{
		const self = this;
	}

	ngAfterViewInit(): void
	{
		const self = this;

		self.atualizar();

		self.busyStackListagemSub = self.busyStackListagem.busy.subscribe(() =>
		{
			if (self.cardListagem)
			{
				self.cardListagem.toggleRefresh(self.busyStackListagem.busy.value > 0);
			}
		});

		self.busyStackDetalhesSub = self.busyStackDetalhes.busy.subscribe(() =>
		{
			if (self.cardDetalhes)
			{
				self.cardDetalhes.toggleRefresh(self.busyStackDetalhes.busy.value > 0);
			}
		});

		self.pontoTaxiSelSub = self.taxistaSelecionado.subscribe(async tax_sel =>
		{
			if (self.pontoTaxi !== tax_sel)
			{
				self.pontoTaxi = tax_sel;
			}
		});
	}

	async setModo(value: Modo): Promise<boolean>
	{
		const self = this;
		if (self._modo !== value)
		{
			if (self.registroAlterado)
			{
				let descartar = false;

				await self.dialogSrv.open(
					ConfirmDialogComponent,
					{
						context:
						{
							title: 'Pontos de taxi',
							prompt: 'Existem alterações não salvas para o registro atual. Deseja descartá-las?'
						},
					})
					.onClose.toPromise().then(result =>
					{
						descartar = result;
					});

				if (!descartar)
				{
					return false;
				}
			}

			self._modo = value;
		}
		return true;
	}

	get desabilitarControles(): boolean
	{
		const self = this;
		return self.modo === Modo.mdVisualizacao;
	}

	get podeCriar(): boolean
	{
		const self = this;
		return self.modo === Modo.mdVisualizacao;
	}

	get podeEditar(): boolean
	{
		const self = this;
		return self.modo === Modo.mdVisualizacao && self.pontoTaxi !== null;
	}

	get podeConfirmar(): boolean
	{
		const self = this;
		return (self.modo === Modo.mdCriacao || self.modo === Modo.mdEdicao) && self.registroAlterado;
	}

	get podeCancelar(): boolean
	{
		const self = this;
		return self.modo === Modo.mdCriacao || self.modo === Modo.mdEdicao;
	}

	get validarSenhaAnterior(): boolean
	{
		const self = this;
		return self.modo === Modo.mdEdicao;
	}

	public instanciarPontoTaxi(sumario?: PontoTaxiSummary): PontoTaxiSummary
	{
		let pontoTaxi: PontoTaxiSummary;
		if (sumario)
		{
			pontoTaxi =
			{
				id: sumario.id,
				nome: sumario.nome,
				endereco: sumario.endereco,
			};
		}
		else
		{
			pontoTaxi =
			{
				id: undefined,
				nome: '',
				endereco:
				{
					id: undefined,
					cep: '',
					logradouro: '',
					numero: '',
					complemento: '',
					bairro: '',
					localidade: '',
					uf: ''
				},
			};
		}

		return pontoTaxi;
	}

	public async atualizar()
	{
		const self = this;
		await self.obterPontosTaxi();

		const taxistaSel = self.taxistaSelecionado.value;

		if (!taxistaSel || !self.pontosTaxi.find(tx => tx.id === taxistaSel.id))
		{
			self.taxistaSelecionado.next(self.pontosTaxi.length > 0 ? self.pontosTaxi[0] : null);
		}
	}

	private async obterPontosTaxi()
	{
		const self = this;

		self.busyStackListagem.push();

		const novos_pontos_taxi: PontoTaxiSummary[] = [];

		// obtém informações de acesso dos usuários
		await self.pontoTaxiSrv.ApiV1PontoTaxiGet().toPromise().then(async resp => {
			if (resp && resp.success)
			{
				resp.data.sort((pt_tx1, pt_tx2) =>
				{
					return pt_tx1.nome.localeCompare(pt_tx2.nome);
				});

				resp.data.forEach(taxista_sum => {
					novos_pontos_taxi.push(self.instanciarPontoTaxi(taxista_sum));
				});
			}
		});

		self.pontosTaxiPesquisa = self.pontosTaxi = novos_pontos_taxi;

		self.busyStackListagem.pop();
	}

	selecionar(ponto_taxi: PontoTaxiSummary)
	{
		this.taxistaSelecionado.next(ponto_taxi);
	}

	async visualizar(ponto_taxi: PontoTaxiSummary)
	{
		const self = this;
		await self.setModo(Modo.mdVisualizacao).then(result =>
		{
			if (result)
			{
				self.selecionar(ponto_taxi);
			}
		});
	}

	async editar(ponto_taxi: PontoTaxiSummary)
	{
		const self = this;
		if (!self.podeEditar) return; // sanity check

		await self.setModo(Modo.mdEdicao).then(result =>
		{
			if (result)
			{
				self.selecionar(ponto_taxi);
			}
		});
	}

	async deletar(ponto_taxi: PontoTaxiSummary)
	{
		const self = this;

		let confirmaRemocao = false;

		await self.dialogSrv.open(
			ConfirmDialogComponent,
			{
				context:
				{
					title: 'Pontos de taxi',
					prompt: 'Confirma remoção?'
				},
			})
			.onClose.toPromise().then(result =>
			{
				confirmaRemocao = result;
			});

		if (confirmaRemocao)
		{
			self.busyStackListagem.push();

			await self.pontoTaxiSrv.ApiV1PontoTaxiByIdDelete(ponto_taxi.id).toPromise().then(resp =>
			{
				if (resp && resp.success)
				{
					self.toastSrv.success('Registro removido com sucesso!', 'Pontos de taxi');
					self.atualizar();
				}
			});

			self.busyStackListagem.pop();
		}
	}

	limparPesquisa()
	{
		const self = this;
		self.pontosTaxiPesquisa = self.pontosTaxi;
		self.inputPesquisaPontoTaxi.nativeElement.value = '';
	}

	filtrarPontosTaxi(filter: string)
	{
		const self = this;

		self.pontosTaxiPesquisa = self.pontosTaxi.filter(ponto_taxi => {
			return ponto_taxi.nome.toUpperCase().includes(filter.toUpperCase());
		});
	}

	async criar()
	{
		const self = this;
		if (!self.podeCriar) return; // sanity check

		await self.setModo(Modo.mdCriacao).then(result =>
		{
			if (result)
			{
				self.selecionar(self.instanciarPontoTaxi());
			}
		});
	}

	public async confirmarEdicao()
	{
		const self = this;
		if (!self.podeConfirmar) return; // sanity check

		self.busyStackDetalhes.push();

		if (self.modo === Modo.mdCriacao)
		{
			const novoPontoTaxi = self.instanciarPontoTaxi();
			novoPontoTaxi.nome = self.formIdentificacao.obterAlteracoes();
			novoPontoTaxi.endereco = self.formEndereco.obterAlteracoes();

			// cria o registro do taxista
			await self.pontoTaxiSrv.ApiV1PontoTaxiPost(novoPontoTaxi).toPromise().then(async resp_cria_tx =>
			{
				if (resp_cria_tx && resp_cria_tx.success)
				{
					self.toastSrv.success('Registro criado com sucesso!', 'Pontos de taxi');
				}
			});
		}
		else if (self.modo === Modo.mdEdicao)
		{
			if (self.formIdentificacao.alterado)
			{
				const ptTxSummary = Object.assign({}, self.pontoTaxi);
				ptTxSummary.nome = self.formIdentificacao.obterAlteracoes();

				await self.pontoTaxiSrv.ApiV1PontoTaxiPut(ptTxSummary).toPromise().then(resp =>
				{
					if (resp && resp.success)
					{
						self.toastSrv.success('Identificação alterada com sucesso!', 'Pontos de taxi');
					}
				});
			}

			if (self.formEndereco.alterado)
			{
				await self.enderecoSrv.ApiV1EnderecoPut(self.formEndereco.obterAlteracoes()).toPromise().then(resp =>
				{
					if (resp && resp.success)
					{
						self.toastSrv.success('Endereço alterado com sucesso!', 'Pontos de taxi');
					}
				});
			}

		}

		self.redefinir();
		self.atualizar();
		self.setModo(Modo.mdVisualizacao);

		self.busyStackDetalhes.pop();
	}

	async cancelarEdicao()
	{
		const self = this;
		if (!self.podeCancelar) return; // sanity check

		let cancelar = true;

		if (self.registroAlterado)
		{
			await self.dialogSrv.open(
				ConfirmDialogComponent,
				{
					context:
					{
						title: 'Pontos de taxi',
						prompt: 'Cancelar alterações?'
					},
				})
				.onClose.toPromise().then(async result =>
				{
					cancelar = result;
				});
		}

		if (cancelar)
		{
			self.redefinir();
			await self.setModo(Modo.mdVisualizacao);
		}
	}

	private redefinir()
	{
		const self = this;
		self.formIdentificacao.redefinir();
		self.formEndereco.redefinir();
	}
}
