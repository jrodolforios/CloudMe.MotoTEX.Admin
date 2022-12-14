import { Injectable } from '@angular/core';
import { PontoTaxiSummary } from '../../api/to_de_taxi/models';
import { PontoTaxiService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, processResponse, ApiResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';
import { GlobaisService } from '../globais.service';

class PontoTaxiApiInterface implements CatalogApiInterface<PontoTaxiSummary>
{
	private pontoTaxiSrv: PontoTaxiService;

	constructor(pontoTaxiSrv: PontoTaxiService)
	{
		this.pontoTaxiSrv = pontoTaxiSrv;
	}

	async get(id: string): Promise<PontoTaxiSummary>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.pontoTaxiSrv.ApiV1PontoTaxiByIdGet(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<PontoTaxiSummary>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async getAll(): Promise<PontoTaxiSummary[]>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.pontoTaxiSrv.ApiV1PontoTaxiGet().toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<PontoTaxiSummary[]>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async post(item: PontoTaxiSummary): Promise<string>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.pontoTaxiSrv.ApiV1PontoTaxiPost(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<string>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async put(item: PontoTaxiSummary): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.pontoTaxiSrv.ApiV1PontoTaxiPut(item).toPromise().then(resp =>
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
			await self.pontoTaxiSrv.ApiV1PontoTaxiByIdDelete(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}
}

@Injectable()
export class CatalogoPontosTaxi extends ApiCatalog<PontoTaxiSummary>
{
	constructor(private oauthService: OAuthService, private pontoTaxiSrv: PontoTaxiService, private globaisSrv: GlobaisService)
	{
		super(oauthService, new PontoTaxiApiInterface(pontoTaxiSrv), globaisSrv.hubNotificacoes, 'ponto_taxi', 'ponto_taxi');
	}

	protected mergeUpdate(original: PontoTaxiSummary, updated: PontoTaxiSummary)
	{
		const enderecoOriginal = original.endereco;
		const enderecoUpdated = updated.endereco;

		super.mergeUpdate(original, updated);

		// mescla endere??o
		if (enderecoOriginal)
		{
			if (!enderecoUpdated)
			{
				original.endereco = enderecoOriginal;
			}
		}
		else
		{
			original.endereco = enderecoUpdated;
		}
	}

}
