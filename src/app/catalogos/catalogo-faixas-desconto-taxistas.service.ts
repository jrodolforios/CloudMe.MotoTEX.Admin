import { Injectable } from '@angular/core';
import { FaixaDescontoTaxistaSummary } from '../../api/to_de_taxi/models';
import { FaixaDescontoTaxistaService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, processResponse, ApiResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';
import { GlobaisService } from '../globais.service';

class FaixaDescontoTaxistaApiInterface implements CatalogApiInterface<FaixaDescontoTaxistaSummary>
{
	private faixaDescontoTaxistaSrv: FaixaDescontoTaxistaService;

	constructor(faixaDescontoTaxistaSrv: FaixaDescontoTaxistaService)
	{
		this.faixaDescontoTaxistaSrv = faixaDescontoTaxistaSrv;
	}

	async get(id: string): Promise<FaixaDescontoTaxistaSummary>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.faixaDescontoTaxistaSrv.ApiV1FaixaDescontoTaxistaByIdGet(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<FaixaDescontoTaxistaSummary>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async getAll(): Promise<FaixaDescontoTaxistaSummary[]>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.faixaDescontoTaxistaSrv.ApiV1FaixaDescontoTaxistaGet().toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<FaixaDescontoTaxistaSummary[]>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async post(item: FaixaDescontoTaxistaSummary): Promise<string>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.faixaDescontoTaxistaSrv.ApiV1FaixaDescontoTaxistaPost(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<string>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async put(item: FaixaDescontoTaxistaSummary): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.faixaDescontoTaxistaSrv.ApiV1FaixaDescontoTaxistaPut(item).toPromise().then(resp =>
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
			await self.faixaDescontoTaxistaSrv.ApiV1FaixaDescontoTaxistaByIdDelete(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}
}

@Injectable()
export class CatalogoFaixasDescontoTaxistas extends ApiCatalog<FaixaDescontoTaxistaSummary>
{
	constructor(private oauthService: OAuthService, private faixaDescontoTaxistaSrv: FaixaDescontoTaxistaService, private globaisSrv: GlobaisService)
	{
		super(oauthService, new FaixaDescontoTaxistaApiInterface(faixaDescontoTaxistaSrv), globaisSrv.hubNotificacoes, 'faixa_desconto_taxista', 'faixa_desconto_taxista');
	}
}
