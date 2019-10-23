import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';
import { VeiculoSummary } from '../../../../api/to_de_taxi/models';

@Component({
	template:
`
  <input style="margin: 0px; padding: 0px" nbInput fullWidth type="color" [(ngModel)]="cell.newValue">
`
})

export class CorEditorComponent extends DefaultEditor implements OnInit, AfterViewInit {

	veiculo: VeiculoSummary = null;

	constructor() { super(); }

	ngOnInit()
	{
	}

	ngAfterViewInit(): void
	{
		const self = this;

		self.veiculo = self.cell.getRow().getData();
	}

	trocarCor(colorInput: any)
	{
		const self = this;
		self.cell.newValue = colorInput;
	}
}
