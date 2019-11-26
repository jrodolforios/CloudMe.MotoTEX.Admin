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
import { TaxistaSummary, PontoTaxiSummary } from '../../../api/to_de_taxi/models';
import { BusyStack } from '../../@core/utils/busy_stack';
import { SendMessageComponent } from '../../common-views/send-message/send-message.component';
import { CatalogosService } from '../../catalogos/catalogos.service';

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
	public enumModo = Modo;

	@ViewChild('card_listagem', null) cardListagem: BaseCardComponent;
	@ViewChild('card_detalhes', null) cardDetalhes: BaseCardComponent;
	@ViewChild('card_foto', null) cardFoto: BaseCardComponent;

	@ViewChild('pesquisaTaxista', null) inputPesquisaTaxista: ElementRef;
	@ViewChild('abas', null) abas: NbAccordionComponent;

	@ViewChild('formUsuario', null) formUsuario: FormUsuarioComponent;
	@ViewChild('formEndereco', null) formEndereco: FormEnderecoComponent;
	@ViewChild('formCredenciais', null) formCredenciais: FormCredenciaisComponent;
	@ViewChild('formFoto', null) formFoto: FormFotoComponent;

	exibirFiltros = false;

	_modo: Modo = Modo.mdVisualizacao;
	get modo(): Modo
	{
		return this._modo;
	}

	// indicação de carregamento de dados da API em background
	busyStackListagem = new BusyStack();
	busyStackDetalhes = new BusyStack();

	taxista: TaxistaSummary = null;
	taxistas: TaxistaSummary[] = [];
	taxistasPesquisa: TaxistaSummary[] = [];
	// taxistasSub: Subscription = null;
	taxistasChangesSub: Subscription = null;

	pontosTaxi: PontoTaxiSummary[] = [];

	get credenciais() { return this.taxista && this.taxista.usuario ? this.taxista.usuario.credenciais : null; }
	get endereco() { return this.taxista ? this.taxista.endereco : null; }
	get foto() { return this.taxista ? this.taxista['foto'] : null; }
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
		private catalogosSrv: CatalogosService,
		private usuarioSrv: UsuarioService,
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
		//self.taxistasSub.unsubscribe();
		self.taxistasChangesSub.unsubscribe();
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

		self.taxistasChangesSub = self.catalogosSrv.taxistas.changesSubject.subscribe(() =>
		{
			self.atualizar();
		});

		/*self.taxistasSub = self.catalogosSrv.taxistas.itemsSubject.subscribe(() =>
		{
			self.atualizar();
		});*/

		self.pontosTaxi = self.catalogosSrv.pontosTaxi.items;
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

	public async atualizar()
	{
		const self = this;
		await self.obterTaxistas();

		if (!self.taxista || !self.taxistas.find(tx => tx.id === self.taxista.id))
		{
			self.taxista = self.taxistas.length > 0 ? self.taxistas[0] : null;
		}
	}

	private async obterTaxistas()
	{
		const self = this;

		self.busyStackListagem.push();

		self.taxistas = self.catalogosSrv.taxistas.items.sort((tx1, tx2) =>
		{
			return tx1.usuario.nome.localeCompare(tx2.usuario.nome);
		});

		self.filtrarTaxistas();

		self.taxistas.forEach(async tx =>
		{
			await self.catalogosSrv.taxistas.recuperarFoto(tx);
		});

		self.busyStackListagem.pop();
	}

	selecionar(taxista: TaxistaSummary)
	{
		this.taxista = taxista;
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
		}).catch(() => {});
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

				self.expandir();
			}
		}).catch(() => {});
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

			// await self.removerFoto(taxista.fotoSummary);

			await self.catalogosSrv.taxistas.delete(taxista.id).then(async resultado =>
			{
				if (resultado)
				{
					self.toastSrv.success('Registro removido com sucesso!', 'Taxistas');
					self.atualizar();

					// busca novamente associações com:
					// - Veículos
					await self.catalogosSrv.veiculosTaxistas.getAll();
					// - Formas de pagamento
					await self.catalogosSrv.formasPagamentoTaxistas.getAll();
					// - Faixas de desconto
					await self.catalogosSrv.faixasDesconto.getAll();
				}
			}).catch(() => {});

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

					const txSummary: TaxistaSummary =
					{
						id: taxista.id,
						ativo,
						idPontoTaxi: taxista.idPontoTaxi
					};

					await self.catalogosSrv.taxistas.put(txSummary).then(resultado =>
					{
						if (resultado)
						{
							// taxista.ativo = ativo;
							self.toastSrv.success( `Taxista ${taxista.usuario.nome} ${ativo ? 'ativado' : 'desativado'} com sucesso!`, 'Taxistas');
							self.atualizar();
						}
					}).catch(() => {});

					self.busyStackListagem.pop();
				}
			}).catch(() => {});
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
			}).catch(() => {});
	}

	_filtroSituacao: boolean = null;
	set filtroSituacao(value: boolean)
	{
		const self = this;
		self._filtroSituacao = value;
		self.filtrarTaxistas();
	}
	get filtroSituacao(): boolean
	{
		return this._filtroSituacao;
	}

	_filtroPesquisa: string = '';
	set filtroPesquisa(value: string)
	{
		const self = this;
		self._filtroPesquisa = value;
		self.filtrarTaxistas();
	}
	get filtroPesquisa(): string
	{
		return this._filtroPesquisa;
	}

	todosPontosTaxi: PontoTaxiSummary = {};
	_filtroPontoTaxi: PontoTaxiSummary = this.todosPontosTaxi;
	set filtroPontoTaxi(value: PontoTaxiSummary)
	{
		const self = this;
		self._filtroPontoTaxi = value;
		self.filtrarTaxistas();
	}
	get filtroPontoTaxi(): PontoTaxiSummary
	{
		return this._filtroPontoTaxi;
	}

	filtrarTaxistas()
	{
		const self = this;

		self.taxistasPesquisa = self.taxistas.filter(taxista =>
		{
			let passa_filtro = true;

			if (self.filtroPesquisa)
			{
				passa_filtro = taxista.usuario.nome.toUpperCase().includes(self.filtroPesquisa.toUpperCase());
			}

			if (self.filtroSituacao !== null)
			{
				passa_filtro = passa_filtro && taxista.ativo === self.filtroSituacao;
			}

			if (self.filtroPontoTaxi !== self.todosPontosTaxi)
			{
				passa_filtro =
					passa_filtro &&
					((self.filtroPontoTaxi === null && !taxista.idPontoTaxi) ||
					(self.filtroPontoTaxi && taxista.idPontoTaxi === self.filtroPontoTaxi.id));
			}

			return passa_filtro;
		});
	}

	limparFiltros()
	{
		const self = this;
		self.filtroPesquisa = '';
		self.filtroSituacao = null;
		self.filtroPontoTaxi = self.todosPontosTaxi;

		self.filtrarTaxistas();
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
			self.taxista.usuario = self.formUsuario.obterAlteracoes();
			self.taxista.endereco = self.formEndereco.obterAlteracoes();
			self.taxista.usuario.credenciais = self.formCredenciais.obterAlteracoes();

			const foto = self.formFoto.obterAlteracoes();

			// cria o registro do taxista
			await self.catalogosSrv.taxistas.post(self.taxista).then(async resultado =>
			{
				if (resultado)
				{
					if (foto)
					{
						await self.catalogosSrv.fotos.post(foto);
					}
					self.toastSrv.success('Registro criado com sucesso!', 'Taxistas');
				}
			}).catch(() => { contemErros = true; });
		}
		else if (self.modo === Modo.mdEdicao)
		{
			let atualizou = false;
			if (self.formUsuario.alterado)
			{
				await self.usuarioSrv.ApiV1UsuarioPut(self.formUsuario.obterAlteracoes()).toPromise().then(resp =>
				{
					if (resp && resp.success)
					{
						atualizou = true;
						self.toastSrv.success('Informações pessoais alteradas com sucesso!', 'Taxistas');
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
						self.toastSrv.success('Endereço alterado com sucesso!', 'Taxistas');
					}
				}).catch(() => { contemErros = true; });
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
						atualizou = true;
						self.toastSrv.success('Credenciais alteradas com sucesso!', 'Taxistas');
					}
				}).catch(() => { contemErros = true; });
			}

			if (self.formFoto.alterado)
			{
				await self.fotoSrv.ApiV1FotoPut(self.formFoto.obterAlteracoes()).toPromise().then(resp =>
				{
					if (resp && resp.success)
					{
						atualizou = true;
						self.toastSrv.success('Foto alterada com sucesso!', 'Taxistas');
					}
				}).catch((e) => { console.log(JSON.stringify(e)); contemErros = true; });
			}

			/*if (atualizou)
			{
				self.catalogosSrv.taxistas.get(self.taxista.id); // obtém os atualizados dados do servidor
			}*/
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
						title: 'Taxistas',
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
		self.formUsuario.redefinir();
		self.formEndereco.redefinir();
		self.formCredenciais.redefinir();
		self.formFoto.redefinir();
	}

	get formulariosValidos(): boolean
	{
		const self = this;
		return (
			(self.formUsuario.form.valid) &&
			(self.formEndereco.form.valid) &&
			(!self.formCredenciais.form.touched || self.formCredenciais.form.valid) &&
			(self.formFoto.form.valid));
		/*return (
			self.formUsuario.form.valid &&
			self.formEndereco.form.valid &&
			self.formCredenciais.form.valid &&
			self.formFoto.form.valid);*/
	}

	expandir()
	{
		this.abas.openAll();
	}

	encolher()
	{
		this.abas.closeAll();
	}

	get quantidadeTaxistas()
	{
		return this.catalogosSrv.taxistas.items.length;
	}
}
