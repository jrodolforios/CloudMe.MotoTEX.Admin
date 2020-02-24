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
import { CatalogoCorVeiculos } from './catalogo-cores-veiculos.service';
import { CatalogoPassageiros } from './catalogo-passageiros.service';
import { CatalogoFotos } from './catalogo-fotos.service';
import { CatalogoLocalizacoes } from './catalogo-localizacoes.service';
import { CatalogoContatos } from './catalogo-Contatos.service';
import { CatalogoSolicitacoesCorrida as CatalogoSolicitacoesCorrida } from './catalogo-solicitacoes-corrida';

@Injectable()
export class CatalogosService
{
	itemCarregamento: string = '';

	constructor(
		public taxistas: CatalogoTaxistas,
		public passageiros: CatalogoPassageiros,
		public fotos: CatalogoFotos,
		public pontosTaxi: CatalogoPontosTaxi,
		public veiculos: CatalogoVeiculos,
		public veiculosTaxistas: CatalogoVeiculosTaxistas,
		public faixasDesconto: CatalogoFaixasDesconto,
		public faixasDescontoTaxistas: CatalogoFaixasDescontoTaxistas,
		public formasPagamento: CatalogoFormasPagamento,
		public formasPagamentoTaxistas: CatalogoFormasPagamentoTaxistas,
		public tarifas: CatalogoTarifas,
		public cores: CatalogoCorVeiculos,
		//public localizacoes: CatalogoLocalizacoes,
		public solicitacoesCorrida: CatalogoSolicitacoesCorrida,
		public solicitacoesContato: CatalogoContatos)
	{
	}

	async iniciarCatalogos()
	{
		const self = this;
		self.itemCarregamento = 'Taxistas';
		await self.taxistas.getAll();
		self.taxistas.startTrackingChanges();

		self.itemCarregamento = 'Passageiros';
		await self.passageiros.getAll();
		self.passageiros.startTrackingChanges();

		self.itemCarregamento = 'Fotos';
		self.fotos.startTrackingChanges();

		self.itemCarregamento = 'Pontos de táxi';
		await self.pontosTaxi.getAll();
		self.pontosTaxi.startTrackingChanges();

		self.itemCarregamento = 'Veículos';
		await self.veiculos.getAll();
		self.veiculos.startTrackingChanges();

		self.itemCarregamento = 'Cores de veículos';
		await self.cores.getAll();
		self.cores.startTrackingChanges();

		self.itemCarregamento = 'Veículos/Taxistas';
		await self.veiculosTaxistas.getAll();
		self.veiculosTaxistas.startTrackingChanges();

		self.itemCarregamento = 'Tarifas';
		await self.tarifas.getAll();
		self.tarifas.startTrackingChanges();

		self.itemCarregamento = 'Faixas de desconto';
		await self.faixasDesconto.getAll();
		self.faixasDesconto.startTrackingChanges();

		self.itemCarregamento = 'Faixas de desconto/Taxistas';
		await self.faixasDescontoTaxistas.getAll();
		self.faixasDescontoTaxistas.startTrackingChanges();

		self.itemCarregamento = 'Forma de pagamento';
		await self.formasPagamento.getAll();
		self.formasPagamento.startTrackingChanges();

		self.itemCarregamento = 'Formas de pagamento/Taxistas';
		await self.formasPagamentoTaxistas.getAll();
		self.formasPagamentoTaxistas.startTrackingChanges();

		/*self.itemCarregamento = 'Localizações';
		await self.localizacoes.getAll();
		self.localizacoes.startTrackingChanges();*/

		self.itemCarregamento = 'Solicitações de Contato';
		await self.solicitacoesContato.getAll();
		self.solicitacoesContato.startTrackingChanges();

		self.itemCarregamento = 'Solicitações de corrida';
		self.solicitacoesCorrida.startTrackingChanges();
	}

	async encerrarCatalogos()
	{
		const self = this;

		self.taxistas.stopTrackingChanges();
		self.passageiros.stopTrackingChanges();
		self.fotos.stopTrackingChanges();
		self.pontosTaxi.stopTrackingChanges();
		self.veiculos.stopTrackingChanges();
		self.cores.stopTrackingChanges();
		self.veiculosTaxistas.stopTrackingChanges();
		self.tarifas.stopTrackingChanges();
		self.faixasDesconto.stopTrackingChanges();
		self.faixasDescontoTaxistas.stopTrackingChanges();
		self.formasPagamento.stopTrackingChanges();
		self.formasPagamentoTaxistas.stopTrackingChanges();
		//self.localizacoes.stopTrackingChanges();
		self.solicitacoesContato.stopTrackingChanges();
		self.solicitacoesCorrida.stopTrackingChanges();
	}
}
