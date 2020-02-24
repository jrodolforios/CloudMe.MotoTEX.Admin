import { Injectable } from '@angular/core';
import { TaxistaSummary, FotoSummary } from '../../api/to_de_taxi/models';
import { TaxistaService, FotoService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, processResponse, ApiResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs';
import { CatalogoFotos } from './catalogo-fotos.service';
import { GlobaisService } from '../globais.service';

class TaxistaApiInterface implements CatalogApiInterface<TaxistaSummary>
{
	private taxistaSrv: TaxistaService;

	constructor(taxistaSrv: TaxistaService) {
		this.taxistaSrv = taxistaSrv;
	}

	get(id: string): Promise<TaxistaSummary> {
		const self = this;

		return new Promise((resolve, reject) => {
			self.taxistaSrv.ApiV1TaxistaByIdGet(id).toPromise().then(resp => {
				processResponse(resp as ApiResponse<TaxistaSummary>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	getAll(): Promise<TaxistaSummary[]> {
		const self = this;

		return new Promise((resolve, reject) => {
			self.taxistaSrv.ApiV1TaxistaGet().toPromise().then(resp => {
				processResponse(resp as ApiResponse<TaxistaSummary[]>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	post(item: TaxistaSummary): Promise<string> {
		const self = this;

		return new Promise((resolve, reject) => {
			self.taxistaSrv.ApiV1TaxistaPost(item).toPromise().then(resp => {
				processResponse(resp as ApiResponse<string>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	put(item: TaxistaSummary): Promise<boolean> {
		const self = this;

		return new Promise((resolve, reject) => {
			self.taxistaSrv.ApiV1TaxistaPut(item).toPromise().then(resp => {
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	delete(id: string): Promise<boolean> {
		const self = this;

		return new Promise((resolve, reject) => {
			self.taxistaSrv.ApiV1TaxistaByIdDelete(id).toPromise().then(resp => {
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
		private fotos: CatalogoFotos,
		private globaisSrv: GlobaisService) {
		super(oauthService, new TaxistaApiInterface(taxistaSrv), globaisSrv.hubNotificacoes, 'taxista', 'taxista');
	}

	recuperarFoto(taxista: TaxistaSummary, forcar: boolean = false) {
		const self = this;

		const carregando = taxista['carregandoFoto'] !== undefined ? taxista['carregandoFoto'] : false;
		const temFoto = taxista['foto'] !== undefined && taxista['foto']['dados'] !== undefined;

		if (carregando || (temFoto && !forcar)) return;

		taxista['carregandoFoto'] = true;

		self.fotos.get(taxista.idFoto).then(foto =>
		{
			taxista['foto'] = foto;

			taxista['carregandoFoto'] = false;
		});
	}

	liberarFoto(taxista: TaxistaSummary) {
		const self = this;

		const foto = taxista['foto'] as FotoSummary;

		if (foto)
		{
			taxista['foto'] = undefined;
			self.fotos.remove([foto]);
		}
	}

	protected mergeUpdate(original: TaxistaSummary, updated: TaxistaSummary)
	{
		const enderecoOriginal = original.endereco;
		const enderecoUpdated = updated.endereco;

		const usuarioOriginal = original.usuario;
		const usuarioUpdated = updated.usuario;

		const fotoOriginal = original['foto'];
		const fotoUpdated = updated['foto'];

		super.mergeUpdate(original, updated);

		// mescla endereço
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

		// mescla usuário
		if (usuarioOriginal)
		{
			if (!usuarioUpdated)
			{
				original.usuario = usuarioOriginal;
			}
		}
		else
		{
			original.usuario = usuarioUpdated;
		}

		// mescla foto
		if (fotoOriginal)
		{
			if (!fotoUpdated)
			{
				original['foto'] = fotoOriginal;
			}
		}
		else
		{
			original['foto'] = fotoUpdated;
		}
	}
}
