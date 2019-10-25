import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CredenciaisUsuario } from '../../../../api/to_de_taxi/models';

export const conferirSenhaValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null =>
{
	const senha = control.get('senha');
	const conferir_senha = control.get('conferir_senha');
	return senha && conferir_senha && senha.value !== conferir_senha.value ? { 'senhasDiferentes': true } : null;
};

@Component({
	selector: 'ngx-form-credenciais',
	templateUrl: './form-credenciais.component.html',
	styleUrls: ['./form-credenciais.component.scss']
})
export class FormCredenciaisComponent implements OnInit, OnDestroy {

	private _credenciais: CredenciaisUsuario = null;

	@Input() desabilitarControles: boolean = true;
	@Input() validarSenhaAnterior: boolean = true;

	@Input()
	set credenciais(value: CredenciaisUsuario)
	{
		const self = this;

		self.form.reset();

		self._credenciais = value;
		if (self._credenciais)
		{
			self.form.patchValue(
			{
				login: self._credenciais.login,
				senha: self._credenciais.senha,
				senha_anterior: self._credenciais.senhaAnterior,
				conferir_senha: self._credenciais.confirmarSenha,
			});
		}
	}

	get credenciais(): CredenciaisUsuario
	{
		return this._credenciais;
	}

	form: FormGroup = new FormGroup(
	{
		'login': new FormControl('', [Validators.required]),
		'senha_anterior': new FormControl('', /*[Validators.required]*/),
		'senha': new FormControl('', [Validators.required]),
		'conferir_senha': new FormControl('', [Validators.required])
	}, { validators: conferirSenhaValidator });

	get login() { return this.form.get('login'); }
	get senha() { return this.form.get('senha'); }
	get senha_anterior() { return this.form.get('senha_anterior'); }
	get conferir_senha() { return this.form.get('conferir_senha'); }

	constructor() { }

	ngOnInit()
	{
	}

	ngOnDestroy(): void
	{
	}

	get alterado(): boolean
	{
		const self = this;

		/*if (self._credenciais)
		{
			return (
				self.login.value !== this._credenciais.login ||
				self.senha.value !== this._credenciais.senha
			);
		}*/

		return (
			self.login.touched && self.login.dirty ||
			self.senha.touched && self.senha.dirty);
	}

	public obterAlteracoes(): CredenciaisUsuario
	{
		const self = this;

		return {
			login: self.login.value,
			senha: self.senha.value,
			confirmarSenha: self.conferir_senha.value,
			senhaAnterior: self.senha_anterior.value
		};
	}

	public redefinir()
	{
		const self = this;
		self.credenciais = self._credenciais;
	}
}
