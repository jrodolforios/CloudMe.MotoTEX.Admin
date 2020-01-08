/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableTarifaSummary } from '../models/response-ienumerable-tarifa-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { TarifaSummary } from '../models/tarifa-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseDecimal } from '../models/response-decimal';
import { ResponseTarifaSummary } from '../models/response-tarifa-summary';
@Injectable({
  providedIn: 'root',
})
class TarifaService extends __BaseService {
  static readonly ApiV1TarifaGetPath = '/api/v1/Tarifa';
  static readonly ApiV1TarifaPutPath = '/api/v1/Tarifa';
  static readonly ApiV1TarifaPostPath = '/api/v1/Tarifa';
  static readonly ApiV1TarifaGetValorKmRodadoAtualGetPath = '/api/v1/Tarifa/GetValorKmRodadoAtual';
  static readonly ApiV1TarifaByIdGetPath = '/api/v1/Tarifa/{id}';
  static readonly ApiV1TarifaByIdDeletePath = '/api/v1/Tarifa/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1TarifaGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableTarifaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Tarifa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableTarifaSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1TarifaGet(): __Observable<ResponseIEnumerableTarifaSummary> {
    return this.ApiV1TarifaGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableTarifaSummary)
    );
  }

  /**
   * @param TarifaSummary Modified Tarifa list's properties summary
   * @return Success
   */
  ApiV1TarifaPutResponse(TarifaSummary?: TarifaSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = TarifaSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Tarifa`,
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
   * @param TarifaSummary Modified Tarifa list's properties summary
   * @return Success
   */
  ApiV1TarifaPut(TarifaSummary?: TarifaSummary): __Observable<ResponseBoolean> {
    return this.ApiV1TarifaPutResponse(TarifaSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param TarifaSummary Tarifa's summary
   * @return Success
   */
  ApiV1TarifaPostResponse(TarifaSummary?: TarifaSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = TarifaSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Tarifa`,
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
   * @param TarifaSummary Tarifa's summary
   * @return Success
   */
  ApiV1TarifaPost(TarifaSummary?: TarifaSummary): __Observable<ResponseGuid> {
    return this.ApiV1TarifaPostResponse(TarifaSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param kilometers undefined
   * @return Success
   */
  ApiV1TarifaGetValorKmRodadoAtualGetResponse(kilometers?: number): __Observable<__StrictHttpResponse<ResponseDecimal>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (kilometers != null) __params = __params.set('kilometers', kilometers.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Tarifa/GetValorKmRodadoAtual`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseDecimal>;
      })
    );
  }
  /**
   * @param kilometers undefined
   * @return Success
   */
  ApiV1TarifaGetValorKmRodadoAtualGet(kilometers?: number): __Observable<ResponseDecimal> {
    return this.ApiV1TarifaGetValorKmRodadoAtualGetResponse(kilometers).pipe(
      __map(_r => _r.body as ResponseDecimal)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1TarifaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseTarifaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Tarifa/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseTarifaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1TarifaByIdGet(id: string): __Observable<ResponseTarifaSummary> {
    return this.ApiV1TarifaByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseTarifaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1TarifaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Tarifa/${id}`,
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
  ApiV1TarifaByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1TarifaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module TarifaService {
}

export { TarifaService }
