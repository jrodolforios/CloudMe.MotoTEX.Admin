import { Injectable } from '@angular/core';
import { UsuarioSummary } from '../api/to_de_taxi/models';
import { BehaviorSubject } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { NbToastrService } from '@nebular/theme';
import { CatalogosService } from './catalogos/catalogos.service';

@Injectable()
export class GlobaisService
{
	usuario = new BehaviorSubject<UsuarioSummary>(null);

	constructor(
		private oauthService: OAuthService,
		private toastSrv: NbToastrService,
		private catalogosSrv: CatalogosService)
	{
		const self = this;

		if (self.oauthService.hasValidIdToken())
		{
			self.carregarPerfilUsuario();
		}

		self.oauthService.events.subscribe(async event =>
		{
			toastSrv.info(event.type, 'Auth');
			if (event.type === 'token_received')
			{
				await self.carregarPerfilUsuario();
			}
		});
	}

	async carregarPerfilUsuario()
	{
		const self = this;

		self.oauthService.loadUserProfile().then(profile =>
		{
			self.usuario.next({
				id: profile['sub'],
				nome: profile['nome'],
				email: profile['email'],
			});

			self.catalogosSrv.carregar();
		});
	}
}
