/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GrupoUsuarioSummary } from '../models/grupo-usuario-summary';
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
  ApiV1GrupoUsuarioGetResponse(): __Observable<__StrictHttpResponse<Array<GrupoUsuarioSummary>>> {
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
        return _r as __StrictHttpResponse<Array<GrupoUsuarioSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1GrupoUsuarioGet(): __Observable<Array<GrupoUsuarioSummary>> {
    return this.ApiV1GrupoUsuarioGetResponse().pipe(
      __map(_r => _r.body as Array<GrupoUsuarioSummary>)
    );
  }

  /**
   * @param grupoUsuarioSummary Modified GrupoUsuario list's properties summary
   * @return Success
   */
  ApiV1GrupoUsuarioPutResponse(grupoUsuarioSummary?: GrupoUsuarioSummary): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = grupoUsuarioSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/GrupoUsuario`,
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
   * @param grupoUsuarioSummary Modified GrupoUsuario list's properties summary
   * @return Success
   */
  ApiV1GrupoUsuarioPut(grupoUsuarioSummary?: GrupoUsuarioSummary): __Observable<boolean> {
    return this.ApiV1GrupoUsuarioPutResponse(grupoUsuarioSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param grupoUsuarioSummary GrupoUsuario's summary
   */
  ApiV1GrupoUsuarioPostResponse(grupoUsuarioSummary?: GrupoUsuarioSummary): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = grupoUsuarioSummary;
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param grupoUsuarioSummary GrupoUsuario's summary
   */
  ApiV1GrupoUsuarioPost(grupoUsuarioSummary?: GrupoUsuarioSummary): __Observable<null> {
    return this.ApiV1GrupoUsuarioPostResponse(grupoUsuarioSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1GrupoUsuarioByIdGetResponse(id: string): __Observable<__StrictHttpResponse<GrupoUsuarioSummary>> {
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
        return _r as __StrictHttpResponse<GrupoUsuarioSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1GrupoUsuarioByIdGet(id: string): __Observable<GrupoUsuarioSummary> {
    return this.ApiV1GrupoUsuarioByIdGetResponse(id).pipe(
      __map(_r => _r.body as GrupoUsuarioSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1GrupoUsuarioByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
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
  ApiV1GrupoUsuarioByIdDelete(id: string): __Observable<boolean> {
    return this.ApiV1GrupoUsuarioByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module GrupoUsuarioService {
}

export { GrupoUsuarioService }
