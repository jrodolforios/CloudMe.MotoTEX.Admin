import { Injectable } from '@angular/core';
import { CatalogoTaxistas } from './catalogo-taxistas.service';
import { CatalogoPontosTaxi } from './catalogo-pontos-taxi.service';
import { CatalogoVeiculos } from './catalogo-veiculos.service';
import { CatalogoVeiculosTaxistas } from './catalogo-veiculos-taxistas.service';
import { CatalogoFaixasDesconto } from './catalogo-faixas-desconto.service';
import { CatalogoFaixasDescontoTaxistas } from './catalogo-faixas-desconto-taxistas.service';
import { CatalogoFormasPagamento } from './catalogo-formas-pagamento.service';
import { CatalogoFormasPagamentoTaxistas } from './catalogo-formas-pagamento-taxistas.service';
import { CatalogoTarifas } from './catalogo-tarifas.service';

@Injectable()
export class CatalogosService
{
	catalogoCarregamento = '';

	constructor(
		public taxistas: CatalogoTaxistas,
		public pontosTaxi: CatalogoPontosTaxi,
		public veiculos: CatalogoVeiculos,
		public veiculosTaxistas: CatalogoVeiculosTaxistas,
		public faixasDesconto: CatalogoFaixasDesconto,
		public faixasDescontoTaxistas: CatalogoFaixasDescontoTaxistas,
		public formasPagamento: CatalogoFormasPagamento,
		public formasPagamentoTaxistas: CatalogoFormasPagamentoTaxistas,
		public tarifas: CatalogoTarifas)
	{
	}

	async carregar()
	{
		const self = this;

		self.catalogoCarregamento = 'Taxistas';
		await self.taxistas.getAll();

		self.catalogoCarregamento = 'Pontos de táxi';
		await self.pontosTaxi.getAll();

		self.catalogoCarregamento = 'Veículos';
		await self.veiculos.getAll();

		self.catalogoCarregamento = 'Veículos/Taxistas';
		await self.veiculosTaxistas.getAll();

		self.catalogoCarregamento = 'Tarifas';
		await self.tarifas.getAll();

		self.catalogoCarregamento = 'Faixas de desconto';
		await self.faixasDesconto.getAll();

		self.catalogoCarregamento = 'Faixas de desconto/Taxistas';
		await self.faixasDescontoTaxistas.getAll();

		self.catalogoCarregamento = 'Forma de pagamento';
		await self.formasPagamento.getAll();

		self.catalogoCarregamento = 'Formas de pagamento/Taxistas';
		await self.formasPagamentoTaxistas.getAll();
	}
}
