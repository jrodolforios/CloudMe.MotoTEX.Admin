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
  static readonly GetAllPath = '/api/v1/Usuario';
  static readonly PutPath = '/api/v1/Usuario';
  static readonly PostPath = '/api/v1/Usuario';
  static readonly GetPath = '/api/v1/Usuario/{id}';
  static readonly DeletePath = '/api/v1/Usuario/{id}';
  static readonly LoginPath = '/api/v1/Usuario/login';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  GetAllResponse(): __Observable<__StrictHttpResponse<Array<UsuarioSummary>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
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
   * @return Success
   */
  GetAll(): __Observable<Array<UsuarioSummary>> {
    return this.GetAllResponse().pipe(
      __map(_r => _r.body as Array<UsuarioSummary>)
    );
  }

  /**
   * @param UsuarioSummary Modified Usuario list's properties summary
   * @return Success
   */
  PutResponse(UsuarioSummary?: UsuarioSummary): __Observable<__StrictHttpResponse<boolean>> {
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
  Put(UsuarioSummary?: UsuarioSummary): __Observable<boolean> {
    return this.PutResponse(UsuarioSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param UsuarioSummary Usuario's summary
   */
  PostResponse(UsuarioSummary?: UsuarioSummary): __Observable<__StrictHttpResponse<null>> {
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
   * @param UsuarioSummary Usuario's summary
   */
  Post(UsuarioSummary?: UsuarioSummary): __Observable<null> {
    return this.PostResponse(UsuarioSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  GetResponse(id: string): __Observable<__StrictHttpResponse<UsuarioSummary>> {
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
  Get(id: string): __Observable<UsuarioSummary> {
    return this.GetResponse(id).pipe(
      __map(_r => _r.body as UsuarioSummary)
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
  Delete(id: string): __Observable<boolean> {
    return this.DeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param usuario Resumo do usuário
   */
  LoginResponse(usuario?: UsuarioSummary): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = usuario;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Usuario/login`,
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
   * @param usuario Resumo do usuário
   */
  Login(usuario?: UsuarioSummary): __Observable<null> {
    return this.LoginResponse(usuario).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module UsuarioService {
}

export { UsuarioService }
