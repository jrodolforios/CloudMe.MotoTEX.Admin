import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CatalogosService } from '../../catalogos/catalogos.service';
import { Router } from '@angular/router';
import { GlobaisService } from '../../globais.service';
import { timeout } from 'rxjs/operators';

@Component({
	selector: 'ngx-carregamento',
	templateUrl: './carregamento.component.html',
	styleUrls: ['./carregamento.component.scss']
})
export class CarregamentoComponent implements OnInit  {

	get itemCarregamento(): string
	{
		return this.catalogosSrv.itemCarregamento;
	}

	constructor(
		private catalogosSrv: CatalogosService,
		private globaisSrv: GlobaisService,
		private router: Router)
	{}

	ngOnInit()
	{
		const self = this;
		self.carregar();
	}

	async carregar()
	{
		const self = this;

		await self.globaisSrv.carregarPerfilUsuario();

		const usr = self.globaisSrv.usuario.value;
		/*
		if (self.oauthService.hasValidIdToken() || self.oauthService.hasValidAccessToken())
		{
			self.carregarPerfilUsuario();
		}

		self.oauthService.events.subscribe(async event =>
		{
			// toastSrv.info(event.type, 'Auth');
			if (event.type === 'token_received')
			{
				await self.carregarPerfilUsuario();
			}
		});
		*/


		if (!usr || usr.tipo > 1) // não é administrador nem usuário master
		{
			self.router.navigate(['/nao_autorizado']);
		}
		else
		{
			await self.globaisSrv.connectHubs();
			await self.catalogosSrv.iniciarCatalogos();

			self.router.navigate(['/pages/dashboard']);
		}
	}
}
