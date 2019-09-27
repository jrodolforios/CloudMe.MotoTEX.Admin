/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CorridaSummary } from '../models/corrida-summary';
@Injectable({
  providedIn: 'root',
})
class CorridaService extends __BaseService {
  static readonly ApiV1CorridaGetPath = '/api/v1/Corrida';
  static readonly ApiV1CorridaPutPath = '/api/v1/Corrida';
  static readonly ApiV1CorridaPostPath = '/api/v1/Corrida';
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
  ApiV1CorridaGetResponse(): __Observable<__StrictHttpResponse<Array<CorridaSummary>>> {
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
        return _r as __StrictHttpResponse<Array<CorridaSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1CorridaGet(): __Observable<Array<CorridaSummary>> {
    return this.ApiV1CorridaGetResponse().pipe(
      __map(_r => _r.body as Array<CorridaSummary>)
    );
  }

  /**
   * @param corridaSummary Modified Corrida list's properties summary
   * @return Success
   */
  ApiV1CorridaPutResponse(corridaSummary?: CorridaSummary): __Observable<__StrictHttpResponse<boolean>> {
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
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
      })
    );
  }
  /**
   * @param corridaSummary Modified Corrida list's properties summary
   * @return Success
   */
  ApiV1CorridaPut(corridaSummary?: CorridaSummary): __Observable<boolean> {
    return this.ApiV1CorridaPutResponse(corridaSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param corridaSummary Corrida's summary
   */
  ApiV1CorridaPostResponse(corridaSummary?: CorridaSummary): __Observable<__StrictHttpResponse<null>> {
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param corridaSummary Corrida's summary
   */
  ApiV1CorridaPost(corridaSummary?: CorridaSummary): __Observable<null> {
    return this.ApiV1CorridaPostResponse(corridaSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1CorridaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<CorridaSummary>> {
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
        return _r as __StrictHttpResponse<CorridaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1CorridaByIdGet(id: string): __Observable<CorridaSummary> {
    return this.ApiV1CorridaByIdGetResponse(id).pipe(
      __map(_r => _r.body as CorridaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1CorridaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
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
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
      })
    );
  }
  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1CorridaByIdDelete(id: string): __Observable<boolean> {
    return this.ApiV1CorridaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module CorridaService {
}

export { CorridaService }
