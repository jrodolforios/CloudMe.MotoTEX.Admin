import { Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { VeiculoSummary, TaxistaSummary, VeiculoTaxistaSummary } from '../../../../api/to_de_taxi/models';
import { BusyStack } from '../../../@core/utils/busy_stack';
import { Subscription } from 'rxjs';
import { VeiculoService, VeiculoTaxistaService, TaxistaService } from '../../../../api/to_de_taxi/services';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { BaseCardComponent } from '../../../common-views/base-card/base-card.component';
import { ConfirmDialogComponent } from '../../../common-views/confirm-dialog/confirm-dialog.component';

interface VeiculoTaxistaExt extends VeiculoTaxistaSummary
{
	veiculo: VeiculoSummary;
}

@Component({
	selector: 'ngx-veiculos-taxista',
	templateUrl: './veiculos-taxista.component.html',
	styleUrls: ['./veiculos-taxista.component.scss']
})
export class VeiculosTaxistaComponent implements AfterViewInit, OnDestroy {

	@ViewChild('baseCard', null) baseCard: BaseCardComponent;

	veiculoSel: VeiculoSummary = null;
	veiculos: VeiculoSummary[] = [];
	veiculosPermitidos: VeiculoSummary[] = [];
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
			if (self._taxista)
			{
				self.obterVeiculosTaxista(self._taxista);
			}
		}
	}
	get taxista(): TaxistaSummary
	{
		return this._taxista;
	}

	constructor(
		private taxistaSrv: TaxistaService,
		private veiculoSrv: VeiculoService,
		private veicTxSrv: VeiculoTaxistaService,
		private toastSrv: NbToastrService,
		private dialogSrv: NbDialogService) { }

	ngAfterViewInit()
	{
		const self = this;

		self.busyStackVeiculosSub = self.busyStackVeiculos.busy.subscribe(() =>
		{
			if (self.baseCard)
			{
				self.baseCard.toggleRefresh(self.busyStackVeiculos.busy.value > 0);
			}
		});

		self.obterVeiculos();
	}

	ngOnDestroy()
	{
		this.busyStackVeiculosSub.unsubscribe();
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

		if (!taxista || !taxista.id)
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
								return veic.id === veic_tx.idVeiculo;
							})
						};

						tmpVeicsTxExt.push(veicTxExt);
					});
					tmpVeicsTxExt.sort((veicTx1, veicTx2) =>
					{
						return (veicTx1.veiculo.marca + veicTx1.veiculo.modelo + veicTx1.veiculo.placa)
							.localeCompare(veicTx2.veiculo.marca + veicTx2.veiculo.modelo + veicTx2.veiculo.placa);
					});
					self.veiculosTaxista = tmpVeicsTxExt;

					// filtra os veículos permitidos para nova associação
					self.veiculosPermitidos = self.veiculos.filter((veic, index, array) =>
					{
						return !self.veiculosTaxista.find((veic_tx, idx, obj) =>
							{
								return veic_tx.idVeiculo === veic.id;
							});
					});
				}
			});
		}

		self.busyStackVeiculos.pop();
	}

	onGetItemLabel(veiculo: VeiculoSummary)
	{
		return veiculo ? veiculo.placa : 'N/I';
	}

	onGetItemHash(veiculo: VeiculoSummary)
	{
		return veiculo ? veiculo.id : '';
	}

	selecionarVeiculo(veiculo: VeiculoSummary)
	{
		const self = this;
		self.veiculoSel = veiculo;
	}

	podeAdicionar(veiculo: VeiculoSummary): boolean
	{
		const self = this;
		return self.taxista && veiculo && !self.veiculosTaxista.find(veixTx => {
			return veixTx.idVeiculo === veiculo.id;
		});
	}

	async adicionar(veiculo: VeiculoSummary)
	{
		const self = this;
		self.veicTxSrv.ApiV1VeiculoTaxistaPost({
			id: undefined,
			idTaxista: self.taxista.id,
			idVeiculo: veiculo.id
		}).toPromise().then(resp_adicionar =>
		{
			if (resp_adicionar && resp_adicionar.success)
			{
				self.toastSrv.success('Veículo associado com sucesso ao taxista!', 'Veículo/Taxista');
				self.obterVeiculosTaxista(self.taxista);
			}
		});
	}

	async remover(veiculo_taxista: VeiculoTaxistaSummary)
	{
		const self = this;

		await self.dialogSrv.open(
			ConfirmDialogComponent,
			{
				context:
				{
					title: 'Taxistas',
					prompt: 'Desassociar veículo do taxista?'
				},
			})
			.onClose.toPromise().then(async result =>
			{
				if (result)
				{
					self.veicTxSrv.ApiV1VeiculoTaxistaByIdDelete(veiculo_taxista.id).toPromise().then(resp_remover =>
					{
						if (resp_remover && resp_remover.success)
						{
							self.toastSrv.success('Veículo desassociado com sucesso!', 'Veículo/Taxista');
							self.obterVeiculosTaxista(self.taxista);
						}
					});
				}
			});
	}
}
