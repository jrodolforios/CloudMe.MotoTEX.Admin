/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableDetalhesMensagem } from '../models/response-ienumerable-detalhes-mensagem';
import { Pagination } from '../models/pagination';
import { ResponseInt32 } from '../models/response-int-32';
import { ParametrosEnvio } from '../models/parametros-envio';
import { ResponseMensagemDestinatarioSummary } from '../models/response-mensagem-destinatario-summary';
import { ResponseBoolean } from '../models/response-boolean';
@Injectable({
  providedIn: 'root',
})
class MensagemService extends __BaseService {
  static readonly ApiV1MensagemObterEnviadasPostPath = '/api/v1/Mensagem/obter_enviadas';
  static readonly ApiV1MensagemObterRecebidasPostPath = '/api/v1/Mensagem/obter_recebidas';
  static readonly ApiV1MensagemEnviarPostPath = '/api/v1/Mensagem/enviar';
  static readonly ApiV1MensagemReciboGetPath = '/api/v1/Mensagem/recibo';
  static readonly ApiV1MensagemAlterarStatusPostPath = '/api/v1/Mensagem/alterar_status';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `MensagemService.ApiV1MensagemObterEnviadasPostParams` containing the following parameters:
   *
   * - `pagination`:
   *
   * - `inicio`:
   *
   * - `id_usuario`:
   *
   * - `fim`:
   *
   * @return Success
   */
  ApiV1MensagemObterEnviadasPostResponse(params: MensagemService.ApiV1MensagemObterEnviadasPostParams): __Observable<__StrictHttpResponse<ResponseIEnumerableDetalhesMensagem>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.pagination;
    if (params.inicio != null) __params = __params.set('inicio', params.inicio.toString());
    if (params.idUsuario != null) __params = __params.set('id_usuario', params.idUsuario.toString());
    if (params.fim != null) __params = __params.set('fim', params.fim.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Mensagem/obter_enviadas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableDetalhesMensagem>;
      })
    );
  }
  /**
   * @param params The `MensagemService.ApiV1MensagemObterEnviadasPostParams` containing the following parameters:
   *
   * - `pagination`:
   *
   * - `inicio`:
   *
   * - `id_usuario`:
   *
   * - `fim`:
   *
   * @return Success
   */
  ApiV1MensagemObterEnviadasPost(params: MensagemService.ApiV1MensagemObterEnviadasPostParams): __Observable<ResponseIEnumerableDetalhesMensagem> {
    return this.ApiV1MensagemObterEnviadasPostResponse(params).pipe(
      __map(_r => _r.body as ResponseIEnumerableDetalhesMensagem)
    );
  }

  /**
   * @param params The `MensagemService.ApiV1MensagemObterRecebidasPostParams` containing the following parameters:
   *
   * - `pagination`:
   *
   * - `inicio`:
   *
   * - `id_usuario`:
   *
   * - `fim`:
   *
   * @return Success
   */
  ApiV1MensagemObterRecebidasPostResponse(params: MensagemService.ApiV1MensagemObterRecebidasPostParams): __Observable<__StrictHttpResponse<ResponseIEnumerableDetalhesMensagem>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.pagination;
    if (params.inicio != null) __params = __params.set('inicio', params.inicio.toString());
    if (params.idUsuario != null) __params = __params.set('id_usuario', params.idUsuario.toString());
    if (params.fim != null) __params = __params.set('fim', params.fim.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Mensagem/obter_recebidas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableDetalhesMensagem>;
      })
    );
  }
  /**
   * @param params The `MensagemService.ApiV1MensagemObterRecebidasPostParams` containing the following parameters:
   *
   * - `pagination`:
   *
   * - `inicio`:
   *
   * - `id_usuario`:
   *
   * - `fim`:
   *
   * @return Success
   */
  ApiV1MensagemObterRecebidasPost(params: MensagemService.ApiV1MensagemObterRecebidasPostParams): __Observable<ResponseIEnumerableDetalhesMensagem> {
    return this.ApiV1MensagemObterRecebidasPostResponse(params).pipe(
      __map(_r => _r.body as ResponseIEnumerableDetalhesMensagem)
    );
  }

  /**
   * @param parametrosEnvio undefined
   * @return Success
   */
  ApiV1MensagemEnviarPostResponse(parametrosEnvio?: ParametrosEnvio): __Observable<__StrictHttpResponse<ResponseInt32>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = parametrosEnvio;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Mensagem/enviar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseInt32>;
      })
    );
  }
  /**
   * @param parametrosEnvio undefined
   * @return Success
   */
  ApiV1MensagemEnviarPost(parametrosEnvio?: ParametrosEnvio): __Observable<ResponseInt32> {
    return this.ApiV1MensagemEnviarPostResponse(parametrosEnvio).pipe(
      __map(_r => _r.body as ResponseInt32)
    );
  }

  /**
   * @param params The `MensagemService.ApiV1MensagemReciboGetParams` containing the following parameters:
   *
   * - `id_usuario`:
   *
   * - `id_mensagem`:
   *
   * @return Success
   */
  ApiV1MensagemReciboGetResponse(params: MensagemService.ApiV1MensagemReciboGetParams): __Observable<__StrictHttpResponse<ResponseMensagemDestinatarioSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idUsuario != null) __params = __params.set('id_usuario', params.idUsuario.toString());
    if (params.idMensagem != null) __params = __params.set('id_mensagem', params.idMensagem.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Mensagem/recibo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseMensagemDestinatarioSummary>;
      })
    );
  }
  /**
   * @param params The `MensagemService.ApiV1MensagemReciboGetParams` containing the following parameters:
   *
   * - `id_usuario`:
   *
   * - `id_mensagem`:
   *
   * @return Success
   */
  ApiV1MensagemReciboGet(params: MensagemService.ApiV1MensagemReciboGetParams): __Observable<ResponseMensagemDestinatarioSummary> {
    return this.ApiV1MensagemReciboGetResponse(params).pipe(
      __map(_r => _r.body as ResponseMensagemDestinatarioSummary)
    );
  }

  /**
   * @param params The `MensagemService.ApiV1MensagemAlterarStatusPostParams` containing the following parameters:
   *
   * - `status`:
   *
   * - `id_usuario`:
   *
   * - `id_mensagem`:
   *
   * @return Success
   */
  ApiV1MensagemAlterarStatusPostResponse(params: MensagemService.ApiV1MensagemAlterarStatusPostParams): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.status != null) __params = __params.set('status', params.status.toString());
    if (params.idUsuario != null) __params = __params.set('id_usuario', params.idUsuario.toString());
    if (params.idMensagem != null) __params = __params.set('id_mensagem', params.idMensagem.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Mensagem/alterar_status`,
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
   * @param params The `MensagemService.ApiV1MensagemAlterarStatusPostParams` containing the following parameters:
   *
   * - `status`:
   *
   * - `id_usuario`:
   *
   * - `id_mensagem`:
   *
   * @return Success
   */
  ApiV1MensagemAlterarStatusPost(params: MensagemService.ApiV1MensagemAlterarStatusPostParams): __Observable<ResponseBoolean> {
    return this.ApiV1MensagemAlterarStatusPostResponse(params).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module MensagemService {

  /**
   * Parameters for ApiV1MensagemObterEnviadasPost
   */
  export interface ApiV1MensagemObterEnviadasPostParams {
    pagination?: Pagination;
    inicio?: string;
    idUsuario?: string;
    fim?: string;
  }

  /**
   * Parameters for ApiV1MensagemObterRecebidasPost
   */
  export interface ApiV1MensagemObterRecebidasPostParams {
    pagination?: Pagination;
    inicio?: string;
    idUsuario?: string;
    fim?: string;
  }

  /**
   * Parameters for ApiV1MensagemReciboGet
   */
  export interface ApiV1MensagemReciboGetParams {
    idUsuario?: string;
    idMensagem?: string;
  }

  /**
   * Parameters for ApiV1MensagemAlterarStatusPost
   */
  export interface ApiV1MensagemAlterarStatusPostParams {
    status?: 0 | 1 | 2 | 3 | 4;
    idUsuario?: string;
    idMensagem?: string;
  }
}

export { MensagemService }
