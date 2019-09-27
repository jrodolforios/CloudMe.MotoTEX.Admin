/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FaixaDescontoSummary } from '../models/faixa-desconto-summary';
@Injectable({
  providedIn: 'root',
})
class FaixaDescontoService extends __BaseService {
  static readonly ApiV1FaixaDescontoGetPath = '/api/v1/FaixaDesconto';
  static readonly ApiV1FaixaDescontoPutPath = '/api/v1/FaixaDesconto';
  static readonly ApiV1FaixaDescontoPostPath = '/api/v1/FaixaDesconto';
  static readonly ApiV1FaixaDescontoByIdGetPath = '/api/v1/FaixaDesconto/{id}';
  static readonly ApiV1FaixaDescontoByIdDeletePath = '/api/v1/FaixaDesconto/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1FaixaDescontoGetResponse(): __Observable<__StrictHttpResponse<Array<FaixaDescontoSummary>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FaixaDesconto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<FaixaDescontoSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1FaixaDescontoGet(): __Observable<Array<FaixaDescontoSummary>> {
    return this.ApiV1FaixaDescontoGetResponse().pipe(
      __map(_r => _r.body as Array<FaixaDescontoSummary>)
    );
  }

  /**
   * @param faixaDescontoSummary Modified FaixaDesconto list's properties summary
   * @return Success
   */
  ApiV1FaixaDescontoPutResponse(faixaDescontoSummary?: FaixaDescontoSummary): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = faixaDescontoSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/FaixaDesconto`,
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
   * @param faixaDescontoSummary Modified FaixaDesconto list's properties summary
   * @return Success
   */
  ApiV1FaixaDescontoPut(faixaDescontoSummary?: FaixaDescontoSummary): __Observable<boolean> {
    return this.ApiV1FaixaDescontoPutResponse(faixaDescontoSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param faixaDescontoSummary FaixaDesconto's summary
   * @return Success
   */
  ApiV1FaixaDescontoPostResponse(faixaDescontoSummary?: FaixaDescontoSummary): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = faixaDescontoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/FaixaDesconto`,
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
   * @param faixaDescontoSummary FaixaDesconto's summary
   * @return Success
   */
  ApiV1FaixaDescontoPost(faixaDescontoSummary?: FaixaDescontoSummary): __Observable<string> {
    return this.ApiV1FaixaDescontoPostResponse(faixaDescontoSummary).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FaixaDescontoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<FaixaDescontoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FaixaDesconto/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FaixaDescontoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FaixaDescontoByIdGet(id: string): __Observable<FaixaDescontoSummary> {
    return this.ApiV1FaixaDescontoByIdGetResponse(id).pipe(
      __map(_r => _r.body as FaixaDescontoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1FaixaDescontoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/FaixaDesconto/${id}`,
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
  ApiV1FaixaDescontoByIdDelete(id: string): __Observable<boolean> {
    return this.ApiV1FaixaDescontoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module FaixaDescontoService {
}

export { FaixaDescontoService }
