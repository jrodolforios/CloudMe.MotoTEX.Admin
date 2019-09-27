/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { RotaSummary } from '../models/rota-summary';
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
  ApiV1RotaGetResponse(): __Observable<__StrictHttpResponse<Array<RotaSummary>>> {
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
        return _r as __StrictHttpResponse<Array<RotaSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1RotaGet(): __Observable<Array<RotaSummary>> {
    return this.ApiV1RotaGetResponse().pipe(
      __map(_r => _r.body as Array<RotaSummary>)
    );
  }

  /**
   * @param rotaSummary Modified Rota list's properties summary
   * @return Success
   */
  ApiV1RotaPutResponse(rotaSummary?: RotaSummary): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = rotaSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Rota`,
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
   * @param rotaSummary Modified Rota list's properties summary
   * @return Success
   */
  ApiV1RotaPut(rotaSummary?: RotaSummary): __Observable<boolean> {
    return this.ApiV1RotaPutResponse(rotaSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param rotaSummary Rota's summary
   */
  ApiV1RotaPostResponse(rotaSummary?: RotaSummary): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = rotaSummary;
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param rotaSummary Rota's summary
   */
  ApiV1RotaPost(rotaSummary?: RotaSummary): __Observable<null> {
    return this.ApiV1RotaPostResponse(rotaSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1RotaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<RotaSummary>> {
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
        return _r as __StrictHttpResponse<RotaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1RotaByIdGet(id: string): __Observable<RotaSummary> {
    return this.ApiV1RotaByIdGetResponse(id).pipe(
      __map(_r => _r.body as RotaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1RotaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
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
  ApiV1RotaByIdDelete(id: string): __Observable<boolean> {
    return this.ApiV1RotaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module RotaService {
}

export { RotaService }
