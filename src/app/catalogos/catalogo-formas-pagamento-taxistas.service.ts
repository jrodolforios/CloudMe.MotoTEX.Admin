import { Injectable } from '@angular/core';
import { FormaPagamentoTaxistaSummary } from '../../api/to_de_taxi/models';
import { FormaPagamentoTaxistaService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, processResponse, ApiResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';

class FormaPagamentoTaxistaApiInterface implements CatalogApiInterface<FormaPagamentoTaxistaSummary>
{
	private formaPagamentoTaxistaSrv: FormaPagamentoTaxistaService;

	constructor(formaPagamentoTaxistaSrv: FormaPagamentoTaxistaService)
	{
		this.formaPagamentoTaxistaSrv = formaPagamentoTaxistaSrv;
	}

	async get(id: string): Promise<FormaPagamentoTaxistaSummary>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.formaPagamentoTaxistaSrv.ApiV1FormaPagamentoTaxistaByIdGet(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<FormaPagamentoTaxistaSummary>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async getAll(): Promise<FormaPagamentoTaxistaSummary[]>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.formaPagamentoTaxistaSrv.ApiV1FormaPagamentoTaxistaGet().toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<FormaPagamentoTaxistaSummary[]>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async post(item: FormaPagamentoTaxistaSummary): Promise<string>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.formaPagamentoTaxistaSrv.ApiV1FormaPagamentoTaxistaPost(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<string>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async put(item: FormaPagamentoTaxistaSummary): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.formaPagamentoTaxistaSrv.ApiV1FormaPagamentoTaxistaPut(item).toPromise().then(resp =>
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
			await self.formaPagamentoTaxistaSrv.ApiV1FormaPagamentoTaxistaByIdDelete(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}
}

@Injectable()
export class CatalogoFormasPagamentoTaxistas extends ApiCatalog<FormaPagamentoTaxistaSummary>
{
	constructor(private oauthService: OAuthService, private formaPagamentoTaxistaSrv: FormaPagamentoTaxistaService)
	{
		super(oauthService, new FormaPagamentoTaxistaApiInterface(formaPagamentoTaxistaSrv), 'forma_pagamento_taxista', 'forma_pagamento_taxista');
	}
}
