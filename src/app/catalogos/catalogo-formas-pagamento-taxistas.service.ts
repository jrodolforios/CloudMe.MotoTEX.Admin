import { Injectable } from '@angular/core';
import { FormaPagamentoTaxistaSummary } from '../../api/to_de_taxi/models';
import { FormaPagamentoTaxistaService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface } from './api-catalog';

class FormaPagamentoTaxistaApiInterface implements CatalogApiInterface<FormaPagamentoTaxistaSummary>
{
	private formaPagamentoTaxistaSrv: FormaPagamentoTaxistaService;

	constructor(formaPagamentoTaxistaSrv: FormaPagamentoTaxistaService)
	{
		this.formaPagamentoTaxistaSrv = formaPagamentoTaxistaSrv;
	}

	async get(id: string): Promise<FormaPagamentoTaxistaSummary>
	{
		const self = this;
		let result: FormaPagamentoTaxistaSummary = null;

		await self.formaPagamentoTaxistaSrv.ApiV1FormaPagamentoTaxistaByIdGet(id).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async getAll(): Promise<FormaPagamentoTaxistaSummary[]>
	{
		const self = this;
		let result: FormaPagamentoTaxistaSummary[] = [];

		await self.formaPagamentoTaxistaSrv.ApiV1FormaPagamentoTaxistaGet().toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async post(item: FormaPagamentoTaxistaSummary): Promise<string>
	{
		const self = this;
		let result = '';
		await self.formaPagamentoTaxistaSrv.ApiV1FormaPagamentoTaxistaPost(item).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async put(item: FormaPagamentoTaxistaSummary): Promise<boolean>
	{
		const self = this;
		let result = false;
		await self.formaPagamentoTaxistaSrv.ApiV1FormaPagamentoTaxistaPut(item).toPromise().then(resp =>
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
		await self.formaPagamentoTaxistaSrv.ApiV1FormaPagamentoTaxistaByIdDelete(id).toPromise().then(resp =>
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
export class CatalogoFormasPagamentoTaxistas extends ApiCatalog<FormaPagamentoTaxistaSummary>
{
	constructor(private formaPagamentoTaxistaSrv: FormaPagamentoTaxistaService)
	{
		super(new FormaPagamentoTaxistaApiInterface(formaPagamentoTaxistaSrv));
	}
}
