import { Injectable } from '@angular/core';
import { CorVeiculoSummary } from '../../api/to_de_taxi/models';
import { CorVeiculoService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, ApiResponse, processResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';

class CorVeiculoApiInterface implements CatalogApiInterface<CorVeiculoSummary>
{
	private corVeiculoSrv: CorVeiculoService;

	constructor(corVeiculoSrv: CorVeiculoService)
	{
		this.corVeiculoSrv = corVeiculoSrv;
	}

	async get(id: string): Promise<CorVeiculoSummary>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.corVeiculoSrv.ApiV1CorVeiculoByIdGet(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<CorVeiculoSummary>, resolve, reject);
			});
		});
	}

	async getAll(): Promise<CorVeiculoSummary[]>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.corVeiculoSrv.ApiV1CorVeiculoGet().toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<CorVeiculoSummary[]>, resolve, reject);
			});
		});
	}

	async post(item: CorVeiculoSummary): Promise<string>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.corVeiculoSrv.ApiV1CorVeiculoPost(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<string>, resolve, reject);
			});
		});
	}

	async put(item: CorVeiculoSummary): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.corVeiculoSrv.ApiV1CorVeiculoPut(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			});
		});
	}

	async delete(id: string): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.corVeiculoSrv.ApiV1CorVeiculoByIdDelete(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			});
		});
	}
}

@Injectable()
export class CatalogoCorVeiculos extends ApiCatalog<CorVeiculoSummary>
{
	constructor(private oauthService: OAuthService, private corVeiculoSrv: CorVeiculoService)
	{
		super(oauthService, new CorVeiculoApiInterface(corVeiculoSrv), 'cor_veiculo', 'cor_veiculo');
	}
}
