/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableFaixaAtivacaoSummary } from '../models/response-ienumerable-faixa-ativacao-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { FaixaAtivacaoSummary } from '../models/faixa-ativacao-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseFaixaAtivacaoSummary } from '../models/response-faixa-ativacao-summary';
@Injectable({
  providedIn: 'root',
})
class FaixaAtivacaoService extends __BaseService {
  static readonly ApiV1FaixaAtivacaoGetPath = '/api/v1/FaixaAtivacao';
  static readonly ApiV1FaixaAtivacaoPutPath = '/api/v1/FaixaAtivacao';
  static readonly ApiV1FaixaAtivacaoPostPath = '/api/v1/FaixaAtivacao';
  static readonly ApiV1FaixaAtivacaoByRadiusGetPath = '/api/v1/FaixaAtivacao/by_radius';
  static readonly ApiV1FaixaAtivacaoByIdGetPath = '/api/v1/FaixaAtivacao/{id}';
  static readonly ApiV1FaixaAtivacaoByIdDeletePath = '/api/v1/FaixaAtivacao/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1FaixaAtivacaoGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableFaixaAtivacaoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FaixaAtivacao`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableFaixaAtivacaoSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1FaixaAtivacaoGet(): __Observable<ResponseIEnumerableFaixaAtivacaoSummary> {
    return this.ApiV1FaixaAtivacaoGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableFaixaAtivacaoSummary)
    );
  }

  /**
   * @param FaixaAtivacaoSummary Modified FaixaAtivacao list's properties summary
   * @return Success
   */
  ApiV1FaixaAtivacaoPutResponse(FaixaAtivacaoSummary?: FaixaAtivacaoSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FaixaAtivacaoSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/FaixaAtivacao`,
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
   * @param FaixaAtivacaoSummary Modified FaixaAtivacao list's properties summary
   * @return Success
   */
  ApiV1FaixaAtivacaoPut(FaixaAtivacaoSummary?: FaixaAtivacaoSummary): __Observable<ResponseBoolean> {
    return this.ApiV1FaixaAtivacaoPutResponse(FaixaAtivacaoSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param FaixaAtivacaoSummary FaixaAtivacao's summary
   * @return Success
   */
  ApiV1FaixaAtivacaoPostResponse(FaixaAtivacaoSummary?: FaixaAtivacaoSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FaixaAtivacaoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/FaixaAtivacao`,
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
   * @param FaixaAtivacaoSummary FaixaAtivacao's summary
   * @return Success
   */
  ApiV1FaixaAtivacaoPost(FaixaAtivacaoSummary?: FaixaAtivacaoSummary): __Observable<ResponseGuid> {
    return this.ApiV1FaixaAtivacaoPostResponse(FaixaAtivacaoSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @return Success
   */
  ApiV1FaixaAtivacaoByRadiusGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableFaixaAtivacaoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FaixaAtivacao/by_radius`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableFaixaAtivacaoSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1FaixaAtivacaoByRadiusGet(): __Observable<ResponseIEnumerableFaixaAtivacaoSummary> {
    return this.ApiV1FaixaAtivacaoByRadiusGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableFaixaAtivacaoSummary)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FaixaAtivacaoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseFaixaAtivacaoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FaixaAtivacao/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseFaixaAtivacaoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FaixaAtivacaoByIdGet(id: string): __Observable<ResponseFaixaAtivacaoSummary> {
    return this.ApiV1FaixaAtivacaoByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseFaixaAtivacaoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1FaixaAtivacaoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/FaixaAtivacao/${id}`,
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
  ApiV1FaixaAtivacaoByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1FaixaAtivacaoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module FaixaAtivacaoService {
}

export { FaixaAtivacaoService }
