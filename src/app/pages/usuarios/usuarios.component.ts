import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { BaseCardComponent } from '../../common-views/base-card/base-card.component';
import { FormUsuarioComponent } from '../../common-views/forms/form-usuario/form-usuario.component';
import { FormCredenciaisComponent } from '../../common-views/forms/form-credenciais/form-credenciais.component';
import { UsuarioSummary } from '../../../api/to_de_taxi/models';
import { BusyStack } from '../../@core/utils/busy_stack';
import { Subscription } from 'rxjs';
import { NbDialogService, NbToastrService, NbAccordionComponent } from '@nebular/theme';
import { UsuarioService } from '../../../api/to_de_taxi/services';
import { ConfirmDialogComponent } from '../../common-views/confirm-dialog/confirm-dialog.component';
import { CompositorMensagemComponent } from '../../common-views/compositor-mensagem/compositor-mensagem.component';
import { GlobaisService } from '../../globais.service';

export enum Modo
{
	mdEdicao,
	mdCriacao,
	mdVisualizacao
}

@Component({
	selector: 'ngx-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, AfterViewInit, OnDestroy {

	public enumModo = Modo;
	exibirFiltros = false;
	quantidadeUsuarios = 0;

	@ViewChild('card_listagem', null) cardListagem: BaseCardComponent;
	@ViewChild('card_detalhes', null) cardDetalhes: BaseCardComponent;

	@ViewChild('pesquisaUsuario', null) inputPesquisaUsuario: ElementRef;
	@ViewChild('abas', null) abas: NbAccordionComponent;

	@ViewChild('formUsuario', null) formUsuario: FormUsuarioComponent;
	@ViewChild('formCredenciais', null) formCredenciais: FormCredenciaisComponent;

	_modo: Modo = Modo.mdVisualizacao;
	get modo(): Modo
	{
		return this._modo;
	}

	// indicação de carregamento de dados da API em background
	busyStackListagem = new BusyStack();
	busyStackDetalhes = new BusyStack();

	usuario: UsuarioSummary = null;
	usuarioLogado: UsuarioSummary = null;
	usuarios: UsuarioSummary[] = [];
	usuariosPesquisa: UsuarioSummary[] = [];

	get credenciais() { return this.usuario ? this.usuario.credenciais : null; }

	usuarioSelSub: Subscription;
	busyStackListagemSub: Subscription = null;
	busyStackDetalhesSub: Subscription = null;

	get registroAlterado(): boolean
	{
		const self = this;

		if (!self.usuario) return false;
		return (
			self.formUsuario.alterado ||
			self.formCredenciais.alterado);
	}

	// paginação
	itemsPerPage: number = 10;
	currentPage: number = 1;

	constructor(
		private dialogSrv: NbDialogService,
		private usuarioSrv: UsuarioService,
		private toastSrv: NbToastrService,
		private globaisSrv: GlobaisService)
	{
	}

	ngOnInit() {
	}

	ngOnDestroy(): void
	{
		const self = this;
		//self.usuariosSub.unsubscribe();
		self.busyStackDetalhesSub.unsubscribe();
		self.busyStackListagemSub.unsubscribe();
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

		self.usuarioLogado = self.globaisSrv.usuario.value;

		self.atualizar();
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
		return self.modo === Modo.mdVisualizacao && self.usuario !== null;
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
		await self.obterUsuarios();

		if (!self.usuario || !self.usuariosPesquisa.find(tx => tx.id === self.usuario.id))
		{
			self.usuario = self.usuariosPesquisa.length > 0 ? self.usuariosPesquisa[0] : null;
		}
	}

	private async obterUsuarios()
	{
		const self = this;

		self.busyStackListagem.push();


		await self.usuarioSrv.ApiV1UsuarioAdminsGet().toPromise().then( resultado =>
		{
			if (resultado && resultado.success)
			{
				self.quantidadeUsuarios = resultado.count;

				self.usuarios = resultado.data.sort((usr1, usr2) =>
				{
					return usr1.nome.localeCompare(usr2.nome);
				});
			}
		}).catch(() => {});

		self.filtrarUsuarios();

		self.busyStackListagem.pop();
	}

	selecionar(usuario: UsuarioSummary)
	{
		this.usuario = usuario;
	}

	async visualizar(usuario: UsuarioSummary)
	{
		const self = this;
		await self.setModo(Modo.mdVisualizacao).then(result =>
		{
			if (result)
			{
				self.selecionar(usuario);
			}
		}).catch(() => {});
	}

	async editar(usuario: UsuarioSummary)
	{
		const self = this;
		if (!self.podeEditar) return; // sanity check

		await self.setModo(Modo.mdEdicao).then(result =>
		{
			if (result)
			{
				self.selecionar(usuario);

				self.expandir();
			}
		}).catch(() => {});
	}

	async deletar(usuario: UsuarioSummary)
	{
		const self = this;

		let confirmaRemocao = false;

		await self.dialogSrv.open(
			ConfirmDialogComponent,
			{
				context:
				{
					title: 'Usuários',
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

			await self.usuarioSrv.ApiV1UsuarioByIdDelete(usuario.id).toPromise().then(async resultado =>
			{
				if (resultado && resultado.success)
				{
					self.toastSrv.success('Registro removido com sucesso!', 'Taxistas');
					self.atualizar();
				}
			}).catch(() => {});

			self.busyStackListagem.pop();
		}
	}

	async enviarMensagem(usuario: UsuarioSummary)
	{
		const self = this;
		await self.dialogSrv.open(
			CompositorMensagemComponent,
			{
				context:
				{
					destinatariosUsr: [usuario],
				}
			})
			.onClose.toPromise().then(async result =>
			{
				if (result)
				{
					self.toastSrv.success( `Mensagem enviada para  ${usuario.nome} com sucesso!`, 'Taxistas');
				}
			}).catch(() => {});
	}

	_filtroPesquisa: string = '';
	set filtroPesquisa(value: string)
	{
		const self = this;
		self._filtroPesquisa = value;
		self.filtrarUsuarios();
	}
	get filtroPesquisa(): string
	{
		return this._filtroPesquisa;
	}

	filtrarUsuarios()
	{
		const self = this;

		self.usuariosPesquisa = self.usuarios.filter(usuario =>
		{
			let passa_filtro = true;

			if (self.filtroPesquisa)
			{
				passa_filtro = usuario.nome.toUpperCase().includes(self.filtroPesquisa.toUpperCase());
			}

			return passa_filtro;
		});
	}

	limparFiltros()
	{
		const self = this;
		self.filtroPesquisa = '';

		self.filtrarUsuarios();
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
			const usuario = self.formUsuario.obterAlteracoes();
			usuario.credenciais = self.formCredenciais.obterAlteracoes();
			usuario.tipo = 1; // Administrador

			// cria o registro do usuario
			await self.usuarioSrv.ApiV1UsuarioPost(usuario).toPromise().then(async resultado =>
			{
				if (resultado && resultado.success)
				{
					self.toastSrv.success('Registro criado com sucesso!', 'Usuários');
				}
			}).catch(() => { contemErros = true; });
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
				}).catch(() => { contemErros = true; });
			}

			if (self.formCredenciais.alterado)
			{
				await self.usuarioSrv.ApiV1UsuarioAlteraCredenciaisByIdPost({
					id: self.usuario.id,
					credenciais: self.formCredenciais.obterAlteracoes()
				}).toPromise().then(resp =>
				{
					if (resp && resp.success)
					{
						self.toastSrv.success('Credenciais alteradas com sucesso!', 'Taxistas');
					}
				}).catch(() => { contemErros = true; });
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
		self.formCredenciais.redefinir();
	}

	get formulariosValidos(): boolean
	{
		const self = this;
		return (
			(self.formUsuario.form.valid) &&
			(!self.formCredenciais.form.touched || self.formCredenciais.form.valid));
	}

	expandir()
	{
		this.abas.openAll();
	}

	encolher()
	{
		this.abas.closeAll();
	}
}
