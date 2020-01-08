import { Injectable } from '@angular/core';
import { FaixaDescontoSummary } from '../../api/to_de_taxi/models';
import { FaixaDescontoService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, ApiResponse, processResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';

class FaixaDescontoApiInterface implements CatalogApiInterface<FaixaDescontoSummary>
{
	private faixaDescontoSrv: FaixaDescontoService;

	constructor(faixaDescontoSrv: FaixaDescontoService)
	{
		this.faixaDescontoSrv = faixaDescontoSrv;
	}

	async get(id: string): Promise<FaixaDescontoSummary>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.faixaDescontoSrv.ApiV1FaixaDescontoByIdGet(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<FaixaDescontoSummary>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async getAll(): Promise<FaixaDescontoSummary[]>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.faixaDescontoSrv.ApiV1FaixaDescontoGet().toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<FaixaDescontoSummary[]>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async post(item: FaixaDescontoSummary): Promise<string>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.faixaDescontoSrv.ApiV1FaixaDescontoPost(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<string>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async put(item: FaixaDescontoSummary): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.faixaDescontoSrv.ApiV1FaixaDescontoPut(item).toPromise().then(resp =>
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
			await self.faixaDescontoSrv.ApiV1FaixaDescontoByIdDelete(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}
}

@Injectable()
export class CatalogoFaixasDesconto extends ApiCatalog<FaixaDescontoSummary>
{
	constructor(private oauthService: OAuthService, private faixaDescontoSrv: FaixaDescontoService)
	{
		super(oauthService, new FaixaDescontoApiInterface(faixaDescontoSrv), 'faixa_desconto', 'faixa_desconto');
	}
}
