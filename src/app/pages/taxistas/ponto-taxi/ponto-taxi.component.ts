import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { BusyStack } from '../../../@core/utils/busy_stack';
import { PontoTaxiSummary, TaxistaSummary } from '../../../../api/to_de_taxi/models';
import { Subscription } from 'rxjs';
import { BaseCardComponent } from '../../../common-views/base-card/base-card.component';
import { PontoTaxiService, TaxistaService } from '../../../../api/to_de_taxi/services';
import { NbToastrService } from '@nebular/theme';
import { CatalogosService } from '../../../catalogos/catalogos.service';

@Component({
	selector: 'ngx-ponto-taxi',
	templateUrl: './ponto-taxi.component.html',
	styleUrls: ['./ponto-taxi.component.scss']
})
export class PontoTaxiComponent implements AfterViewInit, OnDestroy {

	@ViewChild('baseCard', null) baseCard: BaseCardComponent;

	pontosTaxi: PontoTaxiSummary[] = [];
	pontoTaxiSelecionado: PontoTaxiSummary = null;
	pontoTaxiOriginal: PontoTaxiSummary = null;

	busyStackPontosTaxi = new BusyStack();
	busyStackPtTaxiSub: Subscription = null;

	private _taxista: TaxistaSummary = null;

	@Input()
	set taxista(value: TaxistaSummary)
	{
		const self = this;

		self._taxista = value;

		self.pontoTaxiOriginal = self.pontosTaxi.find(pt_tx => {
			return pt_tx.id === self.taxista.idPontoTaxi;
		});

		self.pontoTaxiSelecionado = self.pontoTaxiOriginal;
	}
	get taxista(): TaxistaSummary
	{
		return this._taxista;
	}

	constructor(
		private catalogosSrv: CatalogosService,
		private toastSrv: NbToastrService) { }

	ngAfterViewInit()
	{
		const self = this;

		self.busyStackPtTaxiSub = self.busyStackPontosTaxi.busy.subscribe(() =>
		{
			if (self.baseCard)
			{
				self.baseCard.toggleRefresh(self.busyStackPontosTaxi.busy.value > 0);
			}
		});

		self.obterPontosTaxi();
	}

	ngOnDestroy()
	{
		this.busyStackPtTaxiSub.unsubscribe();
	}

	private async obterPontosTaxi()
	{
		const self = this;

		self.busyStackPontosTaxi.push();

		self.pontosTaxi = self.catalogosSrv.pontosTaxi.items.sort((pt_tx1, pt_tx2) =>
		{
			return pt_tx1.nome.localeCompare(pt_tx2.nome);
		});

		self.busyStackPontosTaxi.pop();
	}

	podeSalvar(): boolean
	{
		return this.pontoTaxiOriginal !== this.pontoTaxiSelecionado;
	}

	async salvar()
	{
		const self = this;
		self.busyStackPontosTaxi.push();

		const txSummary: TaxistaSummary =
		{
			id: self.taxista.id,
			ativo: self.taxista.ativo,
			idPontoTaxi: self.pontoTaxiSelecionado ? self.pontoTaxiSelecionado.id : undefined
		};

		await self.catalogosSrv.taxistas.put(txSummary).then(resultado =>
		{
			if (resultado)
			{
				// self.taxista.idPontoTaxi = txSummary.idPontoTaxi;
				self.pontoTaxiOriginal = self.pontoTaxiSelecionado;
				self.toastSrv.success('Ponto de táxi alterado com sucesso!', 'Taxista');
			}
		}).catch(() => {});

		self.busyStackPontosTaxi.pop();
	}

	podeDesfazer(): boolean
	{
		return this.pontoTaxiOriginal !== this.pontoTaxiSelecionado;
	}

	desfazer()
	{
		this.pontoTaxiSelecionado = this.pontoTaxiOriginal;
	}
}
