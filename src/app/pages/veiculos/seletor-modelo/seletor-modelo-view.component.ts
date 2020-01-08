import { Component, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VeiculoSummary } from '../../../../api/to_de_taxi/models';
import { VeiculoSummaryExt } from '../veiculos.service';

@Component({
	template: `{{rowData ? rowData.modelo : 'N/A'}}`,
})
export class SeletorModeloViewComponent implements AfterViewInit {

	@Input() value: any;
	@Input() rowData: any;
	veicExt: VeiculoSummaryExt = null;

	constructor(){}

	ngAfterViewInit(): void
	{
		const self = this;

		if (!self.rowData.veicExt)
		{
			self.rowData.veicExt = new VeiculoSummaryExt(/*self.rowData*/);
		}
		self.veicExt = self.rowData.veicExt;
	}
}
