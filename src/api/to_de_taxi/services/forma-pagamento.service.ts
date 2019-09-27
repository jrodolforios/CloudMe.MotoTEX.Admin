/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FormaPagamentoSummary } from '../models/forma-pagamento-summary';
@Injectable({
  providedIn: 'root',
})
class FormaPagamentoService extends __BaseService {
  static readonly ApiV1FormaPagamentoGetPath = '/api/v1/FormaPagamento';
  static readonly ApiV1FormaPagamentoPutPath = '/api/v1/FormaPagamento';
  static readonly ApiV1FormaPagamentoPostPath = '/api/v1/FormaPagamento';
  static readonly ApiV1FormaPagamentoByIdGetPath = '/api/v1/FormaPagamento/{id}';
  static readonly ApiV1FormaPagamentoByIdDeletePath = '/api/v1/FormaPagamento/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1FormaPagamentoGetResponse(): __Observable<__StrictHttpResponse<Array<FormaPagamentoSummary>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FormaPagamento`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<FormaPagamentoSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1FormaPagamentoGet(): __Observable<Array<FormaPagamentoSummary>> {
    return this.ApiV1FormaPagamentoGetResponse().pipe(
      __map(_r => _r.body as Array<FormaPagamentoSummary>)
    );
  }

  /**
   * @param formaPagamentoSummary Modified FormaPagamento list's properties summary
   * @return Success
   */
  ApiV1FormaPagamentoPutResponse(formaPagamentoSummary?: FormaPagamentoSummary): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = formaPagamentoSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/FormaPagamento`,
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
   * @param formaPagamentoSummary Modified FormaPagamento list's properties summary
   * @return Success
   */
  ApiV1FormaPagamentoPut(formaPagamentoSummary?: FormaPagamentoSummary): __Observable<boolean> {
    return this.ApiV1FormaPagamentoPutResponse(formaPagamentoSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param formaPagamentoSummary FormaPagamento's summary
   */
  ApiV1FormaPagamentoPostResponse(formaPagamentoSummary?: FormaPagamentoSummary): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = formaPagamentoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/FormaPagamento`,
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
   * @param formaPagamentoSummary FormaPagamento's summary
   */
  ApiV1FormaPagamentoPost(formaPagamentoSummary?: FormaPagamentoSummary): __Observable<null> {
    return this.ApiV1FormaPagamentoPostResponse(formaPagamentoSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FormaPagamentoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<FormaPagamentoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FormaPagamento/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FormaPagamentoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FormaPagamentoByIdGet(id: string): __Observable<FormaPagamentoSummary> {
    return this.ApiV1FormaPagamentoByIdGetResponse(id).pipe(
      __map(_r => _r.body as FormaPagamentoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1FormaPagamentoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/FormaPagamento/${id}`,
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
  ApiV1FormaPagamentoByIdDelete(id: string): __Observable<boolean> {
    return this.ApiV1FormaPagamentoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module FormaPagamentoService {
}

export { FormaPagamentoService }
