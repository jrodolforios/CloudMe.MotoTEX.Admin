import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
	template:
`
	<div class='container'>
		<div class='row'>
			<input
				nbInput
				class='col'
				type='text'
				mask='SSS'
				oninput='this.value = this.value.toUpperCase()'
				[(ngModel)]='placa_prefixo'/>
			<span class='col-auto'>-</span>
			<input
				nbInput
				class='col'
				type='text'
				mask='0A00'
				oninput='this.value = this.value.toUpperCase()'
				[(ngModel)]='placa_codigo'/>
		</div>
	</div>
`
})
export class PlacaEditorComponent extends DefaultEditor implements OnInit {

	_placa_prefixo: String;
	_placa_codigo: String;

	get placa_prefixo(): String
	{
		return this._placa_prefixo;
	}
	set placa_prefixo(value: String)
	{
		this._placa_prefixo = value;
		this.codificarPlaca();
	}

	get placa_codigo(): String
	{
		return this._placa_codigo;
	}
	set placa_codigo(value: String)
	{
		this._placa_codigo = value;
		this.codificarPlaca();
	}

	constructor() { super(); }

	ngOnInit()
	{
		this.decodificarPlaca();
	}

	decodificarPlaca()
	{
		const strings = (this.cell.newValue as string).split('-');
		if (strings.length > 0)
		{
			this._placa_prefixo = strings[0];
		}
		if (strings.length > 1)
		{
			this._placa_codigo = strings[1];
		}
	}

	codificarPlaca()
	{
		this.cell.newValue = `${this.placa_prefixo}-${this.placa_codigo}`;
	}
}
