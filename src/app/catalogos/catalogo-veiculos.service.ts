import { Injectable } from '@angular/core';
import { VeiculoSummary } from '../../api/to_de_taxi/models';
import { VeiculoService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, ApiResponse, processResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';
import { GlobaisService } from '../globais.service';

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

		return new Promise(async (resolve, reject) =>
		{
			await self.veiculoSrv.ApiV1VeiculoByIdGet(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<VeiculoSummary>, resolve, reject);
			});
		});
	}

	async getAll(): Promise<VeiculoSummary[]>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.veiculoSrv.ApiV1VeiculoGet().toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<VeiculoSummary[]>, resolve, reject);
			});
		});
	}

	async post(item: VeiculoSummary): Promise<string>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.veiculoSrv.ApiV1VeiculoPost(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<string>, resolve, reject);
			});
		});
	}

	async put(item: VeiculoSummary): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.veiculoSrv.ApiV1VeiculoPut(item).toPromise().then(resp =>
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
			await self.veiculoSrv.ApiV1VeiculoByIdDelete(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			});
		});
	}
}

@Injectable()
export class CatalogoVeiculos extends ApiCatalog<VeiculoSummary>
{
	constructor(private oauthService: OAuthService, private veiculoSrv: VeiculoService, private globaisSrv: GlobaisService)
	{
		super(oauthService, new VeiculoApiInterface(veiculoSrv), globaisSrv.hubNotificacoes, 'veiculo', 'veiculo');
	}
}
