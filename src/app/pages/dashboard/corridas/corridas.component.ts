import { Component, OnInit, OnDestroy } from '@angular/core';
import { EstatisticasCorridas } from '../../../../api/to_de_taxi/models';
import { CatalogosService } from '../../../catalogos/catalogos.service';
import { CorridaService } from '../../../../api/to_de_taxi/services';

@Component({
	selector: 'ngx-corridas',
	styleUrls: ['./corridas.component.scss'],
	templateUrl: './corridas.component.html',
})
export class CorridasComponent implements OnInit, OnDestroy
{
	pieChartData: any[] = [];
	totalCorridas: number = 0;
	avalMediaTaxista: number = 0;
	avalMediaPassageiro: number = 0;

	timeout: NodeJS.Timer = null;

	private _startDateTime = new Date(new Date().getFullYear(), 0, 1, 0, 0);
	public get startDateTime(): Date{
		return this._startDateTime;
	}
	public set startDateTime(value: Date) {
		this._startDateTime = value;
		//this.atualizarEstatisticas();
	}

	private _endDateTime = new Date();
	public get endDateTime(): Date {
		return this._endDateTime;
	}
	public set endDateTime(value: Date) {
		this._endDateTime = value;
		//this.atualizarEstatisticas();
	}

	constructor(
		private corridaSrv: CorridaService)
	{}

	ngOnInit()
	{
		const self = this;
		self.timeout = setInterval(() =>
		{
			self.atualizarEstatisticas();
		}, 2000);
	}

	ngOnDestroy()
	{
		const self = this;
		if (self.timeout)
		{
			clearInterval(self.timeout);
		}
	}

	async atualizarEstatisticas()
	{
		const self = this;
		await self.corridaSrv.ApiV1CorridaObterEstatisticasPost(
			{
				inicio: self.startDateTime.toISOString(),
				fim: self.endDateTime.toISOString()
			}).toPromise().then( resultado =>
		{
			if (resultado && resultado.success)
			{
				const view: any = [];

				view.push({ name: 'Agendadas', value: resultado.data.agendadas });
				view.push({ name: 'Solicitadas', value: resultado.data.solicitadas });
				view.push({ name: 'Em curso', value: resultado.data.emCurso });
				view.push({ name: 'Em espera', value: resultado.data.emEspera });
				view.push({ name: 'Canceladas (taxista)', value: resultado.data.canceladasTaxista });
				view.push({ name: 'Canceladas (passageiro)', value: resultado.data.canceladasPassageiro });
				view.push({ name: 'Concluídas', value: resultado.data.concluidas });
				view.push({ name: 'Em negociação', value: resultado.data.emNegociacao });
				self.pieChartData = view;

				self.totalCorridas = resultado.data.total;
				self.avalMediaTaxista = resultado.data.mediaAvaliacaoTaxista;
				self.avalMediaPassageiro = resultado.data.mediaAvaliacaoPassageiro;
			}
		});
	}
}
