import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CatalogosService } from '../../catalogos/catalogos.service';
import { Router } from '@angular/router';
import { GlobaisService } from '../../globais.service';

@Component({
	selector: 'ngx-carregamento',
	templateUrl: './carregamento.component.html',
	styleUrls: ['./carregamento.component.scss']
})
export class CarregamentoComponent implements AfterViewInit  {

	get itemCarregamento(): string
	{
		return this.globaisSrv.itemCarregamento;
	}

	constructor(
		private catalogosSrv: CatalogosService,
		private globaisSrv: GlobaisService,
		private router: Router)
	{}

	ngAfterViewInit()
	{
		const self = this;
		self.carregar();
	}

	async carregar()
	{
		const self = this;

		await self.globaisSrv.iniciarCatalogos();

		self.router.navigate(['/pages/dashboard']);
	}
}
