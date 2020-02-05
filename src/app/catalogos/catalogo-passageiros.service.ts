import { Injectable } from '@angular/core';
import { PassageiroSummary, FotoSummary } from '../../api/to_de_taxi/models';
import { PassageiroService, FotoService } from '../../api/to_de_taxi/services';
import { ApiCatalog, CatalogApiInterface, processResponse, ApiResponse } from './api-catalog';
import { OAuthService } from 'angular-oauth2-oidc';
import { CatalogoFotos } from './catalogo-fotos.service';

class PassageiroApiInterface implements CatalogApiInterface<PassageiroSummary>
{
	private passageiroSrv: PassageiroService;

	constructor(passageiroSrv: PassageiroService)
	{
		this.passageiroSrv = passageiroSrv;
	}

	get(id: string): Promise<PassageiroSummary>
	{
		const self = this;

		return new Promise((resolve, reject) =>
		{
			self.passageiroSrv.ApiV1PassageiroByIdGet(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<PassageiroSummary>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	getAll(): Promise<PassageiroSummary[]>
	{
		const self = this;

		return new Promise((resolve, reject) =>
		{
			self.passageiroSrv.ApiV1PassageiroGet().toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<PassageiroSummary[]>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	post(item: PassageiroSummary): Promise<string>
	{
		const self = this;

		return new Promise((resolve, reject) =>
		{
			self.passageiroSrv.ApiV1PassageiroPost(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<string>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	put(item: PassageiroSummary): Promise<boolean>
	{
		const self = this;

		return new Promise((resolve, reject) =>
		{
			self.passageiroSrv.ApiV1PassageiroPut(item).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}

	delete(id: string): Promise<boolean>
	{
		const self = this;

		return new Promise((resolve, reject) =>
		{
			self.passageiroSrv.ApiV1PassageiroByIdDelete(id).toPromise().then(resp =>
			{
				processResponse(resp as ApiResponse<boolean>, resolve, reject);
			}).catch(reason => reject(reason));
		});
	}
}

@Injectable()
export class CatalogoPassageiros extends ApiCatalog<PassageiroSummary>
{
	constructor(private oauthService: OAuthService, private passageiroSrv: PassageiroService,
		private fotos: CatalogoFotos, private fotoService: FotoService)
	{
		super(oauthService, new PassageiroApiInterface(passageiroSrv), 'passageiro', 'passageiro');
	}

	recuperarFoto(passageiro: PassageiroSummary, forcar: boolean = false)
	{
		const self = this;

		const carregando = passageiro['carregandoFoto'] !== undefined ? passageiro['carregandoFoto'] : false;
		const temFoto = passageiro['foto'] !== undefined && passageiro['foto']['dados'] !== undefined;

		if (carregando || (temFoto && !forcar)) return;

		passageiro['carregandoFoto'] = true;

		self.fotos.get(passageiro.idFoto).then(foto =>
			{
				passageiro['foto'] = foto;

				if (foto)
				{
					foto.dados = 'data:image/jpeg;base64,' + btoa(foto.dados); // TODO: remover isso no futuro
				}

				passageiro['carregandoFoto'] = false;
			});

	}

	liberarFoto(passageiro: PassageiroSummary) {
		const self = this;

		const foto = passageiro['foto'] as FotoSummary;

		if (foto)
		{
			passageiro['foto'] = undefined;
			self.fotos.remove([foto]);
		}
	}

	protected mergeUpdate(original: PassageiroSummary, updated: PassageiroSummary)
	{
		const enderecoOriginal = original.endereco;
		const enderecoUpdated = updated.endereco;

		const usuarioOriginal = original.usuario;
		const usuarioUpdated = updated.usuario;

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
	}
}
