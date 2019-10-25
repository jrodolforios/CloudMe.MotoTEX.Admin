import { Component, OnInit, Input } from '@angular/core';
import { PontoTaxiSummary, TaxistaSummary } from '../../../../api/to_de_taxi/models';
import { PontoTaxiService } from '../../../../api/to_de_taxi/services';
import { CatalogosService } from '../../../catalogos/catalogos.service';

@Component({
	selector: 'ngx-taxistas-ponto-taxi',
	templateUrl: './taxistas.component.html',
	styleUrls: ['./taxistas.component.scss']
})
export class TaxistasComponent implements OnInit {

	constructor(private catalogosSrv: CatalogosService) { }

	_pontoTaxi: PontoTaxiSummary = null;
	taxistas: TaxistaSummary[] = [];

	@Input()
	set pontoTaxi(value: PontoTaxiSummary)
	{
		const self = this;
		self._pontoTaxi = value;
		self.obterTaxistas();
	}
	get pontoTaxi(): PontoTaxiSummary
	{
		return this._pontoTaxi;
	}

	async obterTaxistas()
	{
		const self = this;

		if (!self.pontoTaxi || !self.pontoTaxi.id)
		{
			return;
		}

		self.taxistas = self.catalogosSrv.taxistas.items.filter(tx =>
		{
			return tx.idPontoTaxi === self.pontoTaxi.id;
		});
	}

	ngOnInit() {
	}
}
