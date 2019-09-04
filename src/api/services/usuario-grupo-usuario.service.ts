/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UsuarioGrupoUsuarioSummary } from '../models/usuario-grupo-usuario-summary';
@Injectable({
  providedIn: 'root',
})
class UsuarioGrupoUsuarioService extends __BaseService {
  static readonly GetAllPath = '/api/v1/UsuarioGrupoUsuario';
  static readonly PutPath = '/api/v1/UsuarioGrupoUsuario';
  static readonly PostPath = '/api/v1/UsuarioGrupoUsuario';
  static readonly GetPath = '/api/v1/UsuarioGrupoUsuario/{id}';
  static readonly DeletePath = '/api/v1/UsuarioGrupoUsuario/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  GetAllResponse(): __Observable<__StrictHttpResponse<Array<UsuarioGrupoUsuarioSummary>>> {
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
        return _r as __StrictHttpResponse<Array<UsuarioGrupoUsuarioSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  GetAll(): __Observable<Array<UsuarioGrupoUsuarioSummary>> {
    return this.GetAllResponse().pipe(
      __map(_r => _r.body as Array<UsuarioGrupoUsuarioSummary>)
    );
  }

  /**
   * @param usuarioGrupoUsuarioSummary Modified UsuarioGrupoUsuario list's properties summary
   * @return Success
   */
  PutResponse(usuarioGrupoUsuarioSummary?: UsuarioGrupoUsuarioSummary): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = usuarioGrupoUsuarioSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/UsuarioGrupoUsuario`,
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
   * @param usuarioGrupoUsuarioSummary Modified UsuarioGrupoUsuario list's properties summary
   * @return Success
   */
  Put(usuarioGrupoUsuarioSummary?: UsuarioGrupoUsuarioSummary): __Observable<boolean> {
    return this.PutResponse(usuarioGrupoUsuarioSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param usuarioGrupoUsuarioSummary UsuarioGrupoUsuario's summary
   */
  PostResponse(usuarioGrupoUsuarioSummary?: UsuarioGrupoUsuarioSummary): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = usuarioGrupoUsuarioSummary;
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param usuarioGrupoUsuarioSummary UsuarioGrupoUsuario's summary
   */
  Post(usuarioGrupoUsuarioSummary?: UsuarioGrupoUsuarioSummary): __Observable<null> {
    return this.PostResponse(usuarioGrupoUsuarioSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  GetResponse(id: string): __Observable<__StrictHttpResponse<UsuarioGrupoUsuarioSummary>> {
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
        return _r as __StrictHttpResponse<UsuarioGrupoUsuarioSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  Get(id: string): __Observable<UsuarioGrupoUsuarioSummary> {
    return this.GetResponse(id).pipe(
      __map(_r => _r.body as UsuarioGrupoUsuarioSummary)
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
      this.rootUrl + `/api/v1/UsuarioGrupoUsuario/${id}`,
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

module UsuarioGrupoUsuarioService {
}

export { UsuarioGrupoUsuarioService }
