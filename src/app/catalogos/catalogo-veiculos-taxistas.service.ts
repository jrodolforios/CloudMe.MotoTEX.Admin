import { Injectable } from '@angular/core';
import { VeiculoTaxistaSummary } from '../../api/to_de_taxi/models';
import { VeiculoTaxistaService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface } from './api-catalog';

class VeiculoTaxistaApiInterface implements CatalogApiInterface<VeiculoTaxistaSummary>
{
	private veiculoTaxistaSrv: VeiculoTaxistaService;

	constructor(veiculoTaxistaSrv: VeiculoTaxistaService)
	{
		this.veiculoTaxistaSrv = veiculoTaxistaSrv;
	}

	async get(id: string): Promise<VeiculoTaxistaSummary>
	{
		const self = this;
		let result: VeiculoTaxistaSummary = null;

		await self.veiculoTaxistaSrv.ApiV1VeiculoTaxistaByIdGet(id).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async getAll(): Promise<VeiculoTaxistaSummary[]>
	{
		const self = this;
		let result: VeiculoTaxistaSummary[] = [];

		await self.veiculoTaxistaSrv.ApiV1VeiculoTaxistaGet().toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async post(item: VeiculoTaxistaSummary): Promise<string>
	{
		const self = this;
		let result = '';
		await self.veiculoTaxistaSrv.ApiV1VeiculoTaxistaPost(item).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async put(item: VeiculoTaxistaSummary): Promise<boolean>
	{
		const self = this;
		let result = false;
		await self.veiculoTaxistaSrv.ApiV1VeiculoTaxistaPut(item).toPromise().then(resp =>
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
		await self.veiculoTaxistaSrv.ApiV1VeiculoTaxistaByIdDelete(id).toPromise().then(resp =>
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
export class CatalogoVeiculosTaxistas extends ApiCatalog<VeiculoTaxistaSummary>
{
	constructor(private veiculoTaxistaSrv: VeiculoTaxistaService)
	{
		super(new VeiculoTaxistaApiInterface(veiculoTaxistaSrv));
	}
}
