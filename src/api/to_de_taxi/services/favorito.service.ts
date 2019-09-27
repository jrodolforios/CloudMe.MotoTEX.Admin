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
  static readonly ApiV1FavoritoGetPath = '/api/v1/Favorito';
  static readonly ApiV1FavoritoPutPath = '/api/v1/Favorito';
  static readonly ApiV1FavoritoPostPath = '/api/v1/Favorito';
  static readonly ApiV1FavoritoByIdGetPath = '/api/v1/Favorito/{id}';
  static readonly ApiV1FavoritoByIdDeletePath = '/api/v1/Favorito/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1FavoritoGetResponse(): __Observable<__StrictHttpResponse<Array<FavoritoSummary>>> {
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
  ApiV1FavoritoGet(): __Observable<Array<FavoritoSummary>> {
    return this.ApiV1FavoritoGetResponse().pipe(
      __map(_r => _r.body as Array<FavoritoSummary>)
    );
  }

  /**
   * @param favoritoSummary Modified Favorito list's properties summary
   * @return Success
   */
  ApiV1FavoritoPutResponse(favoritoSummary?: FavoritoSummary): __Observable<__StrictHttpResponse<boolean>> {
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
  ApiV1FavoritoPut(favoritoSummary?: FavoritoSummary): __Observable<boolean> {
    return this.ApiV1FavoritoPutResponse(favoritoSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param favoritoSummary Favorito's summary
   */
  ApiV1FavoritoPostResponse(favoritoSummary?: FavoritoSummary): __Observable<__StrictHttpResponse<null>> {
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
  ApiV1FavoritoPost(favoritoSummary?: FavoritoSummary): __Observable<null> {
    return this.ApiV1FavoritoPostResponse(favoritoSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FavoritoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<FavoritoSummary>> {
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
  ApiV1FavoritoByIdGet(id: string): __Observable<FavoritoSummary> {
    return this.ApiV1FavoritoByIdGetResponse(id).pipe(
      __map(_r => _r.body as FavoritoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1FavoritoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
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
  ApiV1FavoritoByIdDelete(id: string): __Observable<boolean> {
    return this.ApiV1FavoritoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module FavoritoService {
}

export { FavoritoService }
