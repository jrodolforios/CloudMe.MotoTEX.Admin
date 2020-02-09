/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableSolicitacaoCorridaSummary } from '../models/response-ienumerable-solicitacao-corrida-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { SolicitacaoCorridaSummary } from '../models/solicitacao-corrida-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseSolicitacaoCorridaSummary } from '../models/response-solicitacao-corrida-summary';
import { ResponseIListSolicitacaoCorridaSummary } from '../models/response-ilist-solicitacao-corrida-summary';
@Injectable({
  providedIn: 'root',
})
class SolicitacaoCorridaService extends __BaseService {
  static readonly ApiV1SolicitacaoCorridaGetPath = '/api/v1/SolicitacaoCorrida';
  static readonly ApiV1SolicitacaoCorridaPutPath = '/api/v1/SolicitacaoCorrida';
  static readonly ApiV1SolicitacaoCorridaPostPath = '/api/v1/SolicitacaoCorrida';
  static readonly ApiV1SolicitacaoCorridaByIdGetPath = '/api/v1/SolicitacaoCorrida/{id}';
  static readonly ApiV1SolicitacaoCorridaByIdDeletePath = '/api/v1/SolicitacaoCorrida/{id}';
  static readonly ApiV1SolicitacaoCorridaAcaoTaxistaByIdPostPath = '/api/v1/SolicitacaoCorrida/acao_taxista/{id}';
  static readonly ApiV1SolicitacaoCorridaRecuperarSolicitacoesEmEsperaPostPath = '/api/v1/SolicitacaoCorrida/recuperar_solicitacoes_em_espera';
  static readonly ApiV1SolicitacaoCorridaRecuperarSolicitacoesAtivasPostPath = '/api/v1/SolicitacaoCorrida/recuperar_solicitacoes_ativas';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1SolicitacaoCorridaGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableSolicitacaoCorridaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/SolicitacaoCorrida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableSolicitacaoCorridaSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1SolicitacaoCorridaGet(): __Observable<ResponseIEnumerableSolicitacaoCorridaSummary> {
    return this.ApiV1SolicitacaoCorridaGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableSolicitacaoCorridaSummary)
    );
  }

  /**
   * @param SolicitacaoCorridaSummary Modified SolicitacaoCorrida list's properties summary
   * @return Success
   */
  ApiV1SolicitacaoCorridaPutResponse(SolicitacaoCorridaSummary?: SolicitacaoCorridaSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = SolicitacaoCorridaSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/SolicitacaoCorrida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseBoolean>;
      })
    );
  }
  /**
   * @param SolicitacaoCorridaSummary Modified SolicitacaoCorrida list's properties summary
   * @return Success
   */
  ApiV1SolicitacaoCorridaPut(SolicitacaoCorridaSummary?: SolicitacaoCorridaSummary): __Observable<ResponseBoolean> {
    return this.ApiV1SolicitacaoCorridaPutResponse(SolicitacaoCorridaSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param SolicitacaoCorridaSummary SolicitacaoCorrida's summary
   * @return Success
   */
  ApiV1SolicitacaoCorridaPostResponse(SolicitacaoCorridaSummary?: SolicitacaoCorridaSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = SolicitacaoCorridaSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/SolicitacaoCorrida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseGuid>;
      })
    );
  }
  /**
   * @param SolicitacaoCorridaSummary SolicitacaoCorrida's summary
   * @return Success
   */
  ApiV1SolicitacaoCorridaPost(SolicitacaoCorridaSummary?: SolicitacaoCorridaSummary): __Observable<ResponseGuid> {
    return this.ApiV1SolicitacaoCorridaPostResponse(SolicitacaoCorridaSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1SolicitacaoCorridaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseSolicitacaoCorridaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/SolicitacaoCorrida/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseSolicitacaoCorridaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1SolicitacaoCorridaByIdGet(id: string): __Observable<ResponseSolicitacaoCorridaSummary> {
    return this.ApiV1SolicitacaoCorridaByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseSolicitacaoCorridaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1SolicitacaoCorridaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/SolicitacaoCorrida/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseBoolean>;
      })
    );
  }
  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1SolicitacaoCorridaByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1SolicitacaoCorridaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param params The `SolicitacaoCorridaService.ApiV1SolicitacaoCorridaAcaoTaxistaByIdPostParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `id_taxista`: Id do taxista
   *
   * - `id_solicitacao`: Id da solicitação
   *
   * - `acao`: Ação tomada pelo taxista na solicitação
   *
   * @return Success
   */
  ApiV1SolicitacaoCorridaAcaoTaxistaByIdPostResponse(params: SolicitacaoCorridaService.ApiV1SolicitacaoCorridaAcaoTaxistaByIdPostParams): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.idTaxista != null) __params = __params.set('id_taxista', params.idTaxista.toString());
    if (params.idSolicitacao != null) __params = __params.set('id_solicitacao', params.idSolicitacao.toString());
    if (params.acao != null) __params = __params.set('acao', params.acao.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/SolicitacaoCorrida/acao_taxista/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseBoolean>;
      })
    );
  }
  /**
   * @param params The `SolicitacaoCorridaService.ApiV1SolicitacaoCorridaAcaoTaxistaByIdPostParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `id_taxista`: Id do taxista
   *
   * - `id_solicitacao`: Id da solicitação
   *
   * - `acao`: Ação tomada pelo taxista na solicitação
   *
   * @return Success
   */
  ApiV1SolicitacaoCorridaAcaoTaxistaByIdPost(params: SolicitacaoCorridaService.ApiV1SolicitacaoCorridaAcaoTaxistaByIdPostParams): __Observable<ResponseBoolean> {
    return this.ApiV1SolicitacaoCorridaAcaoTaxistaByIdPostResponse(params).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param IdTaxista undefined
   * @return Success
   */
  ApiV1SolicitacaoCorridaRecuperarSolicitacoesEmEsperaPostResponse(IdTaxista?: string): __Observable<__StrictHttpResponse<ResponseIListSolicitacaoCorridaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdTaxista != null) __params = __params.set('IdTaxista', IdTaxista.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/SolicitacaoCorrida/recuperar_solicitacoes_em_espera`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIListSolicitacaoCorridaSummary>;
      })
    );
  }
  /**
   * @param IdTaxista undefined
   * @return Success
   */
  ApiV1SolicitacaoCorridaRecuperarSolicitacoesEmEsperaPost(IdTaxista?: string): __Observable<ResponseIListSolicitacaoCorridaSummary> {
    return this.ApiV1SolicitacaoCorridaRecuperarSolicitacoesEmEsperaPostResponse(IdTaxista).pipe(
      __map(_r => _r.body as ResponseIListSolicitacaoCorridaSummary)
    );
  }

  /**
   * @return Success
   */
  ApiV1SolicitacaoCorridaRecuperarSolicitacoesAtivasPostResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableSolicitacaoCorridaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/SolicitacaoCorrida/recuperar_solicitacoes_ativas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableSolicitacaoCorridaSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1SolicitacaoCorridaRecuperarSolicitacoesAtivasPost(): __Observable<ResponseIEnumerableSolicitacaoCorridaSummary> {
    return this.ApiV1SolicitacaoCorridaRecuperarSolicitacoesAtivasPostResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableSolicitacaoCorridaSummary)
    );
  }
}

module SolicitacaoCorridaService {

  /**
   * Parameters for ApiV1SolicitacaoCorridaAcaoTaxistaByIdPost
   */
  export interface ApiV1SolicitacaoCorridaAcaoTaxistaByIdPostParams {
    id: string;

    /**
     * Id do taxista
     */
    idTaxista?: string;

    /**
     * Id da solicitação
     */
    idSolicitacao?: string;

    /**
     * Ação tomada pelo taxista na solicitação
     */
    acao?: 0 | 1 | 2 | 3;
  }
}

export { SolicitacaoCorridaService }
