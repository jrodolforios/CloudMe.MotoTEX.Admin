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
  static readonly GetAllPath = '/api/v1/Corrida';
  static readonly PutPath = '/api/v1/Corrida';
  static readonly PostPath = '/api/v1/Corrida';
  static readonly GetPath = '/api/v1/Corrida/{id}';
  static readonly DeletePath = '/api/v1/Corrida/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  GetAllResponse(): __Observable<__StrictHttpResponse<Array<CorridaSummary>>> {
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
  GetAll(): __Observable<Array<CorridaSummary>> {
    return this.GetAllResponse().pipe(
      __map(_r => _r.body as Array<CorridaSummary>)
    );
  }

  /**
   * @param corridaSummary Modified Corrida list's properties summary
   * @return Success
   */
  PutResponse(corridaSummary?: CorridaSummary): __Observable<__StrictHttpResponse<boolean>> {
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
  Put(corridaSummary?: CorridaSummary): __Observable<boolean> {
    return this.PutResponse(corridaSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param corridaSummary Corrida's summary
   */
  PostResponse(corridaSummary?: CorridaSummary): __Observable<__StrictHttpResponse<null>> {
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
  Post(corridaSummary?: CorridaSummary): __Observable<null> {
    return this.PostResponse(corridaSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  GetResponse(id: string): __Observable<__StrictHttpResponse<CorridaSummary>> {
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
  Get(id: string): __Observable<CorridaSummary> {
    return this.GetResponse(id).pipe(
      __map(_r => _r.body as CorridaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  DeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
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
  Delete(id: string): __Observable<boolean> {
    return this.DeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module CorridaService {
}

export { CorridaService }
