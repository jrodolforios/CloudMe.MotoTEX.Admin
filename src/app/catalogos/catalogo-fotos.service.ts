import { Injectable } from '@angular/core';
import { FotoSummary } from '../../api/to_de_taxi/models';
import { FotoService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, ApiResponse, processResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';

class FotoApiInterface implements CatalogApiInterface<FotoSummary>
{
	private fotoSrv: FotoService;

	constructor(fotoSrv: FotoService)
	{
		this.fotoSrv = fotoSrv;
	}

	converterFoto(foto: FotoSummary)
	{
		if (foto && foto.dados)
		{
			foto.dados = atob(foto.dados);
		}
	}

	async get(id: string): Promise<FotoSummary>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.fotoSrv.ApiV1FotoByIdGet(id).toPromise().then(resp =>
			{
				if (resp && resp.data)
				{
					self.converterFoto(resp.data);
				}
				processResponse(resp as ApiResponse<FotoSummary>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async getAll(): Promise<FotoSummary[]>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.fotoSrv.ApiV1FotoGet().toPromise().then(resp =>
			{
				if (resp && resp.data)
				{
					resp.data.forEach(foto =>
					{
						self.converterFoto(foto);
					});
				}
				processResponse(resp as ApiResponse<FotoSummary[]>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async post(item: FotoSummary): Promise<string>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.fotoSrv.ApiV1FotoPost(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<string>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async put(item: FotoSummary): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.fotoSrv.ApiV1FotoPut(item).toPromise().then(resp =>
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
			await self.fotoSrv.ApiV1FotoByIdDelete(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}
}

@Injectable()
export class CatalogoFotos extends ApiCatalog<FotoSummary>
{
	constructor(private oauthService: OAuthService, private fotoSrv: FotoService)
	{
		super(oauthService, new FotoApiInterface(fotoSrv), 'foto', 'foto');
	}
}
