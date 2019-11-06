import { Component, Input, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { CorVeiculoSummary } from '../../../../api/to_de_taxi/models';
import { CatalogosService } from '../../../catalogos/catalogos.service';
import { Subscription } from 'rxjs';

@Component({
	template:
`
	{{cor ? cor.nome : 'N/I'}}
`,
})
export class CorViewComponent implements OnInit, OnDestroy{

	@Input() value: any;
	@Input() rowData: any;

	cor: CorVeiculoSummary = null;
	corSub: Subscription;

	constructor(private catalogosSrv: CatalogosService){}

	async ngOnInit()
	{
		const self = this;

		self.obterCor();

		self.corSub = self.catalogosSrv.cores.changesSubject.subscribe(changes =>
		{
			self.obterCor();
		});
	}

	obterCor()
	{
		const self = this;
		self.cor = self.catalogosSrv.cores.items.find(cor =>
		{
			return cor.id === self.value;
		});
	}

	ngOnDestroy()
	{
		const self = this;
		if (self.corSub)
		{
			self.corSub.unsubscribe();
		}
	}
}
