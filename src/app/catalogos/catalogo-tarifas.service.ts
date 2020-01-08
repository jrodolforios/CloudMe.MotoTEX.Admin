import { Injectable } from '@angular/core';
import { TarifaSummary } from '../../api/to_de_taxi/models';
import { TarifaService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, ApiResponse, processResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';

class TarifaApiInterface implements CatalogApiInterface<TarifaSummary>
{
	private tarifaSrv: TarifaService;

	constructor(tarifaSrv: TarifaService)
	{
		this.tarifaSrv = tarifaSrv;
	}

	async get(id: string): Promise<TarifaSummary>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.tarifaSrv.ApiV1TarifaByIdGet(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<TarifaSummary>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async getAll(): Promise<TarifaSummary[]>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.tarifaSrv.ApiV1TarifaGet().toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<TarifaSummary[]>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async post(item: TarifaSummary): Promise<string>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.tarifaSrv.ApiV1TarifaPost(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<string>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async put(item: TarifaSummary): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.tarifaSrv.ApiV1TarifaPut(item).toPromise().then(resp =>
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
			await self.tarifaSrv.ApiV1TarifaByIdDelete(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}
}

@Injectable()
export class CatalogoTarifas extends ApiCatalog<TarifaSummary>
{
	constructor(private oauthService: OAuthService, private tarifaSrv: TarifaService)
	{
		super(oauthService, new TarifaApiInterface(tarifaSrv), 'tarifa', 'tarifa');
	}
}
