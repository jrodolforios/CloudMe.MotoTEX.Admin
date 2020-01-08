import { Injectable } from '@angular/core';
import { VeiculoTaxistaSummary } from '../../api/to_de_taxi/models';
import { VeiculoTaxistaService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, processResponse, ApiResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';

class VeiculoTaxistaApiInterface implements CatalogApiInterface<VeiculoTaxistaSummary>
{
	private veiculoTaxistaSrv: VeiculoTaxistaService;

	constructor(veiculoTaxistaSrv: VeiculoTaxistaService)
	{
		this.veiculoTaxistaSrv = veiculoTaxistaSrv;
	}

	async get(id: string): Promise<VeiculoTaxistaSummary>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.veiculoTaxistaSrv.ApiV1VeiculoTaxistaByIdGet(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<VeiculoTaxistaSummary>, resolve, reject);
			});
		});
	}

	async getAll(): Promise<VeiculoTaxistaSummary[]>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.veiculoTaxistaSrv.ApiV1VeiculoTaxistaGet().toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<VeiculoTaxistaSummary[]>, resolve, reject);
			});
		});
	}

	async post(item: VeiculoTaxistaSummary): Promise<string>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.veiculoTaxistaSrv.ApiV1VeiculoTaxistaPost(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<string>, resolve, reject);
			});
		});
	}

	async put(item: VeiculoTaxistaSummary): Promise<boolean>
	{
		const self = this;

		return new Promise(async (resolve, reject) =>
		{
			await self.veiculoTaxistaSrv.ApiV1VeiculoTaxistaPut(item).toPromise().then(resp =>
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
			await self.veiculoTaxistaSrv.ApiV1VeiculoTaxistaByIdDelete(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			});
		});
	}
}

@Injectable()
export class CatalogoVeiculosTaxistas extends ApiCatalog<VeiculoTaxistaSummary>
{
	constructor(private oauthService: OAuthService, private veiculoTaxistaSrv: VeiculoTaxistaService)
	{
		super(oauthService, new VeiculoTaxistaApiInterface(veiculoTaxistaSrv), 'veiculo_taxista', 'veiculo_taxista');
	}
}
