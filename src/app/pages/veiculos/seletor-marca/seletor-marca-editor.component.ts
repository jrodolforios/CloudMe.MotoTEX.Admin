import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { DefaultEditor } from 'ng2-smart-table';
import { MarcaVeiculo } from '../../../../api/fipe/models';
import { VeiculosService, VeiculoSummaryExt } from '../veiculos.service';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
	template:
	`<ngx-seletor-items #seletor
		title="Selecione uma marca"
		[items]="marcas"
		[selected_item]="veicExt ? veicExt.marcaRef.value : null"
		[onGetItemHash]="onGetItemHash"
		[onGetItemLabel]="onGetItemLabel"
		(itemSelected)="selecionarMarca($event)">
	</ngx-seletor-items>`
})
export class SeletorMarcaEditorComponent extends DefaultEditor implements OnInit, AfterViewInit, OnDestroy {

	marcas: MarcaVeiculo[] = [];
	marcasSub: Subscription;

	veic: any = null;
	veicExt: VeiculoSummaryExt = null;

	constructor( private veiculosSrv: VeiculosService )
	{
		super();
	}

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

		self.marcasSub = self.veiculosSrv.marcasVeiculos.subscribe(marcas => {
			self.marcas = marcas;
			self.veicExt.marcaRef.next(marcas.find(marca => marca.nome === self.cell.newValue as string));
		});
	}

	ngOnDestroy(): void
	{
		const self = this;
		if (self.marcasSub)
		{
			self.marcasSub.unsubscribe();
		}
	}

	selecionarMarca(marca: MarcaVeiculo)
	{
		const self = this;
		self.cell.newValue = marca.nome;
		self.veicExt.marcaRef.next(marca);
	}

	onGetItemLabel(marca: MarcaVeiculo)
	{
		return marca ? marca.nome : 'N/I';
	}

	onGetItemHash(marca: MarcaVeiculo)
	{
		return marca ? marca.codigo : '';
	}
}
