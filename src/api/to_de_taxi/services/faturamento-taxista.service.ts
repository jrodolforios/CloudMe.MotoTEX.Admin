/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableFaturamentoTaxistaSummary } from '../models/response-ienumerable-faturamento-taxista-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { FaturamentoTaxistaSummary } from '../models/faturamento-taxista-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseFaturamentoTaxistaSummary } from '../models/response-faturamento-taxista-summary';
@Injectable({
  providedIn: 'root',
})
class FaturamentoTaxistaService extends __BaseService {
  static readonly ApiV1FaturamentoTaxistaGetPath = '/api/v1/FaturamentoTaxista';
  static readonly ApiV1FaturamentoTaxistaPutPath = '/api/v1/FaturamentoTaxista';
  static readonly ApiV1FaturamentoTaxistaPostPath = '/api/v1/FaturamentoTaxista';
  static readonly ApiV1FaturamentoTaxistaByIdGetPath = '/api/v1/FaturamentoTaxista/{id}';
  static readonly ApiV1FaturamentoTaxistaByIdDeletePath = '/api/v1/FaturamentoTaxista/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1FaturamentoTaxistaGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableFaturamentoTaxistaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FaturamentoTaxista`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableFaturamentoTaxistaSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1FaturamentoTaxistaGet(): __Observable<ResponseIEnumerableFaturamentoTaxistaSummary> {
    return this.ApiV1FaturamentoTaxistaGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableFaturamentoTaxistaSummary)
    );
  }

  /**
   * @param FaturamentoTaxistaSummary Modified FaturamentoTaxista list's properties summary
   * @return Success
   */
  ApiV1FaturamentoTaxistaPutResponse(FaturamentoTaxistaSummary?: FaturamentoTaxistaSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FaturamentoTaxistaSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/FaturamentoTaxista`,
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
   * @param FaturamentoTaxistaSummary Modified FaturamentoTaxista list's properties summary
   * @return Success
   */
  ApiV1FaturamentoTaxistaPut(FaturamentoTaxistaSummary?: FaturamentoTaxistaSummary): __Observable<ResponseBoolean> {
    return this.ApiV1FaturamentoTaxistaPutResponse(FaturamentoTaxistaSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param FaturamentoTaxistaSummary FaturamentoTaxista's summary
   * @return Success
   */
  ApiV1FaturamentoTaxistaPostResponse(FaturamentoTaxistaSummary?: FaturamentoTaxistaSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FaturamentoTaxistaSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/FaturamentoTaxista`,
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
   * @param FaturamentoTaxistaSummary FaturamentoTaxista's summary
   * @return Success
   */
  ApiV1FaturamentoTaxistaPost(FaturamentoTaxistaSummary?: FaturamentoTaxistaSummary): __Observable<ResponseGuid> {
    return this.ApiV1FaturamentoTaxistaPostResponse(FaturamentoTaxistaSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FaturamentoTaxistaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseFaturamentoTaxistaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FaturamentoTaxista/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseFaturamentoTaxistaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FaturamentoTaxistaByIdGet(id: string): __Observable<ResponseFaturamentoTaxistaSummary> {
    return this.ApiV1FaturamentoTaxistaByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseFaturamentoTaxistaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1FaturamentoTaxistaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/FaturamentoTaxista/${id}`,
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
  ApiV1FaturamentoTaxistaByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1FaturamentoTaxistaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module FaturamentoTaxistaService {
}

export { FaturamentoTaxistaService }
