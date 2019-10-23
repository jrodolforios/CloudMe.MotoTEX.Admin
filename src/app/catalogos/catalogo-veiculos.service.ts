import { Injectable } from '@angular/core';
import { VeiculoSummary } from '../../api/to_de_taxi/models';
import { VeiculoService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface } from './api-catalog';

class VeiculoApiInterface implements CatalogApiInterface<VeiculoSummary>
{
private veiculoSrv: VeiculoService;

	constructor(veiculoSrv: VeiculoService)
	{
		this.veiculoSrv = veiculoSrv;
	}

	async get(id: string): Promise<VeiculoSummary>
	{
		const self = this;
		let result: VeiculoSummary = null;

		await self.veiculoSrv.ApiV1VeiculoByIdGet(id).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async getAll(): Promise<VeiculoSummary[]>
	{
		const self = this;
		let result: VeiculoSummary[] = [];

		await self.veiculoSrv.ApiV1VeiculoGet().toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async post(item: VeiculoSummary): Promise<string>
	{
		const self = this;
		let result = '';
		await self.veiculoSrv.ApiV1VeiculoPost(item).toPromise().then(resp =>
		{
			if (resp && resp.success)
			{
				result = resp.data;
			}
		});

		return result;
	}

	async put(item: VeiculoSummary): Promise<boolean>
	{
		const self = this;
		let result = false;
		await self.veiculoSrv.ApiV1VeiculoPut(item).toPromise().then(resp =>
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
		await self.veiculoSrv.ApiV1VeiculoByIdDelete(id).toPromise().then(resp =>
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
export class CatalogoVeiculos extends ApiCatalog<VeiculoSummary>
{
	constructor(private veiculoSrv: VeiculoService)
	{
		super(new VeiculoApiInterface(veiculoSrv));
	}
}
