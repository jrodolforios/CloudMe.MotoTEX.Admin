/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableUsuarioGrupoUsuarioSummary } from '../models/response-ienumerable-usuario-grupo-usuario-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { UsuarioGrupoUsuarioSummary } from '../models/usuario-grupo-usuario-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseUsuarioGrupoUsuarioSummary } from '../models/response-usuario-grupo-usuario-summary';
@Injectable({
  providedIn: 'root',
})
class UsuarioGrupoUsuarioService extends __BaseService {
  static readonly ApiV1UsuarioGrupoUsuarioGetPath = '/api/v1/UsuarioGrupoUsuario';
  static readonly ApiV1UsuarioGrupoUsuarioPutPath = '/api/v1/UsuarioGrupoUsuario';
  static readonly ApiV1UsuarioGrupoUsuarioPostPath = '/api/v1/UsuarioGrupoUsuario';
  static readonly ApiV1UsuarioGrupoUsuarioByIdGetPath = '/api/v1/UsuarioGrupoUsuario/{id}';
  static readonly ApiV1UsuarioGrupoUsuarioByIdDeletePath = '/api/v1/UsuarioGrupoUsuario/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1UsuarioGrupoUsuarioGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableUsuarioGrupoUsuarioSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/UsuarioGrupoUsuario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableUsuarioGrupoUsuarioSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1UsuarioGrupoUsuarioGet(): __Observable<ResponseIEnumerableUsuarioGrupoUsuarioSummary> {
    return this.ApiV1UsuarioGrupoUsuarioGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableUsuarioGrupoUsuarioSummary)
    );
  }

  /**
   * @param UsuarioGrupoUsuarioSummary Modified UsuarioGrupoUsuario list's properties summary
   * @return Success
   */
  ApiV1UsuarioGrupoUsuarioPutResponse(UsuarioGrupoUsuarioSummary?: UsuarioGrupoUsuarioSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = UsuarioGrupoUsuarioSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/UsuarioGrupoUsuario`,
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
   * @param UsuarioGrupoUsuarioSummary Modified UsuarioGrupoUsuario list's properties summary
   * @return Success
   */
  ApiV1UsuarioGrupoUsuarioPut(UsuarioGrupoUsuarioSummary?: UsuarioGrupoUsuarioSummary): __Observable<ResponseBoolean> {
    return this.ApiV1UsuarioGrupoUsuarioPutResponse(UsuarioGrupoUsuarioSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param UsuarioGrupoUsuarioSummary UsuarioGrupoUsuario's summary
   * @return Success
   */
  ApiV1UsuarioGrupoUsuarioPostResponse(UsuarioGrupoUsuarioSummary?: UsuarioGrupoUsuarioSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = UsuarioGrupoUsuarioSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/UsuarioGrupoUsuario`,
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
   * @param UsuarioGrupoUsuarioSummary UsuarioGrupoUsuario's summary
   * @return Success
   */
  ApiV1UsuarioGrupoUsuarioPost(UsuarioGrupoUsuarioSummary?: UsuarioGrupoUsuarioSummary): __Observable<ResponseGuid> {
    return this.ApiV1UsuarioGrupoUsuarioPostResponse(UsuarioGrupoUsuarioSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1UsuarioGrupoUsuarioByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseUsuarioGrupoUsuarioSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/UsuarioGrupoUsuario/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseUsuarioGrupoUsuarioSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1UsuarioGrupoUsuarioByIdGet(id: string): __Observable<ResponseUsuarioGrupoUsuarioSummary> {
    return this.ApiV1UsuarioGrupoUsuarioByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseUsuarioGrupoUsuarioSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1UsuarioGrupoUsuarioByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/UsuarioGrupoUsuario/${id}`,
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
  ApiV1UsuarioGrupoUsuarioByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1UsuarioGrupoUsuarioByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module UsuarioGrupoUsuarioService {
}

export { UsuarioGrupoUsuarioService }
