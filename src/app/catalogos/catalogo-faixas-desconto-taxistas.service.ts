import { Injectable } from '@angular/core';
import { FaixaDescontoTaxistaSummary } from '../../api/to_de_taxi/models';
import { FaixaDescontoTaxistaService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface } from './api-catalog';

class FaixaDescontoTaxistaApiInterface implements CatalogApiInterface<FaixaDescontoTaxistaSummary>
{
	private faixaDescontoTaxistaSrv: FaixaDescontoTaxistaService;

	constructor(faixaDescontoTaxistaSrv: FaixaDescontoTaxistaService)
	{
		this.faixaDescontoTaxistaSrv = faixaDescontoTaxistaSrv;
	}

	async get(id: string): Promise<FaixaDescontoTaxistaSummary>
	{
		const self = this;
		let result: FaixaDescontoTaxistaSummary = null;

		await self.faixaDescontoTaxistaSrv.ApiV1FaixaDescontoTaxistaByIdGet(id).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async getAll(): Promise<FaixaDescontoTaxistaSummary[]>
	{
		const self = this;
		let result: FaixaDescontoTaxistaSummary[] = [];

		await self.faixaDescontoTaxistaSrv.ApiV1FaixaDescontoTaxistaGet().toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async post(item: FaixaDescontoTaxistaSummary): Promise<string>
	{
		const self = this;
		let result = '';
		await self.faixaDescontoTaxistaSrv.ApiV1FaixaDescontoTaxistaPost(item).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async put(item: FaixaDescontoTaxistaSummary): Promise<boolean>
	{
		const self = this;
		let result = false;
		await self.faixaDescontoTaxistaSrv.ApiV1FaixaDescontoTaxistaPut(item).toPromise().then(resp =>
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
		await self.faixaDescontoTaxistaSrv.ApiV1FaixaDescontoTaxistaByIdDelete(id).toPromise().then(resp =>
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
export class CatalogoFaixasDescontoTaxistas extends ApiCatalog<FaixaDescontoTaxistaSummary>
{
	constructor(private faixaDescontoTaxistaSrv: FaixaDescontoTaxistaService)
	{
		super(new FaixaDescontoTaxistaApiInterface(faixaDescontoTaxistaSrv));
	}
}
