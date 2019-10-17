import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { DefaultEditor } from 'ng2-smart-table';
import { Subscription, BehaviorSubject } from 'rxjs';
import { VeiculoSummaryExt } from '../veiculos.service';
import { ModeloVeiculo } from '../../../../api/to_de_taxi/models';
import { VeiculoService } from '../../../../api/to_de_taxi/services';

@Component({
	template:
	`<ngx-seletor-items #seletor
		title="Selecione um modelo"
		[items]="modelos"
		[selected_item]="veicExt ? veicExt.modeloRef.value : null"
		[onGetItemHash]="onGetItemHash"
		[onGetItemLabel]="onGetItemLabel"
		(itemSelected)="selecionarModelo($event)">
	</ngx-seletor-items>`
})
export class SeletorModeloEditorComponent extends DefaultEditor implements OnInit, AfterViewInit, OnDestroy {

	modelos: ModeloVeiculo[] = [];
	marcaSub: Subscription;

	veic: any = null;
	veicExt: VeiculoSummaryExt = null;

	constructor(private veiculoSrv: VeiculoService){ super(); }

	ngOnInit(): void
	{
	}

	ngAfterViewInit(): void
	{
		const self = this;

		self.veic = this.cell.getRow().getData();
		if (!self.veic.veicExt)
		{
			self.veic.veicExt = new VeiculoSummaryExt(self.veic);
		}
		self.veicExt = self.veic.veicExt;

		const marcaRef = self.veicExt.marcaRef;

		if (marcaRef)
		{
			self.marcaSub = marcaRef.subscribe(async marca => {

				if (marca)
				{
					await self.veiculoSrv.ApiV1VeiculoModelosByCodigoMarcaGet(marca.codigo).toPromise().then(resp_info_marca => {
						if (resp_info_marca && resp_info_marca.success)
						{
							self.modelos = resp_info_marca.data.modelos;
							self.veicExt.modeloRef.next(self.modelos.find(modelo => modelo.nome === self.cell.newValue as string));
						}
					});
				}
				else
				{
					self.veicExt.modeloRef.next(null);
				}
			});
		}
	}

	ngOnDestroy(): void
	{
		const self = this;

		if (self.marcaSub)
		{
			this.marcaSub.unsubscribe();
		}
	}

	selecionarModelo(modelo: ModeloVeiculo)
	{
		const self = this;
		this.cell.newValue = modelo.nome;
		self.veicExt.modeloRef.next(modelo);
	}

	onGetItemLabel(modelo: ModeloVeiculo)
	{
		return modelo ? modelo.nome : 'N/I';
	}

	onGetItemHash(modelo: ModeloVeiculo)
	{
		return modelo ? modelo.codigo : '';
	}
}
