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
	catalogoCarregamento = '';

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
}
