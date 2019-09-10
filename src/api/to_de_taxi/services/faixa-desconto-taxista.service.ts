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
  static readonly GetAllPath = '/api/v1/FaixaDescontoTaxista';
  static readonly PutPath = '/api/v1/FaixaDescontoTaxista';
  static readonly PostPath = '/api/v1/FaixaDescontoTaxista';
  static readonly GetPath = '/api/v1/FaixaDescontoTaxista/{id}';
  static readonly DeletePath = '/api/v1/FaixaDescontoTaxista/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  GetAllResponse(): __Observable<__StrictHttpResponse<Array<FaixaDescontoTaxistaSummary>>> {
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
  GetAll(): __Observable<Array<FaixaDescontoTaxistaSummary>> {
    return this.GetAllResponse().pipe(
      __map(_r => _r.body as Array<FaixaDescontoTaxistaSummary>)
    );
  }

  /**
   * @param faixaDescontoTaxistaSummary Modified FaixaDescontoTaxista list's properties summary
   * @return Success
   */
  PutResponse(faixaDescontoTaxistaSummary?: FaixaDescontoTaxistaSummary): __Observable<__StrictHttpResponse<boolean>> {
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
  Put(faixaDescontoTaxistaSummary?: FaixaDescontoTaxistaSummary): __Observable<boolean> {
    return this.PutResponse(faixaDescontoTaxistaSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param faixaDescontoTaxistaSummary FaixaDescontoTaxista's summary
   */
  PostResponse(faixaDescontoTaxistaSummary?: FaixaDescontoTaxistaSummary): __Observable<__StrictHttpResponse<null>> {
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
  Post(faixaDescontoTaxistaSummary?: FaixaDescontoTaxistaSummary): __Observable<null> {
    return this.PostResponse(faixaDescontoTaxistaSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  GetResponse(id: string): __Observable<__StrictHttpResponse<FaixaDescontoTaxistaSummary>> {
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
  Get(id: string): __Observable<FaixaDescontoTaxistaSummary> {
    return this.GetResponse(id).pipe(
      __map(_r => _r.body as FaixaDescontoTaxistaSummary)
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
  Delete(id: string): __Observable<boolean> {
    return this.DeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module FaixaDescontoTaxistaService {
}

export { FaixaDescontoTaxistaService }
