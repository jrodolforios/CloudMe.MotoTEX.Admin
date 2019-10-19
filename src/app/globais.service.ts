import { Injectable } from '@angular/core';
import { UsuarioSummary } from '../api/to_de_taxi/models';
import { BehaviorSubject } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class GlobaisService
{
	usuario = new BehaviorSubject<UsuarioSummary>(null);

	constructor(
		private oauthService: OAuthService,
		private toastSrv: NbToastrService)
	{
		const self = this;

		if (self.oauthService.hasValidIdToken())
		{
			self.oauthService.loadUserProfile().then(profile =>
			{
				self.usuario.next({
					nome: profile['name'],
					email: profile['email'],
				});
			});
		}

		self.oauthService.events.subscribe(async event =>
		{
			self.toastSrv.info(event.type);

			if (event.type === 'token_received')
			{
				self.toastSrv.info('Token recebida');

				await self.oauthService.loadUserProfile().then(profile =>
				{
					profile = profile;
				});
			}
		});
	}
}
