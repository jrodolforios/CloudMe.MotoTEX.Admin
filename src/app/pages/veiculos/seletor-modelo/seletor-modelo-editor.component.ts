import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { DefaultEditor } from 'ng2-smart-table';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ModeloVeiculo, MarcaVeiculo } from '../../../../api/fipe/models';
import { ModeloVeiculoService } from '../../../../api/fipe/services';
import { VeiculoSummaryExt } from '../veiculos.service';

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

	constructor(private modelosVeicSrv: ModeloVeiculoService){ super(); }

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
					await self.modelosVeicSrv.GetAll(marca.codigo).toPromise().then(info_marca => {
						self.modelos = info_marca.modelos;
						self.veicExt.modeloRef.next(info_marca.modelos.find(modelo => modelo.nome === self.cell.newValue as string));
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
