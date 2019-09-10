/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FavoritoSummary } from '../models/favorito-summary';
@Injectable({
  providedIn: 'root',
})
class FavoritoService extends __BaseService {
  static readonly GetAllPath = '/api/v1/Favorito';
  static readonly PutPath = '/api/v1/Favorito';
  static readonly PostPath = '/api/v1/Favorito';
  static readonly GetPath = '/api/v1/Favorito/{id}';
  static readonly DeletePath = '/api/v1/Favorito/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  GetAllResponse(): __Observable<__StrictHttpResponse<Array<FavoritoSummary>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Favorito`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<FavoritoSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  GetAll(): __Observable<Array<FavoritoSummary>> {
    return this.GetAllResponse().pipe(
      __map(_r => _r.body as Array<FavoritoSummary>)
    );
  }

  /**
   * @param favoritoSummary Modified Favorito list's properties summary
   * @return Success
   */
  PutResponse(favoritoSummary?: FavoritoSummary): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = favoritoSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Favorito`,
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
   * @param favoritoSummary Modified Favorito list's properties summary
   * @return Success
   */
  Put(favoritoSummary?: FavoritoSummary): __Observable<boolean> {
    return this.PutResponse(favoritoSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param favoritoSummary Favorito's summary
   */
  PostResponse(favoritoSummary?: FavoritoSummary): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = favoritoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Favorito`,
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
   * @param favoritoSummary Favorito's summary
   */
  Post(favoritoSummary?: FavoritoSummary): __Observable<null> {
    return this.PostResponse(favoritoSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  GetResponse(id: string): __Observable<__StrictHttpResponse<FavoritoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Favorito/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FavoritoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  Get(id: string): __Observable<FavoritoSummary> {
    return this.GetResponse(id).pipe(
      __map(_r => _r.body as FavoritoSummary)
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
      this.rootUrl + `/api/v1/Favorito/${id}`,
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

module FavoritoService {
}

export { FavoritoService }
