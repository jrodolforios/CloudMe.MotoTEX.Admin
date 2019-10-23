import { Injectable } from '@angular/core';
import { PontoTaxiSummary } from '../../api/to_de_taxi/models';
import { PontoTaxiService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface } from './api-catalog';

class PontoTaxiApiInterface implements CatalogApiInterface<PontoTaxiSummary>
{
	private pontoTaxiSrv: PontoTaxiService;

	constructor(pontoTaxiSrv: PontoTaxiService)
	{
		this.pontoTaxiSrv = pontoTaxiSrv;
	}

	async get(id: string): Promise<PontoTaxiSummary>
	{
		const self = this;
		let result: PontoTaxiSummary = null;

		await self.pontoTaxiSrv.ApiV1PontoTaxiByIdGet(id).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async getAll(): Promise<PontoTaxiSummary[]>
	{
		const self = this;
		let result: PontoTaxiSummary[] = [];

		await self.pontoTaxiSrv.ApiV1PontoTaxiGet().toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async post(item: PontoTaxiSummary): Promise<string>
	{
		const self = this;
		let result = '';
		await self.pontoTaxiSrv.ApiV1PontoTaxiPost(item).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async put(item: PontoTaxiSummary): Promise<boolean>
	{
		const self = this;
		let result = false;
		await self.pontoTaxiSrv.ApiV1PontoTaxiPut(item).toPromise().then(resp =>
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
		await self.pontoTaxiSrv.ApiV1PontoTaxiByIdDelete(id).toPromise().then(resp =>
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
export class CatalogoPontosTaxi extends ApiCatalog<PontoTaxiSummary>
{
	constructor(private pontoTaxiSrv: PontoTaxiService)
	{
		super(new PontoTaxiApiInterface(pontoTaxiSrv));
	}
}
