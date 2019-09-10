import { Component, OnInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
	template:
	`<input nbInput shape='semi-round' type="number" min="1" [(ngModel)]="capacidade"/>`
})
export class CapacidadeEditorComponent extends DefaultEditor implements OnInit {

	private _capacidade: number = 1;

	get capacidade(): number
	{
		return this._capacidade || 1;
	}
	set capacidade(value: number)
	{
		this._capacidade = value;
		this.cell.newValue = this._capacidade;
	}

	constructor() { super(); }

	ngOnInit() {
		this.capacidade = +this.cell.newValue;
	}

}
