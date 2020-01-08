import { Component, OnDestroy, AfterViewInit } from '@angular/core';

import { DefaultEditor } from 'ng2-smart-table';
import { Subscription, BehaviorSubject } from 'rxjs';
import { VeiculoSummaryExt } from '../veiculos.service';
import { ModeloVeiculo, VeiculoSummary, CorVeiculoSummary } from '../../../../api/to_de_taxi/models';
import { CatalogosService } from '../../../catalogos/catalogos.service';

@Component({
	template:
	`<ngx-seletor-items #seletor
		title="Selecione uma cor"
		[items]="cores"
		[selected_item]="cor"
		[onGetItemHash]="onGetItemHash"
		[onGetItemLabel]="onGetItemLabel"
		(itemSelected)="selecionarCor($event)">
	</ngx-seletor-items>`
})
export class CorEditorComponent extends DefaultEditor implements AfterViewInit, OnDestroy {

	cores: CorVeiculoSummary[] = [];
	cor: CorVeiculoSummary = null;

	corSub: Subscription = null;

	veic: VeiculoSummary = null;

	constructor(private catalogosSrv: CatalogosService){ super(); }

	ngAfterViewInit(): void
	{
		const self = this;

		self.veic = self.cell.getRow().getData();

		self.atualizar();

		self.corSub = self.catalogosSrv.cores.changesSubject.subscribe(changes =>
		{
			self.atualizar();
		});
	}

	private atualizar()
	{
		const self = this;
		self.cores = self.catalogosSrv.cores.items;

		if (!self.cor)
		{
			self.cor = self.cores.find(cor => cor.id === self.veic.idCorVeiculo);
		}
	}

	ngOnDestroy(): void
	{
		const self = this;

		if (self.corSub)
		{
			this.corSub.unsubscribe();
		}
	}

	selecionarCor(cor: CorVeiculoSummary)
	{
		this.cell.newValue = cor.id;
	}

	onGetItemLabel(cor: CorVeiculoSummary)
	{
		return cor ? cor.nome : 'N/I';
	}

	onGetItemHash(cor: CorVeiculoSummary)
	{
		return cor ? cor.id : '';
	}
}
