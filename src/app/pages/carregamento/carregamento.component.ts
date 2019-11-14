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
		self.catalogosSrv.taxistas.startTrackingChanges();

		self.itemCarregamento = 'Passageiros';
		await self.catalogosSrv.passageiros.getAll();
		self.catalogosSrv.passageiros.startTrackingChanges();

		self.itemCarregamento = 'Fotos';
		await self.catalogosSrv.fotos.startTrackingChanges();

		self.itemCarregamento = 'Pontos de táxi';
		await self.catalogosSrv.pontosTaxi.getAll();
		self.catalogosSrv.pontosTaxi.startTrackingChanges();

		self.itemCarregamento = 'Veículos';
		await self.catalogosSrv.veiculos.getAll();
		self.catalogosSrv.veiculos.startTrackingChanges();

		self.itemCarregamento = 'Cores de veículos';
		await self.catalogosSrv.cores.getAll();
		self.catalogosSrv.cores.startTrackingChanges();

		self.itemCarregamento = 'Veículos/Taxistas';
		await self.catalogosSrv.veiculosTaxistas.getAll();
		self.catalogosSrv.veiculosTaxistas.startTrackingChanges();

		self.itemCarregamento = 'Tarifas';
		await self.catalogosSrv.tarifas.getAll();
		self.catalogosSrv.tarifas.startTrackingChanges();

		self.itemCarregamento = 'Faixas de desconto';
		await self.catalogosSrv.faixasDesconto.getAll();
		self.catalogosSrv.faixasDesconto.startTrackingChanges();

		self.itemCarregamento = 'Faixas de desconto/Taxistas';
		await self.catalogosSrv.faixasDescontoTaxistas.getAll();
		self.catalogosSrv.faixasDescontoTaxistas.startTrackingChanges();

		self.itemCarregamento = 'Forma de pagamento';
		await self.catalogosSrv.formasPagamento.getAll();
		self.catalogosSrv.formasPagamento.startTrackingChanges();

		self.itemCarregamento = 'Formas de pagamento/Taxistas';
		await self.catalogosSrv.formasPagamentoTaxistas.getAll();
		self.catalogosSrv.formasPagamentoTaxistas.startTrackingChanges();

		self.itemCarregamento = 'Localizações';
		await self.catalogosSrv.localizacoes.getAll();
		self.catalogosSrv.localizacoes.startTrackingChanges();

		self.router.navigate(['/pages/dashboard']);
	}
}
