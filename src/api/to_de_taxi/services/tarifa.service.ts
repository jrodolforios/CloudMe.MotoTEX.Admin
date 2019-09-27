/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TarifaSummary } from '../models/tarifa-summary';
@Injectable({
  providedIn: 'root',
})
class TarifaService extends __BaseService {
  static readonly ApiV1TarifaGetPath = '/api/v1/Tarifa';
  static readonly ApiV1TarifaPutPath = '/api/v1/Tarifa';
  static readonly ApiV1TarifaPostPath = '/api/v1/Tarifa';
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
  ApiV1TarifaGetResponse(): __Observable<__StrictHttpResponse<Array<TarifaSummary>>> {
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
        return _r as __StrictHttpResponse<Array<TarifaSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1TarifaGet(): __Observable<Array<TarifaSummary>> {
    return this.ApiV1TarifaGetResponse().pipe(
      __map(_r => _r.body as Array<TarifaSummary>)
    );
  }

  /**
   * @param tarifaSummary Modified Tarifa list's properties summary
   * @return Success
   */
  ApiV1TarifaPutResponse(tarifaSummary?: TarifaSummary): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tarifaSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Tarifa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @param tarifaSummary Modified Tarifa list's properties summary
   * @return Success
   */
  ApiV1TarifaPut(tarifaSummary?: TarifaSummary): __Observable<string> {
    return this.ApiV1TarifaPutResponse(tarifaSummary).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param tarifaSummary Tarifa's summary
   * @return Success
   */
  ApiV1TarifaPostResponse(tarifaSummary?: TarifaSummary): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tarifaSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Tarifa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @param tarifaSummary Tarifa's summary
   * @return Success
   */
  ApiV1TarifaPost(tarifaSummary?: TarifaSummary): __Observable<string> {
    return this.ApiV1TarifaPostResponse(tarifaSummary).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1TarifaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<TarifaSummary>> {
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
        return _r as __StrictHttpResponse<TarifaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1TarifaByIdGet(id: string): __Observable<TarifaSummary> {
    return this.ApiV1TarifaByIdGetResponse(id).pipe(
      __map(_r => _r.body as TarifaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1TarifaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
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
  ApiV1TarifaByIdDelete(id: string): __Observable<boolean> {
    return this.ApiV1TarifaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module TarifaService {
}

export { TarifaService }
