import { Component, OnInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
	template:
	`<input nbInput mask="percent" suffix="%" shape='semi-round' type="text" [(ngModel)]="valor"/>`
})
export class ValorEditorComponent extends DefaultEditor implements OnInit {

	private _valor: string;

	get valor(): string
	{
		return this._valor;
	}
	set valor(value: string)
	{
		this._valor = value;
		this.cell.newValue = this._valor;
	}

	constructor() { super(); }

	ngOnInit() {
		this.valor = this.cell.newValue;
	}

}
