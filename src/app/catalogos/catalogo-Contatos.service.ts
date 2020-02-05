import { Injectable } from '@angular/core';
import {FotoSummary, ContatoSummary } from '../../api/to_de_taxi/models';
import {ContatoService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, processResponse, ApiResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs';
import { CatalogoFotos } from './catalogo-fotos.service';
import { CatalogosService } from './catalogos.service';

class ContatoaApiInterface implements CatalogApiInterface<ContatoSummary>
{
	private contatoSrv: ContatoService;

	constructor(contatoService: ContatoService) {
		this.contatoSrv = contatoService;
	}

	get(id: string): Promise<ContatoSummary> {
		const self = this;

		return new Promise((resolve, reject) => {
			self.contatoSrv.ApiV1ContatoByIdGet(id).toPromise().then(resp => {
				processResponse(resp as ApiResponse<ContatoSummary>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	getAll(): Promise<ContatoSummary[]> {
		const self = this;

		return new Promise((resolve, reject) => {
			self.contatoSrv.ApiV1ContatoGet().toPromise().then(resp => {
				processResponse(resp as ApiResponse<ContatoSummary[]>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	post(item: ContatoSummary): Promise<string> {
		const self = this;

		return new Promise((resolve, reject) => {
			self.contatoSrv.ApiV1ContatoPost(item).toPromise().then(resp => {
				processResponse(resp as ApiResponse<string>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	put(item: ContatoSummary): Promise<boolean> {
		const self = this;

		return new Promise((resolve, reject) => {
			self.contatoSrv.ApiV1ContatoPut(item).toPromise().then(resp => {
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	delete(id: string): Promise<boolean> {
		const self = this;

		return new Promise((resolve, reject) => {
			self.contatoSrv.ApiV1ContatoByIdDelete(id).toPromise().then(resp => {
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}
}

@Injectable()
export class CatalogoContatos extends ApiCatalog<ContatoSummary>
{
	constructor(
		private oauthService: OAuthService,
		private contatoService: ContatoService,
		private fotos: CatalogoFotos) {
		super(oauthService, new ContatoaApiInterface(contatoService), 'contato', 'contato');
	}

	protected mergeUpdate(original: ContatoSummary, updated: ContatoSummary)
	{
		super.mergeUpdate(original, updated);
	}
}
