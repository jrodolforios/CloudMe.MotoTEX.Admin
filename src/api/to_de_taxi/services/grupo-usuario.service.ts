/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableGrupoUsuarioSummary } from '../models/response-ienumerable-grupo-usuario-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { GrupoUsuarioSummary } from '../models/grupo-usuario-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseGrupoUsuarioSummary } from '../models/response-grupo-usuario-summary';
@Injectable({
  providedIn: 'root',
})
class GrupoUsuarioService extends __BaseService {
  static readonly ApiV1GrupoUsuarioGetPath = '/api/v1/GrupoUsuario';
  static readonly ApiV1GrupoUsuarioPutPath = '/api/v1/GrupoUsuario';
  static readonly ApiV1GrupoUsuarioPostPath = '/api/v1/GrupoUsuario';
  static readonly ApiV1GrupoUsuarioByIdGetPath = '/api/v1/GrupoUsuario/{id}';
  static readonly ApiV1GrupoUsuarioByIdDeletePath = '/api/v1/GrupoUsuario/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1GrupoUsuarioGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableGrupoUsuarioSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/GrupoUsuario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableGrupoUsuarioSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1GrupoUsuarioGet(): __Observable<ResponseIEnumerableGrupoUsuarioSummary> {
    return this.ApiV1GrupoUsuarioGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableGrupoUsuarioSummary)
    );
  }

  /**
   * @param GrupoUsuarioSummary Modified GrupoUsuario list's properties summary
   * @return Success
   */
  ApiV1GrupoUsuarioPutResponse(GrupoUsuarioSummary?: GrupoUsuarioSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GrupoUsuarioSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/GrupoUsuario`,
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
   * @param GrupoUsuarioSummary Modified GrupoUsuario list's properties summary
   * @return Success
   */
  ApiV1GrupoUsuarioPut(GrupoUsuarioSummary?: GrupoUsuarioSummary): __Observable<ResponseBoolean> {
    return this.ApiV1GrupoUsuarioPutResponse(GrupoUsuarioSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param GrupoUsuarioSummary GrupoUsuario's summary
   * @return Success
   */
  ApiV1GrupoUsuarioPostResponse(GrupoUsuarioSummary?: GrupoUsuarioSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GrupoUsuarioSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/GrupoUsuario`,
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
   * @param GrupoUsuarioSummary GrupoUsuario's summary
   * @return Success
   */
  ApiV1GrupoUsuarioPost(GrupoUsuarioSummary?: GrupoUsuarioSummary): __Observable<ResponseGuid> {
    return this.ApiV1GrupoUsuarioPostResponse(GrupoUsuarioSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1GrupoUsuarioByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseGrupoUsuarioSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/GrupoUsuario/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseGrupoUsuarioSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1GrupoUsuarioByIdGet(id: string): __Observable<ResponseGrupoUsuarioSummary> {
    return this.ApiV1GrupoUsuarioByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseGrupoUsuarioSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1GrupoUsuarioByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/GrupoUsuario/${id}`,
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
  ApiV1GrupoUsuarioByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1GrupoUsuarioByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module GrupoUsuarioService {
}

export { GrupoUsuarioService }
