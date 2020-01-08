/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableFotoSummary } from '../models/response-ienumerable-foto-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { FotoSummary } from '../models/foto-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseFotoSummary } from '../models/response-foto-summary';
@Injectable({
  providedIn: 'root',
})
class FotoService extends __BaseService {
  static readonly ApiV1FotoGetPath = '/api/v1/Foto';
  static readonly ApiV1FotoPutPath = '/api/v1/Foto';
  static readonly ApiV1FotoPostPath = '/api/v1/Foto';
  static readonly ApiV1FotoByIdGetPath = '/api/v1/Foto/{id}';
  static readonly ApiV1FotoByIdDeletePath = '/api/v1/Foto/{id}';
  static readonly ApiV1FotoUploadPostPath = '/api/v1/Foto/upload';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1FotoGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableFotoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Foto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableFotoSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1FotoGet(): __Observable<ResponseIEnumerableFotoSummary> {
    return this.ApiV1FotoGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableFotoSummary)
    );
  }

  /**
   * @param FotoSummary Modified Foto list's properties summary
   * @return Success
   */
  ApiV1FotoPutResponse(FotoSummary?: FotoSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FotoSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Foto`,
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
   * @param FotoSummary Modified Foto list's properties summary
   * @return Success
   */
  ApiV1FotoPut(FotoSummary?: FotoSummary): __Observable<ResponseBoolean> {
    return this.ApiV1FotoPutResponse(FotoSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param FotoSummary Foto's summary
   * @return Success
   */
  ApiV1FotoPostResponse(FotoSummary?: FotoSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FotoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Foto`,
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
   * @param FotoSummary Foto's summary
   * @return Success
   */
  ApiV1FotoPost(FotoSummary?: FotoSummary): __Observable<ResponseGuid> {
    return this.ApiV1FotoPostResponse(FotoSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FotoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseFotoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Foto/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseFotoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FotoByIdGet(id: string): __Observable<ResponseFotoSummary> {
    return this.ApiV1FotoByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseFotoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1FotoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Foto/${id}`,
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
  ApiV1FotoByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1FotoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param arquivo undefined
   * @return Success
   */
  ApiV1FotoUploadPostResponse(arquivo?: any): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (arquivo != null) __params = __params.set('arquivo', arquivo.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Foto/upload`,
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
   * @param arquivo undefined
   * @return Success
   */
  ApiV1FotoUploadPost(arquivo?: any): __Observable<string> {
    return this.ApiV1FotoUploadPostResponse(arquivo).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module FotoService {
}

export { FotoService }
