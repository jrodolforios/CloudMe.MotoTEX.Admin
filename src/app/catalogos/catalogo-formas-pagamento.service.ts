import { Injectable } from '@angular/core';
import { FormaPagamentoSummary } from '../../api/to_de_taxi/models';
import { FormaPagamentoService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface } from './api-catalog';

class FormaPagamentoApiInterface implements CatalogApiInterface<FormaPagamentoSummary>
{
	private formaPagamentoSrv: FormaPagamentoService;

	constructor(formaPagamentoSrv: FormaPagamentoService)
	{
		this.formaPagamentoSrv = formaPagamentoSrv;
	}

	async get(id: string): Promise<FormaPagamentoSummary>
	{
		const self = this;
		let result: FormaPagamentoSummary = null;

		await self.formaPagamentoSrv.ApiV1FormaPagamentoByIdGet(id).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async getAll(): Promise<FormaPagamentoSummary[]>
	{
		const self = this;
		let result: FormaPagamentoSummary[] = [];

		await self.formaPagamentoSrv.ApiV1FormaPagamentoGet().toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async post(item: FormaPagamentoSummary): Promise<string>
	{
		const self = this;
		let result = '';
		await self.formaPagamentoSrv.ApiV1FormaPagamentoPost(item).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async put(item: FormaPagamentoSummary): Promise<boolean>
	{
		const self = this;
		let result = false;
		await self.formaPagamentoSrv.ApiV1FormaPagamentoPut(item).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async delete(id: string): Promise<boolean>
	{
		const self = this;
		let result = false;
		await self.formaPagamentoSrv.ApiV1FormaPagamentoByIdDelete(id).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}
}

@Injectable()
export class CatalogoFormasPagamento extends ApiCatalog<FormaPagamentoSummary>
{
	constructor(private formaPagamentoSrv: FormaPagamentoService)
	{
		super(new FormaPagamentoApiInterface(formaPagamentoSrv));
	}
}
