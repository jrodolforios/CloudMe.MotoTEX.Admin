/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FormaPagamentoTaxistaSummary } from '../models/forma-pagamento-taxista-summary';
@Injectable({
  providedIn: 'root',
})
class FormaPagamentoTaxistaService extends __BaseService {
  static readonly GetAllPath = '/api/v1/FormaPagamentoTaxista';
  static readonly PutPath = '/api/v1/FormaPagamentoTaxista';
  static readonly PostPath = '/api/v1/FormaPagamentoTaxista';
  static readonly GetPath = '/api/v1/FormaPagamentoTaxista/{id}';
  static readonly DeletePath = '/api/v1/FormaPagamentoTaxista/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  GetAllResponse(): __Observable<__StrictHttpResponse<Array<FormaPagamentoTaxistaSummary>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FormaPagamentoTaxista`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<FormaPagamentoTaxistaSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  GetAll(): __Observable<Array<FormaPagamentoTaxistaSummary>> {
    return this.GetAllResponse().pipe(
      __map(_r => _r.body as Array<FormaPagamentoTaxistaSummary>)
    );
  }

  /**
   * @param formaPagamentoTaxistaSummary Modified FormaPagamentoTaxista list's properties summary
   * @return Success
   */
  PutResponse(formaPagamentoTaxistaSummary?: FormaPagamentoTaxistaSummary): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = formaPagamentoTaxistaSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/FormaPagamentoTaxista`,
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
   * @param formaPagamentoTaxistaSummary Modified FormaPagamentoTaxista list's properties summary
   * @return Success
   */
  Put(formaPagamentoTaxistaSummary?: FormaPagamentoTaxistaSummary): __Observable<boolean> {
    return this.PutResponse(formaPagamentoTaxistaSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param formaPagamentoTaxistaSummary FormaPagamentoTaxista's summary
   */
  PostResponse(formaPagamentoTaxistaSummary?: FormaPagamentoTaxistaSummary): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = formaPagamentoTaxistaSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/FormaPagamentoTaxista`,
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
   * @param formaPagamentoTaxistaSummary FormaPagamentoTaxista's summary
   */
  Post(formaPagamentoTaxistaSummary?: FormaPagamentoTaxistaSummary): __Observable<null> {
    return this.PostResponse(formaPagamentoTaxistaSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  GetResponse(id: string): __Observable<__StrictHttpResponse<FormaPagamentoTaxistaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FormaPagamentoTaxista/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FormaPagamentoTaxistaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  Get(id: string): __Observable<FormaPagamentoTaxistaSummary> {
    return this.GetResponse(id).pipe(
      __map(_r => _r.body as FormaPagamentoTaxistaSummary)
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
      this.rootUrl + `/api/v1/FormaPagamentoTaxista/${id}`,
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

module FormaPagamentoTaxistaService {
}

export { FormaPagamentoTaxistaService }
