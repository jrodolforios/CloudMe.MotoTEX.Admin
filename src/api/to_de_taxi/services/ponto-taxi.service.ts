/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerablePontoTaxiSummary } from '../models/response-ienumerable-ponto-taxi-summary';
import { ResponsePontoTaxiSummary } from '../models/response-ponto-taxi-summary';
import { PontoTaxiSummary } from '../models/ponto-taxi-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { ResponseIEnumerableTaxistaSummary } from '../models/response-ienumerable-taxista-summary';
@Injectable({
  providedIn: 'root',
})
class PontoTaxiService extends __BaseService {
  static readonly ApiV1PontoTaxiGetPath = '/api/v1/PontoTaxi';
  static readonly ApiV1PontoTaxiPutPath = '/api/v1/PontoTaxi';
  static readonly ApiV1PontoTaxiPostPath = '/api/v1/PontoTaxi';
  static readonly ApiV1PontoTaxiByIdGetPath = '/api/v1/PontoTaxi/{id}';
  static readonly ApiV1PontoTaxiByIdDeletePath = '/api/v1/PontoTaxi/{id}';
  static readonly ApiV1PontoTaxiByIdTaxistasGetPath = '/api/v1/PontoTaxi/{id}/taxistas';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1PontoTaxiGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerablePontoTaxiSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/PontoTaxi`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerablePontoTaxiSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1PontoTaxiGet(): __Observable<ResponseIEnumerablePontoTaxiSummary> {
    return this.ApiV1PontoTaxiGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerablePontoTaxiSummary)
    );
  }

  /**
   * @param pontoTaxiSummary Modified PontoTaxi list's properties summary
   * @return Success
   */
  ApiV1PontoTaxiPutResponse(pontoTaxiSummary?: PontoTaxiSummary): __Observable<__StrictHttpResponse<ResponsePontoTaxiSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = pontoTaxiSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/PontoTaxi`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponsePontoTaxiSummary>;
      })
    );
  }
  /**
   * @param pontoTaxiSummary Modified PontoTaxi list's properties summary
   * @return Success
   */
  ApiV1PontoTaxiPut(pontoTaxiSummary?: PontoTaxiSummary): __Observable<ResponsePontoTaxiSummary> {
    return this.ApiV1PontoTaxiPutResponse(pontoTaxiSummary).pipe(
      __map(_r => _r.body as ResponsePontoTaxiSummary)
    );
  }

  /**
   * @param pontoTaxiSummary PontoTaxi's summary
   * @return Success
   */
  ApiV1PontoTaxiPostResponse(pontoTaxiSummary?: PontoTaxiSummary): __Observable<__StrictHttpResponse<ResponsePontoTaxiSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = pontoTaxiSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/PontoTaxi`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponsePontoTaxiSummary>;
      })
    );
  }
  /**
   * @param pontoTaxiSummary PontoTaxi's summary
   * @return Success
   */
  ApiV1PontoTaxiPost(pontoTaxiSummary?: PontoTaxiSummary): __Observable<ResponsePontoTaxiSummary> {
    return this.ApiV1PontoTaxiPostResponse(pontoTaxiSummary).pipe(
      __map(_r => _r.body as ResponsePontoTaxiSummary)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1PontoTaxiByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponsePontoTaxiSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/PontoTaxi/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponsePontoTaxiSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1PontoTaxiByIdGet(id: string): __Observable<ResponsePontoTaxiSummary> {
    return this.ApiV1PontoTaxiByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponsePontoTaxiSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1PontoTaxiByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/PontoTaxi/${id}`,
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
  ApiV1PontoTaxiByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1PontoTaxiByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1PontoTaxiByIdTaxistasGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseIEnumerableTaxistaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/PontoTaxi/${id}/taxistas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableTaxistaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1PontoTaxiByIdTaxistasGet(id: string): __Observable<ResponseIEnumerableTaxistaSummary> {
    return this.ApiV1PontoTaxiByIdTaxistasGetResponse(id).pipe(
      __map(_r => _r.body as ResponseIEnumerableTaxistaSummary)
    );
  }
}

module PontoTaxiService {
}

export { PontoTaxiService }
