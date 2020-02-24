import { Injectable } from '@angular/core';
import { LocalizacaoSummary } from '../../api/to_de_taxi/models';
import { LocalizacaoService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, ApiResponse, processResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';
import { GlobaisService } from '../globais.service';

class LocalizacaoApiInterface implements CatalogApiInterface<LocalizacaoSummary>
{
	private tarifaSrv: LocalizacaoService;

	constructor(tarifaSrv: LocalizacaoService)
	{
		this.tarifaSrv = tarifaSrv;
	}

	async get(id: string): Promise<LocalizacaoSummary>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.tarifaSrv.ApiV1LocalizacaoByIdGet(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<LocalizacaoSummary>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async getAll(): Promise<LocalizacaoSummary[]>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.tarifaSrv.ApiV1LocalizacaoGet().toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<LocalizacaoSummary[]>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async post(item: LocalizacaoSummary): Promise<string>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.tarifaSrv.ApiV1LocalizacaoPost(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<string>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async put(item: LocalizacaoSummary): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.tarifaSrv.ApiV1LocalizacaoPut(item).toPromise().then(resp =>
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
			await self.tarifaSrv.ApiV1LocalizacaoByIdDelete(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}
}

@Injectable()
export class CatalogoLocalizacoes extends ApiCatalog<LocalizacaoSummary>
{
	constructor(
		private oauthService: OAuthService,
		private tarifaSrv: LocalizacaoService,
		private globaisSrv: GlobaisService)
	{
		super(oauthService, new LocalizacaoApiInterface(tarifaSrv), globaisSrv.hubNotificacoes, 'localizacao', 'localizacao');
	}
}
