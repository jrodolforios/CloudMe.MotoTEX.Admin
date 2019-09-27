/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UsuarioSummary } from '../models/usuario-summary';
@Injectable({
  providedIn: 'root',
})
class UsuarioService extends __BaseService {
  static readonly ApiV1UsuarioGetPath = '/api/v1/Usuario';
  static readonly ApiV1UsuarioPutPath = '/api/v1/Usuario';
  static readonly ApiV1UsuarioPostPath = '/api/v1/Usuario';
  static readonly ApiV1UsuarioByIdGetPath = '/api/v1/Usuario/{id}';
  static readonly ApiV1UsuarioByIdDeletePath = '/api/v1/Usuario/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `UsuarioService.ApiV1UsuarioGetParams` containing the following parameters:
   *
   * - `search`:
   *
   * - `pageSize`:
   *
   * - `page`:
   *
   * @return Success
   */
  ApiV1UsuarioGetResponse(params: UsuarioService.ApiV1UsuarioGetParams): __Observable<__StrictHttpResponse<Array<UsuarioSummary>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('pageSize', params.pageSize.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Usuario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<UsuarioSummary>>;
      })
    );
  }
  /**
   * @param params The `UsuarioService.ApiV1UsuarioGetParams` containing the following parameters:
   *
   * - `search`:
   *
   * - `pageSize`:
   *
   * - `page`:
   *
   * @return Success
   */
  ApiV1UsuarioGet(params: UsuarioService.ApiV1UsuarioGetParams): __Observable<Array<UsuarioSummary>> {
    return this.ApiV1UsuarioGetResponse(params).pipe(
      __map(_r => _r.body as Array<UsuarioSummary>)
    );
  }

  /**
   * @param UsuarioSummary Modified Usuario list's properties summary
   * @return Success
   */
  ApiV1UsuarioPutResponse(UsuarioSummary?: UsuarioSummary): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = UsuarioSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Usuario`,
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
   * @param UsuarioSummary Modified Usuario list's properties summary
   * @return Success
   */
  ApiV1UsuarioPut(UsuarioSummary?: UsuarioSummary): __Observable<boolean> {
    return this.ApiV1UsuarioPutResponse(UsuarioSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param UsuarioSummary Usuario's summary
   * @return Success
   */
  ApiV1UsuarioPostResponse(UsuarioSummary?: UsuarioSummary): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = UsuarioSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Usuario`,
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
   * @param UsuarioSummary Usuario's summary
   * @return Success
   */
  ApiV1UsuarioPost(UsuarioSummary?: UsuarioSummary): __Observable<string> {
    return this.ApiV1UsuarioPostResponse(UsuarioSummary).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1UsuarioByIdGetResponse(id: string): __Observable<__StrictHttpResponse<UsuarioSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Usuario/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UsuarioSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1UsuarioByIdGet(id: string): __Observable<UsuarioSummary> {
    return this.ApiV1UsuarioByIdGetResponse(id).pipe(
      __map(_r => _r.body as UsuarioSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1UsuarioByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Usuario/${id}`,
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
  ApiV1UsuarioByIdDelete(id: string): __Observable<boolean> {
    return this.ApiV1UsuarioByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module UsuarioService {

  /**
   * Parameters for ApiV1UsuarioGet
   */
  export interface ApiV1UsuarioGetParams {
    search?: string;
    pageSize?: number;
    page?: number;
  }
}

export { UsuarioService }
