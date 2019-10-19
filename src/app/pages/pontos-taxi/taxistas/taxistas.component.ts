import { Component, OnInit, Input } from '@angular/core';
import { PontoTaxiSummary, TaxistaSummary } from '../../../../api/to_de_taxi/models';
import { PontoTaxiService } from '../../../../api/to_de_taxi/services';

@Component({
	selector: 'ngx-taxistas-ponto-taxi',
	templateUrl: './taxistas.component.html',
	styleUrls: ['./taxistas.component.scss']
})
export class TaxistasComponent implements OnInit {

	constructor(private pontoTaxiSrv: PontoTaxiService) { }

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

		self.pontoTaxiSrv.ApiV1PontoTaxiByIdTaxistasGet(self.pontoTaxi.id).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				self.taxistas = resp.data;
			}
		});
	}

	ngOnInit() {
	}

	converterFoto(foto: string): string
	{
		return atob(foto);
	}
}
