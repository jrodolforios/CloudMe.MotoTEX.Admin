import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { BaseCardComponent } from '../../common-views/base-card/base-card.component';
import { Subscription, BehaviorSubject } from 'rxjs';
import { NbDialogService, NbToastrService, NbGlobalPhysicalPosition, NbAccordionComponent } from '@nebular/theme';
import { FotoService, UsuarioService, TaxistaService, EnderecoService, VeiculoService } from '../../../api/to_de_taxi/services';
import { FormEnderecoComponent } from '../../common-views/forms/form-endereco/form-endereco.component';
import { FormCredenciaisComponent } from '../../common-views/forms/form-credenciais/form-credenciais.component';
import { FormFotoComponent } from '../../common-views/forms/form-foto/form-foto.component';
import { FormUsuarioComponent } from '../../common-views/forms/form-usuario/form-usuario.component';
import { ConfirmDialogComponent } from '../../common-views/confirm-dialog/confirm-dialog.component';
import { TaxistaSummary, FotoSummary, VeiculoSummary, PontoTaxiSummary } from '../../../api/to_de_taxi/models';
import { BusyStack } from '../../@core/utils/busy_stack';
import { SendMessageComponent } from '../../common-views/send-message/send-message.component';

export enum Modo
{
	mdEdicao,
	mdCriacao,
	mdVisualizacao
}

@Component({
	selector: 'ngx-taxistas',
	templateUrl: './taxistas.component.html',
	styleUrls: ['./taxistas.component.scss'],
})
export class TaxistasComponent implements OnInit, AfterViewInit, OnDestroy
{
	@ViewChild('card_listagem', null) cardListagem: BaseCardComponent;
	@ViewChild('card_detalhes', null) cardDetalhes: BaseCardComponent;
	@ViewChild('card_foto', null) cardFoto: BaseCardComponent;

	@ViewChild('pesquisaTaxista', null) inputPesquisaTaxista: ElementRef;
	@ViewChild('abas', null) abas: NbAccordionComponent;

	@ViewChild('formUsuario', null) formUsuario: FormUsuarioComponent;
	@ViewChild('formEndereco', null) formEndereco: FormEnderecoComponent;
	@ViewChild('formCredenciais', null) formCredenciais: FormCredenciaisComponent;
	@ViewChild('formFoto', null) formFoto: FormFotoComponent;

	_modo: Modo = Modo.mdVisualizacao;
	get modo(): Modo
	{
		return this._modo;
	}

	taxistaSelecionado = new BehaviorSubject<TaxistaSummary>(null);

	// indicação de carregamento de dados da API em background
	busyStackListagem = new BusyStack();
	busyStackDetalhes = new BusyStack();

	taxista: TaxistaSummary = null;
	taxistas: TaxistaSummary[] = [];
	taxistasPesquisa: TaxistaSummary[] = [];

	get credenciais() { return this.taxista ? this.taxista.usuario.credenciais : null; }
	get endereco() { return this.taxista ? this.taxista.endereco : null; }
	get foto() { return this.taxista ? this.taxista.foto : null; }
	get usuario() { return this.taxista ? this.taxista.usuario : null; }

	taxistaSelSub: Subscription;
	busyStackListagemSub: Subscription = null;
	busyStackDetalhesSub: Subscription = null;
	busyStackFotoSub: Subscription = null;

	get registroAlterado(): boolean
	{
		const self = this;

		if (!self.taxista) return false;
		return (
			self.formUsuario.alterado ||
			self.formEndereco.alterado ||
			self.formCredenciais.alterado ||
			self.formFoto.alterado);
	}

	constructor(
		private dialogSrv: NbDialogService,
		private usuarioSrv: UsuarioService,
		private taxistaSrv: TaxistaService,
		private fotoSrv: FotoService,
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

		self.busyStackFotoSub = self.formFoto.busyStackFoto.busy.subscribe(() =>
		{
			if (self.cardFoto)
			{
				self.cardFoto.toggleRefresh(self.formFoto.busyStackFoto.busy.value > 0);
			}
		});

		self.atualizar();

		self.taxistaSelSub = self.taxistaSelecionado.subscribe(async tax_sel =>
		{
			if (self.taxista !== tax_sel)
			{
				self.taxista = tax_sel;
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
							title: 'Taxistas',
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
		return self.modo === Modo.mdVisualizacao && self.taxista !== null;
	}

	get podeConfirmar(): boolean
	{
		const self = this;
		return (self.modo === Modo.mdCriacao || self.modo === Modo.mdEdicao) && self.registroAlterado && self.formulariosValidos;
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

	public instanciarTaxista(sumario?: TaxistaSummary): TaxistaSummary
	{
		let taxista: TaxistaSummary;
		if (sumario)
		{
			taxista =
			{
				id: sumario.id,
				ativo: sumario.ativo,
				usuario: sumario.usuario,
				endereco: sumario.endereco,
				foto: sumario.foto,
				idPontoTaxi: sumario.idPontoTaxi,
				idLocalizacaoAtual: sumario.idLocalizacaoAtual,
			};

			if (taxista.usuario)
			{
				if (!taxista.usuario.credenciais)
				{
					taxista.usuario.credenciais = {
						login: '',
						senha: '',
						confirmarSenha: '',
						senhaAnterior: ''
					};
				}
			}
		}
		else
		{
			taxista =
			{
				id: undefined,
				ativo: true,
				usuario:
				{
					id: undefined,
					nome: '',
					rg: '',
					cpf: '',
					email: '',
					telefone: '',
					credenciais:
					{
						login: '',
						senha: '',
						confirmarSenha: '',
						senhaAnterior: ''
					}
				},
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
				foto:
				{
					id: undefined,
					nome: '',
					nomeArquivo: '',
					dados: ''
				},
				idLocalizacaoAtual: undefined,
				idPontoTaxi: undefined,
			};
		}

		return taxista;
	}

	public async atualizar()
	{
		const self = this;
		await self.obterTaxistas();

		const taxistaSel = self.taxistaSelecionado.value;

		if (!taxistaSel || !self.taxistas.find(tx => tx.id === taxistaSel.id))
		{
			self.taxistaSelecionado.next(self.taxistas.length > 0 ? self.taxistas[0] : null);
		}
	}

	private async obterTaxistas()
	{
		const self = this;

		self.busyStackListagem.push();

		const novos_taxistas: TaxistaSummary[] = [];

		// obtém informações de acesso dos usuários
		await self.taxistaSrv.ApiV1TaxistaGet().toPromise().then(async resp => {
			if (resp && resp.success)
			{
				resp.data.sort((tx1, tx2) =>
				{
					return tx1.usuario.nome.localeCompare(tx2.usuario.nome);
				});

				resp.data.forEach(taxista_sum => {
					novos_taxistas.push(self.instanciarTaxista(taxista_sum));
				});
			}
		});

		self.taxistasPesquisa = self.taxistas = novos_taxistas;

		self.busyStackListagem.pop();
	}

	selecionar(taxista: TaxistaSummary)
	{
		this.taxistaSelecionado.next(taxista);
	}

	async visualizar(taxista: TaxistaSummary)
	{
		const self = this;
		await self.setModo(Modo.mdVisualizacao).then(result =>
		{
			if (result)
			{
				self.selecionar(taxista);
			}
		});
	}

	async editar(taxista: TaxistaSummary)
	{
		const self = this;
		if (!self.podeEditar) return; // sanity check

		await self.setModo(Modo.mdEdicao).then(result =>
		{
			if (result)
			{
				self.selecionar(taxista);
			}
		});
	}

	async deletar(taxista: TaxistaSummary)
	{
		const self = this;

		let confirmaRemocao = false;

		await self.dialogSrv.open(
			ConfirmDialogComponent,
			{
				context:
				{
					title: 'Taxistas',
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

			//await self.removerFoto(taxista.fotoSummary);

			await self.taxistaSrv.ApiV1TaxistaByIdDelete(taxista.id).toPromise().then(resp =>
			{
				if (resp && resp.success)
				{
					self.toastSrv.success('Registro removido com sucesso!', 'Taxistas');
					self.atualizar();
				}
			});

			self.busyStackListagem.pop();
		}
	}

	async ativar(taxista: TaxistaSummary, ativo: boolean)
	{
		const self = this;
		await self.dialogSrv.open(
			ConfirmDialogComponent,
			{
				context:
				{
					title: 'Taxistas',
					prompt: `${ativo ? 'Ativar' : 'Desativar'} taxista?`
				},
			})
			.onClose.toPromise().then(async result =>
			{
				if (result)
				{
					self.busyStackListagem.push();

					taxista.ativo = ativo;

					await self.taxistaSrv.ApiV1TaxistaPut(taxista).toPromise().then(resp =>
					{
						if (resp && resp.success)
						{
							self.toastSrv.success( `Taxista ${taxista.usuario.nome} ${ativo ? 'ativado' : 'desativado'} com sucesso!`, 'Taxistas');
							self.atualizar();
						}
					});

					self.busyStackListagem.pop();
				}
			});
	}

	async enviarMensagem(taxista: TaxistaSummary)
	{
		const self = this;
		await self.dialogSrv.open(
			SendMessageComponent,
			{
				context:
				{
					destinatario: taxista.usuario
				},
			})
			.onClose.toPromise().then(async result =>
			{
				if (result)
				{
					self.toastSrv.success( `Mensagem enviada para  ${taxista.usuario.nome} com sucesso!`, 'Taxistas');
				}
			});
	}

	limparPesquisa()
	{
		const self = this;
		self.taxistasPesquisa = self.taxistas;
		self.inputPesquisaTaxista.nativeElement.value = '';
	}

	filtrarTaxistas(filter: string)
	{
		const self = this;

		self.taxistasPesquisa = self.taxistas.filter(taxista => {
			return taxista.usuario.nome.toUpperCase().includes(filter.toUpperCase());
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
				self.selecionar(self.instanciarTaxista());
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
			const novoTaxista = self.instanciarTaxista();
			novoTaxista.usuario = self.formUsuario.obterAlteracoes();
			novoTaxista.endereco = self.formEndereco.obterAlteracoes();
			novoTaxista.usuario.credenciais = self.formCredenciais.obterAlteracoes();
			novoTaxista.foto = self.formFoto.obterAlteracoes();

			// cria o registro do taxista
			await self.taxistaSrv.ApiV1TaxistaPost(novoTaxista).toPromise().then(async resp_cria_tx =>
			{
				if (resp_cria_tx && resp_cria_tx.success)
				{
					self.toastSrv.success('Registro criado com sucesso!', 'Taxistas');
				}
			});
		}
		else if (self.modo === Modo.mdEdicao)
		{
			if (self.formUsuario.alterado)
			{
				await self.usuarioSrv.ApiV1UsuarioPut(self.formUsuario.obterAlteracoes()).toPromise().then(resp =>
				{
					if (resp && resp.success)
					{
						self.toastSrv.success('Informações pessoais alteradas com sucesso!', 'Taxistas');
					}
				});
			}

			if (self.formEndereco.alterado)
			{
				await self.enderecoSrv.ApiV1EnderecoPut(self.formEndereco.obterAlteracoes()).toPromise().then(resp =>
				{
					if (resp && resp.success)
					{
						self.toastSrv.success('Endereço alterado com sucesso!', 'Taxistas');
					}
				});
			}

			if (self.formCredenciais.alterado)
			{
				await self.usuarioSrv.ApiV1UsuarioAlteraCredenciaisByIdPost({
					id: self.taxista.usuario.id,
					credenciais: self.formCredenciais.obterAlteracoes()
				}).toPromise().then(resp =>
				{
					if (resp && resp.success)
					{
						self.toastSrv.success('Credenciais alteradas com sucesso!', 'Taxistas');
					}
				});
			}

			if (self.formFoto.alterado)
			{
				await self.fotoSrv.ApiV1FotoPut(self.formFoto.obterAlteracoes()).toPromise().then(resp =>
				{
					if (resp && resp.success)
					{
						self.toastSrv.success('Foto alterada com sucesso!', 'Taxistas');
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
						title: 'Taxistas',
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
		self.formUsuario.redefinir();
		self.formEndereco.redefinir();
		self.formCredenciais.redefinir();
		self.formFoto.redefinir();
	}

	get formulariosValidos(): boolean
	{
		const self = this;
		return (
			self.formUsuario.form.untouched || self.formUsuario.form.valid &&
			self.formEndereco.form.untouched || self.formEndereco.form.valid &&
			self.formCredenciais.form.untouched || self.formCredenciais.form.valid &&
			self.formFoto.form.valid);
	}

	expandir()
	{
		this.abas.openAll();
	}

	encolher()
	{
		this.abas.closeAll();
	}

	converterFoto(foto: string): string
	{
		return atob(foto);
	}
}
