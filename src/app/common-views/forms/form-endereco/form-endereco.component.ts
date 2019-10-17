import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject, Subscription, EMPTY } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EnderecoSummary } from '../../../../api/to_de_taxi/models';
import { NbToastrService } from '@nebular/theme';
import { EnderecoService } from '../../../../api/to_de_taxi/services';

@Component({
	selector: 'ngx-form-endereco',
	templateUrl: './form-endereco.component.html',
	styleUrls: ['./form-endereco.component.scss']
})
export class FormEnderecoComponent implements OnInit, OnDestroy {

	private _endereco: EnderecoSummary = null;

	@Input() desabilitarControles: boolean = true;

	@Input()
	set endereco(value: EnderecoSummary)
	{
		const self = this;

		self.form.reset();

		self._endereco = value;
		if (self._endereco)
		{
			self.form.patchValue(
			{
				cep: self._endereco.cep,
				logradouro: self._endereco.logradouro,
				numero: self._endereco.numero,
				complemento: self._endereco.complemento,
				bairro: self._endereco.bairro,
				localidade: self._endereco.localidade,
				uf: self._endereco.uf
			});
		}
	}

	get endereco(): EnderecoSummary
	{
		return this._endereco;
	}

	cepAlterado = new Subject<string>();
	private cepAlteradoSub: Subscription;

	form: FormGroup = new FormGroup(
	{
		'cep': new FormControl('', [Validators.required]),
		'logradouro': new FormControl('', [Validators.required]),
		'numero': new FormControl('', [Validators.required]),
		'complemento': new FormControl(''),
		'bairro': new FormControl('', [Validators.required]),
		'localidade': new FormControl('', [Validators.required]),
		'uf': new FormControl('', [Validators.required])
	});

	get cep() { return this.form.get('cep'); }
	get logradouro() { return this.form.get('logradouro'); }
	get numero() { return this.form.get('numero'); }
	get complemento() { return this.form.get('complemento'); }
	get bairro() { return this.form.get('bairro'); }
	get localidade() { return this.form.get('localidade'); }
	get uf() { return this.form.get('uf'); }

	constructor(
		private enderecoSrv: EnderecoService,
		private toastSrv: NbToastrService) { }

	ngOnInit()
	{
		const self = this;

		self.cepAlteradoSub = self.cepAlterado.pipe(
			debounceTime(1000),
			distinctUntilChanged(),
			switchMap(term =>
			{
				self.obterEndereco(term);
				return EMPTY;
			})
		).subscribe();
	}

	ngOnDestroy(): void
	{
		const self = this;
		self.cepAlteradoSub.unsubscribe();
	}

	get alterado(): boolean
	{
		const self = this;

		if (!self._endereco) return false;
		else if (self.cep.value !== self._endereco.cep) return true;
		else if (self.logradouro.value !== self._endereco.logradouro) return true;
		else if (self.numero.value !== self._endereco.numero) return true;
		else if (self.complemento.value !== self._endereco.complemento) return true;
		else if (self.bairro.value !== self._endereco.bairro) return true;
		else if (self.localidade.value !== self._endereco.localidade) return true;
		else if (self.uf.value !== self._endereco.uf) return true;
		return false;
	}

	private async obterEndereco(cep: string)
	{
		const self = this;
		await self.enderecoSrv.ApiV1EnderecoConsultaCepByCepGet(cep).toPromise().then(resp_endereco =>
		{
			if (resp_endereco && resp_endereco.success)
			{
				self.form.patchValue(resp_endereco.data);
			}
		});
	}

	public obterAlteracoes(): EnderecoSummary
	{
		const self = this;
		if (!self._endereco)
		{
			return null;
		}

		if (!self.alterado)
		{
			return self._endereco;
		}

		return {
			id: self._endereco.id,
			cep: self.cep.value,
			logradouro: self.logradouro.value,
			numero: self.numero.value,
			complemento: self.complemento.value,
			bairro: self.bairro.value,
			localidade: self.localidade.value,
			uf: self.uf.value
		};
	}

	public redefinir()
	{
		const self = this;
		self.endereco = self._endereco;
	}
}
