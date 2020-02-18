import { Component, OnInit, OnDestroy } from '@angular/core';
import { CorridaService, SolicitacaoCorridaService } from '../../../../api/to_de_taxi/services';

@Component({
	selector: 'ngx-solicitacoes-corrida',
	styleUrls: ['./solicitacoes-corrida.component.scss'],
	templateUrl: './solicitacoes-corrida.component.html',
})
export class SolicitacoesCorridaComponent implements OnInit, OnDestroy
{
	pieChartData: any[] = [];

	totalSolicitacoes: number = 0;
	solAgendadas: number = 0;
	solInterurbanas: number = 0;
	valorMedio: number = 0;

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
		private solicCorridaSrv: SolicitacaoCorridaService)
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
		await self.solicCorridaSrv.ApiV1SolicitacaoCorridaObterEstatisticasPost({
			inicio: self.startDateTime.toISOString(),
			fim: self.endDateTime.toISOString()
		} ).toPromise().then( resultado =>
		{
			if (resultado && resultado.success)
			{
				const view: any = [];

				view.push({ name: 'Em andamento', value: resultado.data.emAndamento });
				view.push({ name: 'Atendidas', value: resultado.data.atendidas });
				view.push({ name: 'Não atendidas', value: resultado.data.naoAtendidas });
				self.pieChartData = view;

				self.totalSolicitacoes = resultado.data.total;
				self.solInterurbanas = resultado.data.interurbanas;
				self.solAgendadas = resultado.data.agendadas;
				self.valorMedio = resultado.data.valorMedio;
			}
		});
	}
}
