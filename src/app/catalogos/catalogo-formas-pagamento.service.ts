import { Injectable } from '@angular/core';
import { FormaPagamentoSummary } from '../../api/to_de_taxi/models';
import { FormaPagamentoService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, processResponse, ApiResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';

class FormaPagamentoApiInterface implements CatalogApiInterface<FormaPagamentoSummary>
{
	private formaPagamentoSrv: FormaPagamentoService;

	constructor(formaPagamentoSrv: FormaPagamentoService)
	{
		this.formaPagamentoSrv = formaPagamentoSrv;
	}

	async get(id: string): Promise<FormaPagamentoSummary>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.formaPagamentoSrv.ApiV1FormaPagamentoByIdGet(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<FormaPagamentoSummary>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async getAll(): Promise<FormaPagamentoSummary[]>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.formaPagamentoSrv.ApiV1FormaPagamentoGet().toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<FormaPagamentoSummary[]>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async post(item: FormaPagamentoSummary): Promise<string>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.formaPagamentoSrv.ApiV1FormaPagamentoPost(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<string>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async put(item: FormaPagamentoSummary): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.formaPagamentoSrv.ApiV1FormaPagamentoPut(item).toPromise().then(resp =>
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
			await self.formaPagamentoSrv.ApiV1FormaPagamentoByIdDelete(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}
}

@Injectable()
export class CatalogoFormasPagamento extends ApiCatalog<FormaPagamentoSummary>
{
	constructor(private oauthService: OAuthService, private formaPagamentoSrv: FormaPagamentoService)
	{
		super(oauthService, new FormaPagamentoApiInterface(formaPagamentoSrv), 'forma_pagamento', 'forma_pagamento');
	}
}
