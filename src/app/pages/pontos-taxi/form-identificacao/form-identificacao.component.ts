import { Component, OnInit, Input } from '@angular/core';
import { PontoTaxiSummary } from '../../../../api/to_de_taxi/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'ngx-form-identificacao',
	templateUrl: './form-identificacao.component.html',
	styleUrls: ['./form-identificacao.component.scss']
})
export class FormIdentificacaoComponent implements OnInit {

	private _pontoTaxi: PontoTaxiSummary = null;

	form: FormGroup = new FormGroup(
	{
		'nome': new FormControl('', [Validators.required]),
	});

	@Input() desabilitarControles: boolean = true;

	@Input()
	set pontoTaxi(value: PontoTaxiSummary)
	{
		const self = this;

		self.form.reset();

		self._pontoTaxi = value;
		if (self._pontoTaxi)
		{
			self.form.patchValue(
			{
				nome: self._pontoTaxi.nome,
			});
		}
	}

	get nome() { return this.form.get('nome'); }

	get alterado(): boolean
	{
		const self = this;

		if (!self._pontoTaxi) return false;
		else if (self.nome.value !== self._pontoTaxi.nome) return true;
		return false;
	}

	constructor() { }

	ngOnInit() {
	}

	public obterAlteracoes(): string
	{
		const self = this;
		if (!self._pontoTaxi)
		{
			return '';
		}

		if (!self.alterado)
		{
			return self._pontoTaxi.nome;
		}

		return self.nome.value;
	}

	public redefinir()
	{
		const self = this;
		self.pontoTaxi = self._pontoTaxi;
	}
}
