/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableFormaPagamentoSummary } from '../models/response-ienumerable-forma-pagamento-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { FormaPagamentoSummary } from '../models/forma-pagamento-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseFormaPagamentoSummary } from '../models/response-forma-pagamento-summary';
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
  ApiV1FormaPagamentoGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableFormaPagamentoSummary>> {
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
        return _r as __StrictHttpResponse<ResponseIEnumerableFormaPagamentoSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1FormaPagamentoGet(): __Observable<ResponseIEnumerableFormaPagamentoSummary> {
    return this.ApiV1FormaPagamentoGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableFormaPagamentoSummary)
    );
  }

  /**
   * @param FormaPagamentoSummary Modified FormaPagamento list's properties summary
   * @return Success
   */
  ApiV1FormaPagamentoPutResponse(FormaPagamentoSummary?: FormaPagamentoSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FormaPagamentoSummary;
    let req = new HttpRequest<any>(
      'PUT',
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
        return _r as __StrictHttpResponse<ResponseBoolean>;
      })
    );
  }
  /**
   * @param FormaPagamentoSummary Modified FormaPagamento list's properties summary
   * @return Success
   */
  ApiV1FormaPagamentoPut(FormaPagamentoSummary?: FormaPagamentoSummary): __Observable<ResponseBoolean> {
    return this.ApiV1FormaPagamentoPutResponse(FormaPagamentoSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param FormaPagamentoSummary FormaPagamento's summary
   * @return Success
   */
  ApiV1FormaPagamentoPostResponse(FormaPagamentoSummary?: FormaPagamentoSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FormaPagamentoSummary;
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
        return _r as __StrictHttpResponse<ResponseGuid>;
      })
    );
  }
  /**
   * @param FormaPagamentoSummary FormaPagamento's summary
   * @return Success
   */
  ApiV1FormaPagamentoPost(FormaPagamentoSummary?: FormaPagamentoSummary): __Observable<ResponseGuid> {
    return this.ApiV1FormaPagamentoPostResponse(FormaPagamentoSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FormaPagamentoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseFormaPagamentoSummary>> {
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
        return _r as __StrictHttpResponse<ResponseFormaPagamentoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FormaPagamentoByIdGet(id: string): __Observable<ResponseFormaPagamentoSummary> {
    return this.ApiV1FormaPagamentoByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseFormaPagamentoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1FormaPagamentoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
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
  ApiV1FormaPagamentoByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1FormaPagamentoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module FormaPagamentoService {
}

export { FormaPagamentoService }
