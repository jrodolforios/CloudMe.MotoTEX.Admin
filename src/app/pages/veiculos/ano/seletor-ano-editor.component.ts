import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { DefaultEditor } from 'ng2-smart-table';
import { Subscription, BehaviorSubject } from 'rxjs';
import { VeiculoSummaryExt } from '../veiculos.service';
import { ModeloVeiculo, AnoVersao, VeiculoSummary } from '../../../../api/to_de_taxi/models';
import { VeiculoService } from '../../../../api/to_de_taxi/services';

@Component({
	template:
	`<ngx-seletor-items #seletor
		title="Selecione o ano"
		[items]="anos"
		[selected_item]="veic ? veic.ano : null"
		[onGetItemHash]="onGetItemHash"
		[onGetItemLabel]="onGetItemLabel"
		(itemSelected)="selecionarAno($event)">
	</ngx-seletor-items>`
})
export class SeletorAnoEditorComponent extends DefaultEditor implements OnInit, AfterViewInit, OnDestroy {

	anos: string[] = [];
	modeloSub: Subscription;

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
			self.veic.veicExt = new VeiculoSummaryExt(/*self.veic*/);
		}
		self.veicExt = self.veic.veicExt;

		const marcaRef = self.veicExt.marcaRef;
		const modeloRef = self.veicExt.modeloRef;

		if (marcaRef && modeloRef)
		{
			self.modeloSub = modeloRef.subscribe(async modelo => {

				if (modelo)
				{
					await self.veiculoSrv.ApiV1VeiculoAnosVersoesByCodigoModeloGet({
						codigoMarca: marcaRef.value.codigo,
						codigoModelo: modelo.codigo
					}).toPromise().then(resp_anos_versoes => {
						if (resp_anos_versoes && resp_anos_versoes.success)
						{
							const distinct_anos = new Set(resp_anos_versoes.data.map(x => x.ano));
							self.anos = [];
							distinct_anos.forEach(ano => {
								self.anos.push(ano);
							});
							(self.veic as VeiculoSummary).ano = self.anos.find(ano => ano === self.cell.newValue as string);
						}
					});
				}
			});
		}
	}

	ngOnDestroy(): void
	{
		const self = this;

		if (self.modeloSub)
		{
			this.modeloSub.unsubscribe();
		}
	}

	selecionarAno(ano: string)
	{
		this.cell.newValue = ano;
	}

	onGetItemLabel(ano: string)
	{
		return ano;
	}

	onGetItemHash(ano: string)
	{
		return ano;
	}
}
