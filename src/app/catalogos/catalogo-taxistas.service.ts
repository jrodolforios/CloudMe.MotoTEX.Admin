import { Injectable } from '@angular/core';
import { TaxistaSummary } from '../../api/to_de_taxi/models';
import { TaxistaService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, processResponse, ApiResponse } from './api-catalog';

class TaxistaApiInterface implements CatalogApiInterface<TaxistaSummary>
{
	private taxistaSrv: TaxistaService;

	constructor(taxistaSrv: TaxistaService)
	{
		this.taxistaSrv = taxistaSrv;
	}

	converterFoto(taxista: TaxistaSummary)
	{
		if (taxista.foto && taxista.foto.dados)
		{
			taxista.foto.dados = atob(taxista.foto.dados);
		}
	}

	async get(id: string): Promise<TaxistaSummary>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.taxistaSrv.ApiV1TaxistaByIdGet(id).toPromise().then(resp =>
			{
				if (resp && resp.data)
				{
					self.converterFoto(resp.data);
				}

				processResponse(resp as ApiResponse<TaxistaSummary>, resolve, reject);

			}).catch(reason => reject(reason));
		});
	}

	async getAll(): Promise<TaxistaSummary[]>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.taxistaSrv.ApiV1TaxistaGet().toPromise().then(resp =>
			{
				if (resp && resp.data)
				{
					resp.data.forEach(taxista =>
					{
						self.converterFoto(taxista);
					});
				}

				processResponse(resp as ApiResponse<TaxistaSummary[]>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async post(item: TaxistaSummary): Promise<string>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.taxistaSrv.ApiV1TaxistaPost(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<string>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async put(item: TaxistaSummary): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.taxistaSrv.ApiV1TaxistaPut(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async delete(id: string): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.taxistaSrv.ApiV1TaxistaByIdDelete(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
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
