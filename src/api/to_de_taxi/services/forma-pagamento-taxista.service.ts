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
  static readonly ApiV1FormaPagamentoTaxistaGetPath = '/api/v1/FormaPagamentoTaxista';
  static readonly ApiV1FormaPagamentoTaxistaPutPath = '/api/v1/FormaPagamentoTaxista';
  static readonly ApiV1FormaPagamentoTaxistaPostPath = '/api/v1/FormaPagamentoTaxista';
  static readonly ApiV1FormaPagamentoTaxistaByIdGetPath = '/api/v1/FormaPagamentoTaxista/{id}';
  static readonly ApiV1FormaPagamentoTaxistaByIdDeletePath = '/api/v1/FormaPagamentoTaxista/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaGetResponse(): __Observable<__StrictHttpResponse<Array<FormaPagamentoTaxistaSummary>>> {
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
  ApiV1FormaPagamentoTaxistaGet(): __Observable<Array<FormaPagamentoTaxistaSummary>> {
    return this.ApiV1FormaPagamentoTaxistaGetResponse().pipe(
      __map(_r => _r.body as Array<FormaPagamentoTaxistaSummary>)
    );
  }

  /**
   * @param formaPagamentoTaxistaSummary Modified FormaPagamentoTaxista list's properties summary
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaPutResponse(formaPagamentoTaxistaSummary?: FormaPagamentoTaxistaSummary): __Observable<__StrictHttpResponse<boolean>> {
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
  ApiV1FormaPagamentoTaxistaPut(formaPagamentoTaxistaSummary?: FormaPagamentoTaxistaSummary): __Observable<boolean> {
    return this.ApiV1FormaPagamentoTaxistaPutResponse(formaPagamentoTaxistaSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param formaPagamentoTaxistaSummary FormaPagamentoTaxista's summary
   */
  ApiV1FormaPagamentoTaxistaPostResponse(formaPagamentoTaxistaSummary?: FormaPagamentoTaxistaSummary): __Observable<__StrictHttpResponse<null>> {
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
  ApiV1FormaPagamentoTaxistaPost(formaPagamentoTaxistaSummary?: FormaPagamentoTaxistaSummary): __Observable<null> {
    return this.ApiV1FormaPagamentoTaxistaPostResponse(formaPagamentoTaxistaSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<FormaPagamentoTaxistaSummary>> {
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
  ApiV1FormaPagamentoTaxistaByIdGet(id: string): __Observable<FormaPagamentoTaxistaSummary> {
    return this.ApiV1FormaPagamentoTaxistaByIdGetResponse(id).pipe(
      __map(_r => _r.body as FormaPagamentoTaxistaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
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
  ApiV1FormaPagamentoTaxistaByIdDelete(id: string): __Observable<boolean> {
    return this.ApiV1FormaPagamentoTaxistaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module FormaPagamentoTaxistaService {
}

export { FormaPagamentoTaxistaService }
