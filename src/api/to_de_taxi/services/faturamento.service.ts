/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableFaturamentoSummary } from '../models/response-ienumerable-faturamento-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { FaturamentoSummary } from '../models/faturamento-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseFaturamentoSummary } from '../models/response-faturamento-summary';
@Injectable({
  providedIn: 'root',
})
class FaturamentoService extends __BaseService {
  static readonly ApiV1FaturamentoGetPath = '/api/v1/Faturamento';
  static readonly ApiV1FaturamentoPutPath = '/api/v1/Faturamento';
  static readonly ApiV1FaturamentoPostPath = '/api/v1/Faturamento';
  static readonly ApiV1FaturamentoByIdGetPath = '/api/v1/Faturamento/{id}';
  static readonly ApiV1FaturamentoByIdDeletePath = '/api/v1/Faturamento/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1FaturamentoGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableFaturamentoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Faturamento`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableFaturamentoSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1FaturamentoGet(): __Observable<ResponseIEnumerableFaturamentoSummary> {
    return this.ApiV1FaturamentoGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableFaturamentoSummary)
    );
  }

  /**
   * @param FaturamentoSummary Modified Faturamento list's properties summary
   * @return Success
   */
  ApiV1FaturamentoPutResponse(FaturamentoSummary?: FaturamentoSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FaturamentoSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Faturamento`,
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
   * @param FaturamentoSummary Modified Faturamento list's properties summary
   * @return Success
   */
  ApiV1FaturamentoPut(FaturamentoSummary?: FaturamentoSummary): __Observable<ResponseBoolean> {
    return this.ApiV1FaturamentoPutResponse(FaturamentoSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param FaturamentoSummary Faturamento's summary
   * @return Success
   */
  ApiV1FaturamentoPostResponse(FaturamentoSummary?: FaturamentoSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FaturamentoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Faturamento`,
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
   * @param FaturamentoSummary Faturamento's summary
   * @return Success
   */
  ApiV1FaturamentoPost(FaturamentoSummary?: FaturamentoSummary): __Observable<ResponseGuid> {
    return this.ApiV1FaturamentoPostResponse(FaturamentoSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FaturamentoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseFaturamentoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Faturamento/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseFaturamentoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FaturamentoByIdGet(id: string): __Observable<ResponseFaturamentoSummary> {
    return this.ApiV1FaturamentoByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseFaturamentoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1FaturamentoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Faturamento/${id}`,
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
  ApiV1FaturamentoByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1FaturamentoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module FaturamentoService {
}

export { FaturamentoService }
