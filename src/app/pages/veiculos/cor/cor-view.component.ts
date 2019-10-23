import { Component, Input, AfterViewInit } from '@angular/core';
import { VeiculoSummary } from '../../../../api/to_de_taxi/models';

@Component({
	template:
`
	<input style="margin: 0px; padding: 0px" nbInput fullWidth type="color" disabled [(ngModel)]="rowData.cor">
`,
})
export class CorViewComponent implements AfterViewInit{

	@Input() value: any;
	@Input() rowData: any;

	cor: string = 'rgba(0,0,0,0)';

	constructor(){}

	async ngAfterViewInit()
	{
	}
}
