/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableRotaSummary } from '../models/response-ienumerable-rota-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { RotaSummary } from '../models/rota-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseRotaSummary } from '../models/response-rota-summary';
@Injectable({
  providedIn: 'root',
})
class RotaService extends __BaseService {
  static readonly ApiV1RotaGetPath = '/api/v1/Rota';
  static readonly ApiV1RotaPutPath = '/api/v1/Rota';
  static readonly ApiV1RotaPostPath = '/api/v1/Rota';
  static readonly ApiV1RotaByIdGetPath = '/api/v1/Rota/{id}';
  static readonly ApiV1RotaByIdDeletePath = '/api/v1/Rota/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1RotaGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableRotaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Rota`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableRotaSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1RotaGet(): __Observable<ResponseIEnumerableRotaSummary> {
    return this.ApiV1RotaGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableRotaSummary)
    );
  }

  /**
   * @param RotaSummary Modified Rota list's properties summary
   * @return Success
   */
  ApiV1RotaPutResponse(RotaSummary?: RotaSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = RotaSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Rota`,
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
   * @param RotaSummary Modified Rota list's properties summary
   * @return Success
   */
  ApiV1RotaPut(RotaSummary?: RotaSummary): __Observable<ResponseBoolean> {
    return this.ApiV1RotaPutResponse(RotaSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param RotaSummary Rota's summary
   * @return Success
   */
  ApiV1RotaPostResponse(RotaSummary?: RotaSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = RotaSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Rota`,
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
   * @param RotaSummary Rota's summary
   * @return Success
   */
  ApiV1RotaPost(RotaSummary?: RotaSummary): __Observable<ResponseGuid> {
    return this.ApiV1RotaPostResponse(RotaSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1RotaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseRotaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Rota/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseRotaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1RotaByIdGet(id: string): __Observable<ResponseRotaSummary> {
    return this.ApiV1RotaByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseRotaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1RotaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Rota/${id}`,
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
  ApiV1RotaByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1RotaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module RotaService {
}

export { RotaService }
