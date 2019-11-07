import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CatalogosService } from '../../catalogos/catalogos.service';
import { Router } from '@angular/router';

@Component({
	selector: 'ngx-carregamento',
	templateUrl: './carregamento.component.html',
	styleUrls: ['./carregamento.component.scss']
})
export class CarregamentoComponent implements AfterViewInit  {

	itemCarregamento: string = '';

	constructor(
		private catalogosSrv: CatalogosService,
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

		self.itemCarregamento = 'Taxistas';
		await self.catalogosSrv.taxistas.getAll();

		self.itemCarregamento = 'Pontos de táxi';
		await self.catalogosSrv.pontosTaxi.getAll();

		self.itemCarregamento = 'Veículos';
		await self.catalogosSrv.veiculos.getAll();

		self.itemCarregamento = 'Cores de veículos';
		await self.catalogosSrv.cores.getAll();

		self.itemCarregamento = 'Veículos/Taxistas';
		await self.catalogosSrv.veiculosTaxistas.getAll();

		self.itemCarregamento = 'Tarifas';
		await self.catalogosSrv.tarifas.getAll();

		self.itemCarregamento = 'Faixas de desconto';
		await self.catalogosSrv.faixasDesconto.getAll();

		self.itemCarregamento = 'Faixas de desconto/Taxistas';
		await self.catalogosSrv.faixasDescontoTaxistas.getAll();

		self.itemCarregamento = 'Forma de pagamento';
		await self.catalogosSrv.formasPagamento.getAll();

		self.itemCarregamento = 'Formas de pagamento/Taxistas';
		await self.catalogosSrv.formasPagamentoTaxistas.getAll();

		self.router.navigate(['/pages/dashboard']);
	}
}
