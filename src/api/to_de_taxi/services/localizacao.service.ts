/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { LocalizacaoSummary } from '../models/localizacao-summary';
@Injectable({
  providedIn: 'root',
})
class LocalizacaoService extends __BaseService {
  static readonly ApiV1LocalizacaoGetPath = '/api/v1/Localizacao';
  static readonly ApiV1LocalizacaoPutPath = '/api/v1/Localizacao';
  static readonly ApiV1LocalizacaoPostPath = '/api/v1/Localizacao';
  static readonly ApiV1LocalizacaoByIdGetPath = '/api/v1/Localizacao/{id}';
  static readonly ApiV1LocalizacaoByIdDeletePath = '/api/v1/Localizacao/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1LocalizacaoGetResponse(): __Observable<__StrictHttpResponse<Array<LocalizacaoSummary>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Localizacao`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<LocalizacaoSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1LocalizacaoGet(): __Observable<Array<LocalizacaoSummary>> {
    return this.ApiV1LocalizacaoGetResponse().pipe(
      __map(_r => _r.body as Array<LocalizacaoSummary>)
    );
  }

  /**
   * @param localizacaoSummary Modified Localizacao list's properties summary
   * @return Success
   */
  ApiV1LocalizacaoPutResponse(localizacaoSummary?: LocalizacaoSummary): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = localizacaoSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Localizacao`,
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
   * @param localizacaoSummary Modified Localizacao list's properties summary
   * @return Success
   */
  ApiV1LocalizacaoPut(localizacaoSummary?: LocalizacaoSummary): __Observable<boolean> {
    return this.ApiV1LocalizacaoPutResponse(localizacaoSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param localizacaoSummary Localizacao's summary
   */
  ApiV1LocalizacaoPostResponse(localizacaoSummary?: LocalizacaoSummary): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = localizacaoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Localizacao`,
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
   * @param localizacaoSummary Localizacao's summary
   */
  ApiV1LocalizacaoPost(localizacaoSummary?: LocalizacaoSummary): __Observable<null> {
    return this.ApiV1LocalizacaoPostResponse(localizacaoSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1LocalizacaoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<LocalizacaoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Localizacao/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<LocalizacaoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1LocalizacaoByIdGet(id: string): __Observable<LocalizacaoSummary> {
    return this.ApiV1LocalizacaoByIdGetResponse(id).pipe(
      __map(_r => _r.body as LocalizacaoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1LocalizacaoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Localizacao/${id}`,
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
  ApiV1LocalizacaoByIdDelete(id: string): __Observable<boolean> {
    return this.ApiV1LocalizacaoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module LocalizacaoService {
}

export { LocalizacaoService }
