import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioSummary } from '../../../../api/to_de_taxi/models';

@Component({
	selector: 'ngx-form-usuario',
	templateUrl: './form-usuario.component.html',
	styleUrls: ['./form-usuario.component.scss']
})
export class FormUsuarioComponent implements OnInit, OnDestroy {

	private _usuario: UsuarioSummary = null;

	@Input() desabilitarControles: boolean = true;

	@Input()
	set usuario(value: UsuarioSummary)
	{
		const self = this;

		self.form.reset();

		self._usuario = value;
		if (self._usuario)
		{
			self.form.patchValue(
			{
				nome: self._usuario.nome,
				rg: self._usuario.rg,
				cpf: self._usuario.cpf,
				email: self._usuario.email,
				telefone: self._usuario.telefone,
			});
		}
	}

	get usuario(): UsuarioSummary
	{
		return this._usuario;
	}

	form: FormGroup = new FormGroup(
	{
		'nome': new FormControl('', [Validators.required]),
		'rg': new FormControl('', [Validators.required]),
		'cpf': new FormControl('', [Validators.required]),
		'email': new FormControl('', [Validators.required]),
		'telefone': new FormControl('', [Validators.required]),
	});

	get nome() { return this.form.get('nome'); }
	get rg() { return this.form.get('rg'); }
	get cpf() { return this.form.get('cpf'); }
	get email() { return this.form.get('email'); }
	get telefone() { return this.form.get('telefone'); }

	get alterado(): boolean
	{
		const self = this;

		if (self._usuario)
		{
			return (
				self.nome.value !== this._usuario.nome ||
				self.rg.value !== this._usuario.rg ||
				self.cpf.value !== this._usuario.cpf ||
				self.email.value !== this._usuario.email ||
				self.telefone.value !== this._usuario.telefone
			);
		}

		return (
			self.nome.touched && self.nome.dirty ||
			self.rg.touched && self.rg.dirty ||
			self.cpf.touched && self.cpf.dirty ||
			self.email.touched && self.email.dirty ||
			self.telefone.touched && self.telefone.dirty);
	}

	constructor() { }

	ngOnInit()
	{
	}

	ngOnDestroy(): void
	{
	}

	public obterAlteracoes(): UsuarioSummary
	{
		const self = this;
		return {
			id: self._usuario ? self._usuario.id : undefined,
			nome: self.nome.value,
			rg: self.rg.value,
			cpf: self.cpf.value,
			email: self.email.value,
			telefone: self.telefone.value,
		};
	}

	public redefinir()
	{
		const self = this;
		self.usuario = self._usuario;
	}
}
