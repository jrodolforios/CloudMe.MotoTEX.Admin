/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FaixaDescontoTaxistaSummary } from '../models/faixa-desconto-taxista-summary';
@Injectable({
  providedIn: 'root',
})
class FaixaDescontoTaxistaService extends __BaseService {
  static readonly ApiV1FaixaDescontoTaxistaGetPath = '/api/v1/FaixaDescontoTaxista';
  static readonly ApiV1FaixaDescontoTaxistaPutPath = '/api/v1/FaixaDescontoTaxista';
  static readonly ApiV1FaixaDescontoTaxistaPostPath = '/api/v1/FaixaDescontoTaxista';
  static readonly ApiV1FaixaDescontoTaxistaByIdGetPath = '/api/v1/FaixaDescontoTaxista/{id}';
  static readonly ApiV1FaixaDescontoTaxistaByIdDeletePath = '/api/v1/FaixaDescontoTaxista/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaGetResponse(): __Observable<__StrictHttpResponse<Array<FaixaDescontoTaxistaSummary>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FaixaDescontoTaxista`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<FaixaDescontoTaxistaSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaGet(): __Observable<Array<FaixaDescontoTaxistaSummary>> {
    return this.ApiV1FaixaDescontoTaxistaGetResponse().pipe(
      __map(_r => _r.body as Array<FaixaDescontoTaxistaSummary>)
    );
  }

  /**
   * @param faixaDescontoTaxistaSummary Modified FaixaDescontoTaxista list's properties summary
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaPutResponse(faixaDescontoTaxistaSummary?: FaixaDescontoTaxistaSummary): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = faixaDescontoTaxistaSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/FaixaDescontoTaxista`,
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
   * @param faixaDescontoTaxistaSummary Modified FaixaDescontoTaxista list's properties summary
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaPut(faixaDescontoTaxistaSummary?: FaixaDescontoTaxistaSummary): __Observable<boolean> {
    return this.ApiV1FaixaDescontoTaxistaPutResponse(faixaDescontoTaxistaSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param faixaDescontoTaxistaSummary FaixaDescontoTaxista's summary
   */
  ApiV1FaixaDescontoTaxistaPostResponse(faixaDescontoTaxistaSummary?: FaixaDescontoTaxistaSummary): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = faixaDescontoTaxistaSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/FaixaDescontoTaxista`,
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
   * @param faixaDescontoTaxistaSummary FaixaDescontoTaxista's summary
   */
  ApiV1FaixaDescontoTaxistaPost(faixaDescontoTaxistaSummary?: FaixaDescontoTaxistaSummary): __Observable<null> {
    return this.ApiV1FaixaDescontoTaxistaPostResponse(faixaDescontoTaxistaSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<FaixaDescontoTaxistaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FaixaDescontoTaxista/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FaixaDescontoTaxistaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaByIdGet(id: string): __Observable<FaixaDescontoTaxistaSummary> {
    return this.ApiV1FaixaDescontoTaxistaByIdGetResponse(id).pipe(
      __map(_r => _r.body as FaixaDescontoTaxistaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/FaixaDescontoTaxista/${id}`,
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
  ApiV1FaixaDescontoTaxistaByIdDelete(id: string): __Observable<boolean> {
    return this.ApiV1FaixaDescontoTaxistaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module FaixaDescontoTaxistaService {
}

export { FaixaDescontoTaxistaService }
