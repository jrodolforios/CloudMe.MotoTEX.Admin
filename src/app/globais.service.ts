import { Injectable } from '@angular/core';
import { UsuarioSummary } from '../api/to_de_taxi/models';
import { BehaviorSubject } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { NbToastrService } from '@nebular/theme';
import { CatalogosService } from './catalogos/catalogos.service';
import { UsuarioService } from '../api/to_de_taxi/services';
import { Router } from '@angular/router';
import { HubWrapper } from './@core/data/hubs/hub-wrapper';

// const hubBaseEndpointUrl: string = 'https://api.mototex.cloudme.com.br';
const hubBaseEndpointUrl: string = 'https://apihom.mototex.cloudme.com.br';
// const hubBaseEndpointUrl = 'http://localhost:5002';

@Injectable()
export class GlobaisService
{
	usuario = new BehaviorSubject<UsuarioSummary>(null);

	hubNotificacoes: HubWrapper = null;
	hubNotificacoesAdmin: HubWrapper = null;

	constructor(
		private oauthService: OAuthService,
		// private toastSrv: NbToastrService,
		private usuarioSrv: UsuarioService,
		private router: Router)
	{
		const self = this;
		self.hubNotificacoes = new HubWrapper(hubBaseEndpointUrl + '/notifications', () => self.oauthService.getAccessToken());
		self.hubNotificacoesAdmin = new HubWrapper(hubBaseEndpointUrl + '/notifications/admin', () => self.oauthService.getAccessToken());
	}

	async connectHubs()
	{
		const self = this;
		await self.hubNotificacoes.connect().then(() =>
		{
			console.info(`Notificações: Connection started`);
		})
		.catch(err =>
		{
			console.error(`Notificações: Error while starting connection: ${err}`);
		});

		await self.hubNotificacoesAdmin.connect().then(() =>
		{
			console.info(`Notificações (admin): Connection started`);
		})
		.catch(err =>
		{
			console.error(`Notificações (admin): Error while starting connection: ${err}`);
		});
	}

	async disconnectHubs()
	{
		const self = this;
		self.hubNotificacoes.disconnect()
			.then(() => console.info(`Notificações: Connection stopped`))
			.catch(err => console.error(`Notificações: Error while stopping connection: ${err}`));

		self.hubNotificacoesAdmin.disconnect()
			.then(() => console.info(`Notificações (admin): Connection stopped`))
			.catch(err => console.error(`Notificações (admin): Error while stopping connection: ${err}`));
	}

	async carregarPerfilUsuario()
	{
		const self = this;

		await self.oauthService.loadUserProfile().then(async profile =>
		{
			const idUsr =  profile['sub'];
			if (idUsr)
			{
				await self.usuarioSrv.ApiV1UsuarioByIdGet(idUsr).toPromise().then(resultado =>
				{
					if (resultado && resultado.success)
					{
						self.usuario.next(resultado.data);
					}
				}).catch(() => {});
			}

			//self.catalogosSrv.carregar();
		});
	}
}
