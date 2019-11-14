import { Injectable } from '@angular/core';
import { PassageiroSummary } from '../../api/to_de_taxi/models';
import { PassageiroService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, processResponse, ApiResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';

class PassageiroApiInterface implements CatalogApiInterface<PassageiroSummary>
{
	private passageiroSrv: PassageiroService;

	constructor(passageiroSrv: PassageiroService)
	{
		this.passageiroSrv = passageiroSrv;
	}

	async get(id: string): Promise<PassageiroSummary>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.passageiroSrv.ApiV1PassageiroByIdGet(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<PassageiroSummary>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async getAll(): Promise<PassageiroSummary[]>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.passageiroSrv.ApiV1PassageiroGet().toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<PassageiroSummary[]>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async post(item: PassageiroSummary): Promise<string>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.passageiroSrv.ApiV1PassageiroPost(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<string>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async put(item: PassageiroSummary): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.passageiroSrv.ApiV1PassageiroPut(item).toPromise().then(resp =>
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
			await self.passageiroSrv.ApiV1PassageiroByIdDelete(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}
}

@Injectable()
export class CatalogoPassageiros extends ApiCatalog<PassageiroSummary>
{
	constructor(private oauthService: OAuthService, private passageiroSrv: PassageiroService)
	{
		super(oauthService, new PassageiroApiInterface(passageiroSrv), 'passageiro', 'passageiro');
	}
}
