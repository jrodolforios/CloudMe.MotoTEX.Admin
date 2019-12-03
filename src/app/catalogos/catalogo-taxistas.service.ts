import { Injectable } from '@angular/core';
import { TaxistaSummary, FotoSummary } from '../../api/to_de_taxi/models';
import { TaxistaService, FotoService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, processResponse, ApiResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs';
import { CatalogoFotos } from './catalogo-fotos.service';

class TaxistaApiInterface implements CatalogApiInterface<TaxistaSummary>
{
	private taxistaSrv: TaxistaService;

	constructor(taxistaSrv: TaxistaService) {
		this.taxistaSrv = taxistaSrv;
	}

	async get(id: string): Promise<TaxistaSummary> {
		const self = this;

		return new Promise(async (resolve, reject) => {
			await self.taxistaSrv.ApiV1TaxistaByIdGet(id).toPromise().then(resp => {
				processResponse(resp as ApiResponse<TaxistaSummary>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async getAll(): Promise<TaxistaSummary[]> {
		const self = this;

		return new Promise(async (resolve, reject) => {
			await self.taxistaSrv.ApiV1TaxistaGet().toPromise().then(resp => {
				processResponse(resp as ApiResponse<TaxistaSummary[]>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async post(item: TaxistaSummary): Promise<string> {
		const self = this;

		return new Promise(async (resolve, reject) => {
			await self.taxistaSrv.ApiV1TaxistaPost(item).toPromise().then(resp => {
				processResponse(resp as ApiResponse<string>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async put(item: TaxistaSummary): Promise<boolean> {
		const self = this;

		return new Promise(async (resolve, reject) => {
			await self.taxistaSrv.ApiV1TaxistaPut(item).toPromise().then(resp => {
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	async delete(id: string): Promise<boolean> {
		const self = this;

		return new Promise(async (resolve, reject) => {
			await self.taxistaSrv.ApiV1TaxistaByIdDelete(id).toPromise().then(resp => {
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}
}

@Injectable()
export class CatalogoTaxistas extends ApiCatalog<TaxistaSummary>
{
	constructor(
		private oauthService: OAuthService,
		private taxistaSrv: TaxistaService,
		private fotos: CatalogoFotos) {
		super(oauthService, new TaxistaApiInterface(taxistaSrv), 'taxista', 'taxista');
	}

	async recuperarFoto(taxista: TaxistaSummary) {
		const self = this;

		taxista['carregandoFoto'] = true;

		const foto = await self.fotos.get(taxista.idFoto);
		taxista['foto'] = foto;

		taxista['carregandoFoto'] = false;
	}

	liberarFoto(taxista: TaxistaSummary) {
		const self = this;

		const foto = taxista['foto'] as FotoSummary;

		if (foto) {
			taxista['foto'] = undefined;
			self.fotos.remove([foto]);
		}
	}
}
