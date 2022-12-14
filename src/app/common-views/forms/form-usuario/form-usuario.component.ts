import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { UsuarioSummary } from '../../../../api/to_de_taxi/models';


export function isValidCpf(): ValidatorFn
{
	return (control: AbstractControl): Validators =>
	{
		const cpf = control.value;
		if (cpf)
		{
			let numbers, digits, sum, i, result, equalDigits;
			equalDigits = 1;

			if (cpf.length < 11)
			{
				return null;
			}

			for (i = 0; i < cpf.length - 1; i++)
			{
				if (cpf.charAt(i) !== cpf.charAt(i + 1))
				{
					equalDigits = 0;
					break;
				}
			}

			if (!equalDigits)
			{
				numbers = cpf.substring(0, 9);
				digits = cpf.substring(9);
				sum = 0;

				for (i = 10; i > 1; i--)
				{
					sum += numbers.charAt(10 - i) * i;
				}

				result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

				if (result !== Number(digits.charAt(0)))
				{
					return { cpfNotValid: true };
				}
				numbers = cpf.substring(0, 10);
				sum = 0;

				for (i = 11; i > 1; i--)
				{
					sum += numbers.charAt(11 - i) * i;
				}

				result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

				if (result !== Number(digits.charAt(1)))
				{
					return { cpfNotValid: true };
				}

				return null;
			}
			else
			{
				return { cpfNotValid: true };
			}
		}
		return null;
	};
}

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
		'cpf': new FormControl('', [Validators.required, isValidCpf()]),
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
