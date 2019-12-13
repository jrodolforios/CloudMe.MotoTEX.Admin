import { Component, OnInit, OnDestroy } from '@angular/core';
import { HubWrapper } from '../../@core/data/hubs/hub-wrapper';
import { OAuthService } from 'angular-oauth2-oidc';
import { UsuarioSummary, DestinatariosMensagem, DetalhesMensagem, Pagination, GrupoUsuarioSummary, MensagemDestinatarioSummary } from '../../../api/to_de_taxi/models';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { UsuarioService, MensagemService, GrupoUsuarioService } from '../../../api/to_de_taxi/services';
import { GlobaisService } from '../../globais.service';
import { CompositorComponent } from './compositor/compositor.component';
import * as moment from 'moment';

export interface InfoDestinatarioMensagem
{
	id: string;
	nome: string;
}

enum StatusMensagem
{
	Indefinido = 0,
	Enviada,
	Encaminhada,
	Recebida,
	Lida
}

export interface DestinatariosMensagemExt extends DestinatariosMensagem
{
	infosUsuarios?: Array<InfoDestinatarioMensagem>;
	infosGruposUsuarios?: Array<InfoDestinatarioMensagem>;
}

export class MensagemExt implements DetalhesMensagem
{
	idMensagem?: string;
	idRemetente?: string;
	destinatarios?: DestinatariosMensagem;
	assunto?: string;
	corpo?: string;
	dataEnvio?: string;
	dataRecebimento?: string;
	dataLeitura?: string;
	nomeRemetente: string;
	infoDestinatarios: DestinatariosMensagemExt;

	selecionada: boolean = false;

	public constructor(init?: Partial<DetalhesMensagem>)
	{
		const self = this;

		Object.assign(self, init);

		self.infoDestinatarios = {
			idsUsuarios: init.destinatarios.idsUsuarios,
			idsGruposUsuarios: init.destinatarios.idsGruposUsuarios,
			infosUsuarios: [],
			infosGruposUsuarios: []
		};

		self.dataLeitura = self.dataLeitura ? moment(self.dataLeitura).format('DD/MM/YYYY HH:mm:SS') : null;
		self.dataEnvio = self.dataEnvio ? moment(self.dataEnvio).format('DD/MM/YYYY HH:mm:SS') : null;
		self.dataRecebimento = self.dataRecebimento ? moment(self.dataRecebimento).format('DD/MM/YYYY HH:mm:SS') : null;
	}

	formatarDestinatarios()
	{
		const self  = this;
		const strInfoUsrs = self.infoDestinatarios.infosUsuarios.map(info_usr => info_usr.nome).join(', ');
		const strInfoGrpUsrs = self.infoDestinatarios.infosGruposUsuarios.map(info_usr => info_usr.nome).join(', ');
		let result = strInfoUsrs;
		if (strInfoGrpUsrs)
		{
			result = result + ', ' + strInfoGrpUsrs;
		}

		return result;
	}
}

@Component({
	selector: 'ngx-mensagens',
	templateUrl: './mensagens.component.html',
	styleUrls: ['./mensagens.component.scss'],
	entryComponents: [CompositorComponent]
})
export class MensagensComponent implements OnInit, OnDestroy {

	hubMensagens: HubWrapper = null;

	caixaEntrada: MensagemExt[] = [];
	caixaSaida: MensagemExt[] = [];

	usuarios: UsuarioSummary[] = [];
	gruposUsuarios: GrupoUsuarioSummary[] = [];

	totalEntrada: number = 0;
	totalSaida: number = 0;

	paginacaoEntrada: Pagination = {
		page: 1,
		itensPerPage: 10
	};

	paginacaoSaida: Pagination = {
		page: 1,
		itensPerPage: 10
	};

	constructor(
		private oauthService: OAuthService,
		private usuarioSrv: UsuarioService,
		private grupoUsuarioSrv: GrupoUsuarioService,
		private globaisSrv: GlobaisService,
		private mensagemSrv: MensagemService,
		private toastSrv: NbToastrService,
		private dialogSrv: NbDialogService)
	{
		const self = this;
		self.hubMensagens = new HubWrapper('https://api.todetaxi.com.br/notifications/mensagens', () => self.oauthService.getAccessToken());
		// self.hubMensagens = new HubWrapper('http://localhost:5002/notifications/mensagens', () => self.oauthService.getAccessToken());
	}

	async ngOnInit()
	{
		const self = this;

		const usuarioLogado = self.globaisSrv.usuario.value;

		if (usuarioLogado)
		{
			await self.obterMensagensRecebidas(self.paginacaoEntrada.page, self.paginacaoEntrada.itensPerPage);
			await self.obterMensagensEnviadas(self.paginacaoSaida.page, self.paginacaoSaida.itensPerPage);
		}

		self.hubMensagens.connect().then(() =>
		{
			self.hubMensagens.hubConnection.on('msg_usr', async (msg: DetalhesMensagem) =>
			{
				const msgExt = await self.converterMensagem(msg);
				self.toastSrv.info(msgExt.corpo, `Mensagem de: [${msgExt.nomeRemetente}] para: [${msgExt.formatarDestinatarios()}] com assunto: ${msg.assunto}`);

				self.caixaEntrada = [msgExt].concat(self.caixaEntrada);
			});

			self.hubMensagens.hubConnection.on('msg_grp_usr', async (msg: DetalhesMensagem) =>
			{
				const msgExt = await self.converterMensagem(msg);
				self.toastSrv.info(msg.corpo, `Mensagem de: [${msgExt.nomeRemetente}] para: [${msgExt.formatarDestinatarios()}] com assunto: ${msg.assunto}`);

				self.caixaEntrada = [msgExt].concat(self.caixaEntrada);
			});

			self.hubMensagens.hubConnection.on('msg_upd', async (msgDest: MensagemDestinatarioSummary) =>
			{
				self.atualizarMensagem(msgDest);
			});
		});
	}

	private async obterUsuario(id: string): Promise<UsuarioSummary>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			let usuario = self.usuarios.find(usr => usr.id === id);

			if (!usuario)
			{
				await self.usuarioSrv.ApiV1UsuarioByIdGet(id).toPromise().then(resultado =>
				{
					if (resultado && resultado.success)
					{
						usuario = resultado.data;
						self.usuarios.push(usuario);
					}
				}).catch((reason) =>
				{
					reject(reason);
				});
			}

			resolve(usuario);
		});

	}

	private async obterGrupoUsuario(id: string): Promise<GrupoUsuarioSummary>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			let grpUsuario = self.gruposUsuarios.find(grpUsr => grpUsr.id === id);

			if (!grpUsuario)
			{
				await self.grupoUsuarioSrv.ApiV1GrupoUsuarioByIdGet(id).toPromise().then(resultado =>
				{
					if (resultado && resultado.success)
					{
						grpUsuario = resultado.data;
						self.gruposUsuarios.push(grpUsuario);
					}
				}).catch((reason) =>
				{
					reject(reason);
				});
			}

			resolve(grpUsuario);
		});

	}

	private async converterMensagem(msg: DetalhesMensagem): Promise<MensagemExt>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			const remetente = await self.obterUsuario(msg.idRemetente);

			const msgExt = new MensagemExt(msg);

			msg.destinatarios.idsUsuarios.forEach(async id_usr =>
			{
				await self.obterUsuario(id_usr).then(usr =>
				{
					msgExt.infoDestinatarios.infosUsuarios.push({
						id: id_usr,
						nome: usr ? usr.nome : 'Desconhecido'
					});
				}).catch(reason =>
				{
					reject(reason);
				});
			});

			msg.destinatarios.idsGruposUsuarios.forEach(async id_grp_usr =>
			{
				await self.obterGrupoUsuario(id_grp_usr).then(grpUsr =>
				{
					msgExt.infoDestinatarios.infosGruposUsuarios.push({
						id: id_grp_usr,
						nome: grpUsr ? grpUsr.nome : 'Grupo desconhecido'
					});
				}).catch(reason =>
				{
					reject(reason);
				});
			});

			msgExt.nomeRemetente = remetente ? remetente.nome : 'Desconhecido';

			resolve(msgExt);
		});
	}

	atualizarMensagem(msgDest: MensagemDestinatarioSummary)
	{
		const self = this;
		const msgEntrada = self.caixaEntrada.find(x => x.idMensagem === msgDest.idMensagem);
		if (msgEntrada)
		{
			msgEntrada.dataLeitura = msgDest.dataLeitura;
			msgEntrada.dataRecebimento = msgDest.dataRecebimento;
		}

		const msgSaida = self.caixaSaida.find(x => x.idMensagem === msgDest.idMensagem);
		if (msgSaida)
		{
			msgSaida.dataLeitura = msgDest.dataLeitura;
			msgSaida.dataRecebimento = msgDest.dataRecebimento;
		}
	}

	async obterMensagensRecebidas(page: number, itemsPerPage: number)
	{
		const self = this;

		const usuarioLogado = self.globaisSrv.usuario.value;
		if (!usuarioLogado) return;

		// obtém mensagens recebidas
		await self.mensagemSrv.ApiV1MensagemObterRecebidasPost(
			{
				idUsuario: usuarioLogado.id,
				pagination:
				{
					page: +page - 1,
					itensPerPage: +itemsPerPage
				}
			}).toPromise().then(async resultado =>
		{
			const mensagensConvertidas: MensagemExt[] = [];

			if (resultado && resultado.success)
			{
				for (const msg of resultado.data)
				{
					await self.converterMensagem(msg).then(msgConvertida =>
					{
						mensagensConvertidas.push(msgConvertida);
					}).catch(() => {});
				}

				self.caixaEntrada = mensagensConvertidas;
				self.totalEntrada = resultado.count;

				self.paginacaoEntrada.page = +page;
				self.paginacaoEntrada.itensPerPage = +itemsPerPage;
			}
		}).catch(() => {});
	}

	async obterMensagensEnviadas(page: number, itemsPerPage: number)
	{
		const self = this;

		const usuarioLogado = self.globaisSrv.usuario.value;
		if (!usuarioLogado) return;

		// obtém mensagens enviadas
		await self.mensagemSrv.ApiV1MensagemObterEnviadasPost(
			{
				idUsuario: usuarioLogado.id,
				pagination:
				{
					page: +page - 1,
					itensPerPage: +itemsPerPage
				}
			}).toPromise().then(async resultado =>
		{
			const mensagensConvertidas: MensagemExt[] = [];

			if (resultado && resultado.success)
			{
				for (const msg of resultado.data)
				{
					await self.converterMensagem(msg).then(msgConvertida =>
					{
						mensagensConvertidas.push(msgConvertida);
					}).catch(() => {});
				}

				self.caixaSaida = mensagensConvertidas;
				self.totalSaida = resultado.count;

				self.paginacaoSaida.page = +page;
				self.paginacaoSaida.itensPerPage = +itemsPerPage;
			}
		}).catch(() => {});
	}

	comporNovaMensagem()
	{
		this.dialogSrv.open(CompositorComponent).onClose.toPromise().then(async result =>
		{
		}).catch(() => {});
	}

	async abrirMensagemEntrada(mensagem: MensagemExt)
	{
		const self = this;

		const usuarioLogado = self.globaisSrv.usuario.value;
		if (!usuarioLogado) return;

		if (!mensagem.dataLeitura)
		{
			await self.mensagemSrv.ApiV1MensagemAlterarStatusPost({
				idMensagem: mensagem.idMensagem,
				idUsuario: usuarioLogado.id,
				status: StatusMensagem.Lida
			}).toPromise().then(resultado =>
			{
				if (!resultado || !resultado.success)
				{
					self.toastSrv.danger('Erro ao atualizar mensagem', 'Mensagens');
				}
			}).catch(reason =>
			{
				self.toastSrv.danger(`Erro ao atualizar mensagem: ${reason}`, 'Mensagens');
			});
		}
	}

	ngOnDestroy()
	{
		const self = this;

		self.hubMensagens.disconnect();
	}
}
