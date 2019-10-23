import { Injectable } from '@angular/core';
import { TaxistaSummary } from '../../api/to_de_taxi/models';
import { TaxistaService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface } from './api-catalog';

class TaxistaApiInterface implements CatalogApiInterface<TaxistaSummary>
{
	private taxistaSrv: TaxistaService;

	constructor(taxistaSrv: TaxistaService)
	{
		this.taxistaSrv = taxistaSrv;
	}

	async get(id: string): Promise<TaxistaSummary>
	{
		const self = this;
		let result: TaxistaSummary = null;

		await self.taxistaSrv.ApiV1TaxistaByIdGet(id).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async getAll(): Promise<TaxistaSummary[]>
	{
		const self = this;
		let result: TaxistaSummary[] = [];

		await self.taxistaSrv.ApiV1TaxistaGet().toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async post(item: TaxistaSummary): Promise<string>
	{
		const self = this;
		let result = '';
		await self.taxistaSrv.ApiV1TaxistaPost(item).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async put(item: TaxistaSummary): Promise<boolean>
	{
		const self = this;
		let result = false;
		await self.taxistaSrv.ApiV1TaxistaPut(item).toPromise().then(resp =>
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
		await self.taxistaSrv.ApiV1TaxistaByIdDelete(id).toPromise().then(resp =>
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
export class CatalogoTaxistas extends ApiCatalog<TaxistaSummary>
{
	constructor(private taxistaSrv: TaxistaService)
	{
		super(new TaxistaApiInterface(taxistaSrv));
	}
}
