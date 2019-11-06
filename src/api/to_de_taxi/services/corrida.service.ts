/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableCorridaSummary } from '../models/response-ienumerable-corrida-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { CorridaSummary } from '../models/corrida-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseCorridaSummary } from '../models/response-corrida-summary';
@Injectable({
  providedIn: 'root',
})
class CorridaService extends __BaseService {
  static readonly ApiV1CorridaGetPath = '/api/v1/Corrida';
  static readonly ApiV1CorridaPutPath = '/api/v1/Corrida';
  static readonly ApiV1CorridaPostPath = '/api/v1/Corrida';
  static readonly ApiV1CorridaConsultaIdPassageiroByIdGetPath = '/api/v1/Corrida/consulta_id_passageiro/{id}';
  static readonly ApiV1CorridaByIdGetPath = '/api/v1/Corrida/{id}';
  static readonly ApiV1CorridaByIdDeletePath = '/api/v1/Corrida/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1CorridaGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableCorridaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Corrida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableCorridaSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1CorridaGet(): __Observable<ResponseIEnumerableCorridaSummary> {
    return this.ApiV1CorridaGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableCorridaSummary)
    );
  }

  /**
   * @param corridaSummary Modified Corrida list's properties summary
   * @return Success
   */
  ApiV1CorridaPutResponse(corridaSummary?: CorridaSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = corridaSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Corrida`,
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
   * @param corridaSummary Modified Corrida list's properties summary
   * @return Success
   */
  ApiV1CorridaPut(corridaSummary?: CorridaSummary): __Observable<ResponseBoolean> {
    return this.ApiV1CorridaPutResponse(corridaSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param corridaSummary Corrida's summary
   * @return Success
   */
  ApiV1CorridaPostResponse(corridaSummary?: CorridaSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = corridaSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Corrida`,
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
   * @param corridaSummary Corrida's summary
   * @return Success
   */
  ApiV1CorridaPost(corridaSummary?: CorridaSummary): __Observable<ResponseGuid> {
    return this.ApiV1CorridaPostResponse(corridaSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1CorridaConsultaIdPassageiroByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseIEnumerableCorridaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Corrida/consulta_id_passageiro/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableCorridaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1CorridaConsultaIdPassageiroByIdGet(id: string): __Observable<ResponseIEnumerableCorridaSummary> {
    return this.ApiV1CorridaConsultaIdPassageiroByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseIEnumerableCorridaSummary)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1CorridaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseCorridaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Corrida/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseCorridaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1CorridaByIdGet(id: string): __Observable<ResponseCorridaSummary> {
    return this.ApiV1CorridaByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseCorridaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1CorridaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Corrida/${id}`,
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
  ApiV1CorridaByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1CorridaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module CorridaService {
}

export { CorridaService }
