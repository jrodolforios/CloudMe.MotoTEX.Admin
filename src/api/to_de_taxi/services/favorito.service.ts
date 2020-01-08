/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableFavoritoSummary } from '../models/response-ienumerable-favorito-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { FavoritoSummary } from '../models/favorito-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseFavoritoSummary } from '../models/response-favorito-summary';
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
  ApiV1FavoritoGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableFavoritoSummary>> {
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
        return _r as __StrictHttpResponse<ResponseIEnumerableFavoritoSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1FavoritoGet(): __Observable<ResponseIEnumerableFavoritoSummary> {
    return this.ApiV1FavoritoGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableFavoritoSummary)
    );
  }

  /**
   * @param FavoritoSummary Modified Favorito list's properties summary
   * @return Success
   */
  ApiV1FavoritoPutResponse(FavoritoSummary?: FavoritoSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FavoritoSummary;
    let req = new HttpRequest<any>(
      'PUT',
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
        return _r as __StrictHttpResponse<ResponseBoolean>;
      })
    );
  }
  /**
   * @param FavoritoSummary Modified Favorito list's properties summary
   * @return Success
   */
  ApiV1FavoritoPut(FavoritoSummary?: FavoritoSummary): __Observable<ResponseBoolean> {
    return this.ApiV1FavoritoPutResponse(FavoritoSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param FavoritoSummary Favorito's summary
   * @return Success
   */
  ApiV1FavoritoPostResponse(FavoritoSummary?: FavoritoSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FavoritoSummary;
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
        return _r as __StrictHttpResponse<ResponseGuid>;
      })
    );
  }
  /**
   * @param FavoritoSummary Favorito's summary
   * @return Success
   */
  ApiV1FavoritoPost(FavoritoSummary?: FavoritoSummary): __Observable<ResponseGuid> {
    return this.ApiV1FavoritoPostResponse(FavoritoSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FavoritoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseFavoritoSummary>> {
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
        return _r as __StrictHttpResponse<ResponseFavoritoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FavoritoByIdGet(id: string): __Observable<ResponseFavoritoSummary> {
    return this.ApiV1FavoritoByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseFavoritoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1FavoritoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
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
  ApiV1FavoritoByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1FavoritoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module FavoritoService {
}

export { FavoritoService }
