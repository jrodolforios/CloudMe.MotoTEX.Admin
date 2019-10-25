import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { BaseCardComponent } from '../../common-views/base-card/base-card.component';
import { Subscription, BehaviorSubject } from 'rxjs';
import { NbDialogService, NbToastrService, NbAccordionComponent } from '@nebular/theme';
import { EnderecoService, PontoTaxiService } from '../../../api/to_de_taxi/services';
import { FormEnderecoComponent } from '../../common-views/forms/form-endereco/form-endereco.component';
import { ConfirmDialogComponent } from '../../common-views/confirm-dialog/confirm-dialog.component';
import { BusyStack } from '../../@core/utils/busy_stack';
import { PontoTaxiSummary } from '../../../api/to_de_taxi/models/ponto-taxi-summary';
import { FormIdentificacaoComponent } from './form-identificacao/form-identificacao.component';
import { CatalogosService } from '../../catalogos/catalogos.service';

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
	public enumModo = Modo;

	exibirFiltros = false;

	@ViewChild('card_listagem', null) cardListagem: BaseCardComponent;
	@ViewChild('card_detalhes', null) cardDetalhes: BaseCardComponent;
	@ViewChild('card_foto', null) cardFoto: BaseCardComponent;

	@ViewChild('abas', null) abas: NbAccordionComponent;

	@ViewChild('pesquisaPontoTaxi', null) inputPesquisaPontoTaxi: ElementRef;

	@ViewChild('formIdentificacao', null) formIdentificacao: FormIdentificacaoComponent;
	@ViewChild('formEndereco', null) formEndereco: FormEnderecoComponent;

	_modo: Modo = Modo.mdVisualizacao;
	get modo(): Modo
	{
		return this._modo;
	}

	ptTaxiSelecionado = new BehaviorSubject<PontoTaxiSummary>(null);

	// indicação de carregamento de dados da API em background
	busyStackListagem = new BusyStack();
	busyStackDetalhes = new BusyStack();

	pontoTaxi: PontoTaxiSummary = null;
	pontosTaxi: PontoTaxiSummary[] = [];

	pontosTaxiPesquisa: PontoTaxiSummary[] = [];

	get endereco() { return this.pontoTaxi ? this.pontoTaxi.endereco : null; }

	get quantidadePontosTaxi()
	{
		return this.catalogosSrv.pontosTaxi.items.length;
	}

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
		private toastSrv: NbToastrService,
		private catalogosSrv: CatalogosService,
		private enderecoSrv: EnderecoService)
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

		self.pontoTaxiSelSub = self.ptTaxiSelecionado.subscribe(async tax_sel =>
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
					}).catch(() => {});

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

	public async atualizar()
	{
		const self = this;
		await self.obterPontosTaxi();

		const taxistaSel = self.ptTaxiSelecionado.value;

		if (!taxistaSel || !self.pontosTaxi.find(tx => tx.id === taxistaSel.id))
		{
			self.ptTaxiSelecionado.next(self.pontosTaxi.length > 0 ? self.pontosTaxi[0] : null);
		}
	}

	private async obterPontosTaxi()
	{
		const self = this;

		self.busyStackListagem.push();

		const ptsTaxi = self.catalogosSrv.pontosTaxi.items.sort((pt_tx1, pt_tx2) =>
		{
			return pt_tx1.nome.localeCompare(pt_tx2.nome);
		});

		self.pontosTaxi = ptsTaxi;

		self.filtrarPontosTaxi();
		self.busyStackListagem.pop();
	}

	selecionar(ponto_taxi: PontoTaxiSummary)
	{
		this.ptTaxiSelecionado.next(ponto_taxi);
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
		}).catch(() => {});
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
				self.expandir();
			}
		}).catch(() => {});
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
					prompt: 'A remoção do registro implicará no rompimento de outras associações/agrupamentos no sistema. Confirma remoção?'
				},
			})
			.onClose.toPromise().then(result =>
			{
				confirmaRemocao = result;
			}).catch(() => {});

		if (confirmaRemocao)
		{
			self.busyStackListagem.push();

			await self.catalogosSrv.pontosTaxi.delete(ponto_taxi.id).then(async resp =>
			{
				if (resp)
				{
					self.toastSrv.success('Registro removido com sucesso!', 'Pontos de taxi');
					self.atualizar();

					// busca novamente associações com:
					// - Taxistas
					await self.catalogosSrv.taxistas.getAll();
				}
			}).catch(() => {});

			self.busyStackListagem.pop();
		}
	}

	async criar()
	{
		const self = this;
		if (!self.podeCriar) return; // sanity check

		await self.setModo(Modo.mdCriacao).then(result =>
		{
			if (result)
			{
				self.selecionar({});
				self.expandir();
			}
		}).catch(() => {});
	}

	public async confirmarEdicao()
	{
		const self = this;
		if (!self.podeConfirmar) return; // sanity check

		self.busyStackDetalhes.push();

		let contemErros = false;

		if (self.modo === Modo.mdCriacao)
		{
			self.pontoTaxi.nome = self.formIdentificacao.obterAlteracoes();
			self.pontoTaxi.endereco = self.formEndereco.obterAlteracoes();

			// cria o registro do taxista
			await self.catalogosSrv.pontosTaxi.post(self.pontoTaxi).then(async resultado =>
			{
				if (resultado)
				{
					self.toastSrv.success('Registro criado com sucesso!', 'Pontos de taxi');
				}
			}).catch(() => { contemErros = true; });
		}
		else if (self.modo === Modo.mdEdicao)
		{
			let atualizou = false;
			if (self.formIdentificacao.alterado)
			{
				self.pontoTaxi.nome = self.formIdentificacao.obterAlteracoes();

				await self.catalogosSrv.pontosTaxi.put(self.pontoTaxi).then(resultado =>
				{
					if (resultado)
					{
						atualizou = true;
						self.toastSrv.success('Identificação alterada com sucesso!', 'Pontos de taxi');
					}
				}).catch(() => { contemErros = true; });
			}

			if (self.formEndereco.alterado)
			{
				await self.enderecoSrv.ApiV1EnderecoPut(self.formEndereco.obterAlteracoes()).toPromise().then(resp =>
				{
					if (resp && resp.success)
					{
						atualizou = true;
						self.toastSrv.success('Endereço alterado com sucesso!', 'Pontos de taxi');
					}
				}).catch(() => { contemErros = true; });
			}

			if (atualizou)
			{
				self.catalogosSrv.pontosTaxi.get(self.pontoTaxi.id); // obtém os atualizados dados do servidor
			}
		}

		if (!contemErros)
		{
			self.redefinir();
			self.atualizar();
			self.setModo(Modo.mdVisualizacao);
		}

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
				}).catch(() => {});
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

	expandir()
	{
		this.abas.openAll();
	}

	encolher()
	{
		this.abas.closeAll();
	}

	_filtroPesquisa: string = '';
	set filtroPesquisa(value: string)
	{
		const self = this;
		self._filtroPesquisa = value;
		self.filtrarPontosTaxi();
	}
	get filtroPesquisa(): string
	{
		return this._filtroPesquisa;
	}

	filtrarPontosTaxi()
	{
		const self = this;

		self.pontosTaxiPesquisa = self.pontosTaxi.filter(ptTaxi =>
		{
			let passa_filtro = true;

			if (self.filtroPesquisa)
			{
				passa_filtro = ptTaxi.nome.toUpperCase().includes(self.filtroPesquisa.toUpperCase());
			}

			return passa_filtro;
		});
	}

	limparFiltros()
	{
		const self = this;
		self.filtroPesquisa = '';

		self.filtrarPontosTaxi();
	}

	contarTaxistas(pontoTaxi: PontoTaxiSummary): number
	{
		const self = this;

		const taxistas = self.catalogosSrv.taxistas.items.filter(tx =>
		{
			return tx.idPontoTaxi === pontoTaxi.id;
		});

		return taxistas ? taxistas.length : 0;
	}
}
