import { Injectable } from '@angular/core';
import { SolicitacaoCorridaSummary } from '../../api/to_de_taxi/models';
import { SolicitacaoCorridaService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, ApiResponse, processResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';
import { GlobaisService } from '../globais.service';

class SolicitacaoCorridaApiInterface implements CatalogApiInterface<SolicitacaoCorridaSummary>
{
	private SolicitacaoCorridaSrv: SolicitacaoCorridaService;

	constructor(SolicitacaoCorridaSrv: SolicitacaoCorridaService)
	{
		this.SolicitacaoCorridaSrv = SolicitacaoCorridaSrv;
	}

	async get(id: string): Promise<SolicitacaoCorridaSummary>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.SolicitacaoCorridaSrv.ApiV1SolicitacaoCorridaByIdGet(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<SolicitacaoCorridaSummary>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async getAll(): Promise<SolicitacaoCorridaSummary[]>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.SolicitacaoCorridaSrv.ApiV1SolicitacaoCorridaGet().toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<SolicitacaoCorridaSummary[]>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async post(item: SolicitacaoCorridaSummary): Promise<string>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.SolicitacaoCorridaSrv.ApiV1SolicitacaoCorridaPost(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<string>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async put(item: SolicitacaoCorridaSummary): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.SolicitacaoCorridaSrv.ApiV1SolicitacaoCorridaPut(item).toPromise().then(resp =>
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
			await self.SolicitacaoCorridaSrv.ApiV1SolicitacaoCorridaByIdDelete(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}
}

@Injectable()
export class CatalogoSolicitacoesCorrida extends ApiCatalog<SolicitacaoCorridaSummary>
{
	constructor(private oauthService: OAuthService, private SolicitacaoCorridaSrv: SolicitacaoCorridaService, private globaisSrv: GlobaisService)
	{
		super(oauthService, new SolicitacaoCorridaApiInterface(SolicitacaoCorridaSrv), globaisSrv.hubNotificacoes, 'solicitacao_corrida', 'solicitacao_corrida');
	}
}
