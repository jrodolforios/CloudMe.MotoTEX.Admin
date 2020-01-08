/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableFaixaDescontoSummary } from '../models/response-ienumerable-faixa-desconto-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { FaixaDescontoSummary } from '../models/faixa-desconto-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseFaixaDescontoSummary } from '../models/response-faixa-desconto-summary';
@Injectable({
  providedIn: 'root',
})
class FaixaDescontoService extends __BaseService {
  static readonly ApiV1FaixaDescontoGetPath = '/api/v1/FaixaDesconto';
  static readonly ApiV1FaixaDescontoPutPath = '/api/v1/FaixaDesconto';
  static readonly ApiV1FaixaDescontoPostPath = '/api/v1/FaixaDesconto';
  static readonly ApiV1FaixaDescontoByIdGetPath = '/api/v1/FaixaDesconto/{id}';
  static readonly ApiV1FaixaDescontoByIdDeletePath = '/api/v1/FaixaDesconto/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1FaixaDescontoGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableFaixaDescontoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FaixaDesconto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableFaixaDescontoSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1FaixaDescontoGet(): __Observable<ResponseIEnumerableFaixaDescontoSummary> {
    return this.ApiV1FaixaDescontoGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableFaixaDescontoSummary)
    );
  }

  /**
   * @param FaixaDescontoSummary Modified FaixaDesconto list's properties summary
   * @return Success
   */
  ApiV1FaixaDescontoPutResponse(FaixaDescontoSummary?: FaixaDescontoSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FaixaDescontoSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/FaixaDesconto`,
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
   * @param FaixaDescontoSummary Modified FaixaDesconto list's properties summary
   * @return Success
   */
  ApiV1FaixaDescontoPut(FaixaDescontoSummary?: FaixaDescontoSummary): __Observable<ResponseBoolean> {
    return this.ApiV1FaixaDescontoPutResponse(FaixaDescontoSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param FaixaDescontoSummary FaixaDesconto's summary
   * @return Success
   */
  ApiV1FaixaDescontoPostResponse(FaixaDescontoSummary?: FaixaDescontoSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FaixaDescontoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/FaixaDesconto`,
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
   * @param FaixaDescontoSummary FaixaDesconto's summary
   * @return Success
   */
  ApiV1FaixaDescontoPost(FaixaDescontoSummary?: FaixaDescontoSummary): __Observable<ResponseGuid> {
    return this.ApiV1FaixaDescontoPostResponse(FaixaDescontoSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FaixaDescontoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseFaixaDescontoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FaixaDesconto/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseFaixaDescontoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FaixaDescontoByIdGet(id: string): __Observable<ResponseFaixaDescontoSummary> {
    return this.ApiV1FaixaDescontoByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseFaixaDescontoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1FaixaDescontoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/FaixaDesconto/${id}`,
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
  ApiV1FaixaDescontoByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1FaixaDescontoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module FaixaDescontoService {
}

export { FaixaDescontoService }
