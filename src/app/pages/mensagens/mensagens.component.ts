import { Component, OnInit, OnDestroy } from '@angular/core';
import { HubWrapper } from '../../@core/data/hubs/hub-wrapper';
import { OAuthService } from 'angular-oauth2-oidc';
import { DetalhesMensagem, UsuarioSummary, GrupoUsuarioSummary } from '../../../api/to_de_taxi/models';
import { NbToastrService } from '@nebular/theme';
import { UsuarioService, MensagemService } from '../../../api/to_de_taxi/services';
import { GlobaisService } from '../../globais.service';

export interface MensagemExt extends DetalhesMensagem
{
	nomeRemetente: string;
	nomeDestinatario: string;
}

@Component({
	selector: 'ngx-mensagens',
	templateUrl: './mensagens.component.html',
	styleUrls: ['./mensagens.component.scss']
})
export class MensagensComponent implements OnInit, OnDestroy {

	hubMensagens: HubWrapper = null;

	caixaEntrada: MensagemExt[] = [];
	caixaSaida: MensagemExt[] = [];
	usuarios: UsuarioSummary[] = [];

	constructor(
		private oauthService: OAuthService,
		private usuarioSrv: UsuarioService,
		private globaisSrv: GlobaisService,
		private mensagemSrv: MensagemService,
		private toastSrv: NbToastrService)
	{
		const self = this;
		//self.hubMensagens = new HubWrapper('https://api.todetaxi.com.br/notifications/mensagens', () => self.oauthService.getAccessToken());
		self.hubMensagens = new HubWrapper('http://localhost:5002/notifications/mensagens', () => self.oauthService.getAccessToken());
	}

	ngOnInit()
	{
		const self = this;

		const usuarioLogado = self.globaisSrv.usuario.value;

		if (usuarioLogado)
		{
			self.mensagemSrv.ApiV1MensagemMsgsUsrGet({ idUsuario: usuarioLogado.id }).toPromise().then(resultado =>
			{
				const mensagensEntrada: MensagemExt[] = [];
				const mensagensSaida: MensagemExt[] = [];

				if (resultado && resultado.success)
				{
					resultado.data.forEach(async msg =>
					{
						await self.direcionarMensagem(msg, mensagensEntrada, mensagensSaida);
					});

					self.caixaEntrada = mensagensEntrada;
					self.caixaSaida = mensagensSaida;
				}
			});
		}

		self.hubMensagens.connect().then(() =>
		{
			self.hubMensagens.hubConnection.on('msg_usr', async (msg: DetalhesMensagem) =>
			{
				const msgExt = await self.direcionarMensagem(msg, self.caixaEntrada, self.caixaSaida);
				self.toastSrv.info(msgExt.corpo, `Mensagem de: [${msgExt.nomeRemetente}] para: [${msgExt.nomeDestinatario}] com assunto: ${msg.assunto}`);
			});

			self.hubMensagens.hubConnection.on('msg_grp_usr', async (msg: DetalhesMensagem) =>
			{
				const msgExt = await self.direcionarMensagem(msg, self.caixaEntrada, self.caixaSaida);
				self.toastSrv.info(msg.corpo, `Mensagem de: [${msgExt.nomeRemetente}] do grupo: [${msg.idGrupo}] para: [${msgExt.nomeDestinatario}] com assunto: ${msg.assunto}`);
			});
		});
	}

	private async obterUsuario(id: string): Promise<UsuarioSummary>
	{
		const self = this;

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
			}).catch(() => {});
		}

		return usuario;
	}

	private async direcionarMensagem(msg: DetalhesMensagem, mensagensEntrada: MensagemExt[], mensagensSaida: MensagemExt[]): Promise<MensagemExt>
	{
		const self = this;

		const usuarioLogado = self.globaisSrv.usuario.value;

		const msgExt: MensagemExt =
		{
			idMensagem: msg.idMensagem,
			idRemetente: msg.idRemetente,
			idDestinatario: msg.idDestinatario,
			idGrupo: msg.idGrupo,
			assunto: msg.assunto,
			corpo: msg.corpo,
			dataEnvio: msg.dataEnvio,
			dataLeitura: msg.dataLeitura,
			dataRecebimento: msg.dataRecebimento,
			nomeRemetente: '',
			nomeDestinatario: ''
		};

		msgExt.nomeRemetente = msgExt.nomeDestinatario = 'Desconhecido';

		if (msg.idRemetente === usuarioLogado.id)
		{
			msgExt.nomeRemetente = usuarioLogado.nome;

			const usr = await self.obterUsuario(msg.idDestinatario);
			if (usr)
			{
				msgExt.nomeDestinatario = usr.nome;
			}

			mensagensSaida.push(msgExt);
		}
		else if (msg.idDestinatario === usuarioLogado.id)
		{
			msgExt.nomeDestinatario = usuarioLogado.nome;

			const usr = await self.obterUsuario(msg.idRemetente);
			if (usr)
			{
				msgExt.nomeRemetente = usr.nome;
			}

			mensagensEntrada.push(msgExt);
		}

		return msgExt;
	}

	ngOnDestroy()
	{
		const self = this;

		self.hubMensagens.disconnect();
	}
}
