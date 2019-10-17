import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { VeiculoSummary, TaxistaSummary, VeiculoTaxistaSummary } from '../../../../api/to_de_taxi/models';
import { BusyStack } from '../../../@core/utils/busy_stack';
import { Subscription } from 'rxjs';
import { VeiculoService, VeiculoTaxistaService, TaxistaService } from '../../../../api/to_de_taxi/services';

interface VeiculoTaxistaExt extends VeiculoTaxistaSummary
{
	veiculo: VeiculoSummary;
}

@Component({
	selector: 'ngx-veiculos-taxista',
	templateUrl: './veiculos-taxista.component.html',
	styleUrls: ['./veiculos-taxista.component.scss']
})
export class VeiculosTaxistaComponent implements AfterViewInit {

	veiculoSel: VeiculoSummary = null;
	veiculos: VeiculoSummary[] = [];
	veiculosTaxista: VeiculoTaxistaExt[] = [];

	busyStackVeiculos = new BusyStack();
	busyStackVeiculosSub: Subscription = null;

	_taxista: TaxistaSummary = null;

	@Input()
	set taxista(value: TaxistaSummary)
	{
		const self = this;
		if (value !== self._taxista)
		{
			self._taxista = value;
			self.obterVeiculosTaxista(value);
		}
	}
	get taxista(): TaxistaSummary
	{
		return this._taxista;
	}

	constructor(
		private taxistaSrv: TaxistaService,
		private veiculoSrv: VeiculoService) { }

	ngAfterViewInit()
	{
		const self = this;
		self.obterVeiculos();
	}

	private async obterVeiculos()
	{
		const self = this;

		self.busyStackVeiculos.push();

		await self.veiculoSrv.ApiV1VeiculoGet().toPromise().then(async resp => {
			if (resp && resp.success)
			{
				resp.data.sort((veic1, veic2) =>
				{
					return (veic1.marca + veic1.modelo + veic1.placa).localeCompare(veic2.marca + veic2.modelo + veic2.placa);
				});

				self.veiculos = resp.data;
			}
		});

		self.busyStackVeiculos.pop();
	}

	private async obterVeiculosTaxista(taxista: TaxistaSummary)
	{
		const self = this;

		self.busyStackVeiculos.push();

		if (!taxista)
		{
			self.veiculosTaxista = [];
		}
		else
		{
			await self.taxistaSrv.ApiV1TaxistaByIdVeiculosGet(taxista.id).toPromise().then(async resp => {
				if (resp && resp.success)
				{
					const tmpVeicsTxExt: VeiculoTaxistaExt[] = [];

					resp.data.forEach(veic_tx => {
						const veicTxExt: VeiculoTaxistaExt = {
							id: veic_tx.id,
							ativo: veic_tx.ativo,
							idTaxista: veic_tx.idTaxista,
							idVeiculo: veic_tx.idVeiculo,
							veiculo: self.veiculos.find(veic =>
							{
								return veic.id === veic_tx.id;
							})
						};

						tmpVeicsTxExt.push(veicTxExt);
					});
					tmpVeicsTxExt.sort((veicTx1, veicTx2) =>
					{
						return (veicTx1.veiculo.marca + veicTx1.veiculo.modelo + veicTx1.veiculo.placa)
							.localeCompare(veicTx2.veiculo.marca + veicTx2.veiculo.modelo + veicTx2.veiculo.placa);
					});
					self.veiculos = resp.data;
				}
			});
		}

		self.busyStackVeiculos.pop();
	}
}
