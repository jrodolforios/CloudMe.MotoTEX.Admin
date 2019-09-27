/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FotoSummary } from '../models/foto-summary';
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
  ApiV1FotoGetResponse(): __Observable<__StrictHttpResponse<Array<FotoSummary>>> {
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
        return _r as __StrictHttpResponse<Array<FotoSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1FotoGet(): __Observable<Array<FotoSummary>> {
    return this.ApiV1FotoGetResponse().pipe(
      __map(_r => _r.body as Array<FotoSummary>)
    );
  }

  /**
   * @param FotoSummary Modified Foto list's properties summary
   * @return Success
   */
  ApiV1FotoPutResponse(FotoSummary?: FotoSummary): __Observable<__StrictHttpResponse<string>> {
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
   * @param FotoSummary Modified Foto list's properties summary
   * @return Success
   */
  ApiV1FotoPut(FotoSummary?: FotoSummary): __Observable<string> {
    return this.ApiV1FotoPutResponse(FotoSummary).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param fotoSummary Corrida's summary
   * @return Success
   */
  ApiV1FotoPostResponse(fotoSummary?: FotoSummary): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fotoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Foto`,
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
   * @param fotoSummary Corrida's summary
   * @return Success
   */
  ApiV1FotoPost(fotoSummary?: FotoSummary): __Observable<string> {
    return this.ApiV1FotoPostResponse(fotoSummary).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FotoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<FotoSummary>> {
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
        return _r as __StrictHttpResponse<FotoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FotoByIdGet(id: string): __Observable<FotoSummary> {
    return this.ApiV1FotoByIdGetResponse(id).pipe(
      __map(_r => _r.body as FotoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1FotoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
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
  ApiV1FotoByIdDelete(id: string): __Observable<boolean> {
    return this.ApiV1FotoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
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
