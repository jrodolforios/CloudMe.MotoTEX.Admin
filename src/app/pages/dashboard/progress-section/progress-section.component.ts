import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgressInfo } from '../../../@core/data/stats-progress-bar';
import { takeWhile } from 'rxjs/operators';
import { CorridaService, LocalizacaoService } from '../../../../api/to_de_taxi/services';
import { CatalogoLocalizacoes } from '../../../catalogos/catalogo-localizacoes.service';
import { Subscription } from 'rxjs';
import { BusyStack } from '../../../@core/utils/busy_stack';

@Component({
	selector: 'ngx-progress-section',
	styleUrls: ['./progress-section.component.scss'],
	templateUrl: './progress-section.component.html',
})
export class ProgressSectionComponent implements OnInit, OnDestroy {

	refreshing = true;
	public corridasHoje: number = 0;
	public corridasOntem: number = 0;
	public corriasEsteMes: number = 0;
	public taxistasOnline: number = 0;

	busyStackDetalhes = new BusyStack();
	busyStackDetalhesSub: Subscription = null;

	public localizacoesSub: Subscription = null;

	progressInfoData: ProgressInfo[];

	constructor(private corridaService: CorridaService,
		private catalogoLocalizacoes: CatalogoLocalizacoes,
		private localizacaoService: LocalizacaoService)
	{
	}

	async ngOnInit()
	{
		const self = this;

		self.busyStackDetalhesSub = self.busyStackDetalhes.busy.subscribe(() =>
		{
			self.refreshing = self.busyStackDetalhes.busy.value > 0;
		});

		self.localizacoesSub = self.catalogoLocalizacoes.changesSubject.subscribe(_ =>
		{
			this.atualizarDetalhes();
		});

		await self.atualizarDetalhes();
	}

	private async atualizarDetalhes()
	{
		const self = this;

		const date = new Date();
		const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

		//self.busyStackDetalhes.push();

		self.localizacaoService.ApiV1LocalizacaoGetQtTaxistasOnlineGet().toPromise()
			.then(resultado =>
			{
				if (resultado && resultado.success)
				{
					self.taxistasOnline = resultado.data;
				}

			})
			.catch(() => {});

		self.corridaService.ApiV1CorridaRecuperarApartirDeDataByDataPost(firstDay.toISOString()).toPromise()
			.then(resultado =>
			{
				if (resultado && resultado.success)
				{
					self.corriasEsteMes = resultado.data.length;
					self.corridasHoje = 0;
					self.corridasOntem = 0;
					resultado.data.forEach(y => {
						const dataHoje: Date = new Date();
						dataHoje.setHours(0, 0, 0, 0);

						const dataOntem: Date = new Date(new Date().getTime() - (1000 * 60 * 60 * 24));
						dataOntem.setHours(0, 0, 0, 0);

						const dataVerificar: Date = new Date(y.inicio);
						dataVerificar.setHours(0, 0, 0, 0);

						if (dataVerificar.toDateString() === dataHoje.toDateString())
						{
							self.corridasHoje++;
						}
						else if (dataVerificar.toDateString() === dataOntem.toDateString())
						{
							self.corridasOntem++;
						}
					});
				}
			})
			.catch(() => {});

		//self.busyStackDetalhes.pop();
	}

	ngOnDestroy()
	{
		const self = this;
		if (self.localizacoesSub)
		{
			self.localizacoesSub.unsubscribe();
			self.busyStackDetalhesSub.unsubscribe();
		}
	}
}
