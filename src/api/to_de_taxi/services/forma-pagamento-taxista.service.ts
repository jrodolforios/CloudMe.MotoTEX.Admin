/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableFormaPagamentoTaxistaSummary } from '../models/response-ienumerable-forma-pagamento-taxista-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { FormaPagamentoTaxistaSummary } from '../models/forma-pagamento-taxista-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseFormaPagamentoTaxistaSummary } from '../models/response-forma-pagamento-taxista-summary';
import { ResponseListFormaPagamentoTaxistaSummary } from '../models/response-list-forma-pagamento-taxista-summary';
@Injectable({
  providedIn: 'root',
})
class FormaPagamentoTaxistaService extends __BaseService {
  static readonly ApiV1FormaPagamentoTaxistaGetPath = '/api/v1/FormaPagamentoTaxista';
  static readonly ApiV1FormaPagamentoTaxistaPutPath = '/api/v1/FormaPagamentoTaxista';
  static readonly ApiV1FormaPagamentoTaxistaPostPath = '/api/v1/FormaPagamentoTaxista';
  static readonly ApiV1FormaPagamentoTaxistaByIdGetPath = '/api/v1/FormaPagamentoTaxista/{id}';
  static readonly ApiV1FormaPagamentoTaxistaByIdDeletePath = '/api/v1/FormaPagamentoTaxista/{id}';
  static readonly ApiV1FormaPagamentoTaxistaConsultaIdTaxistaByIdGetPath = '/api/v1/FormaPagamentoTaxista/consulta_id_taxista/{id}';
  static readonly ApiV1FormaPagamentoTaxistaDeletarPorTaxistaByIdDeletePath = '/api/v1/FormaPagamentoTaxista/Deletar_por_taxista/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableFormaPagamentoTaxistaSummary>> {
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
        return _r as __StrictHttpResponse<ResponseIEnumerableFormaPagamentoTaxistaSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaGet(): __Observable<ResponseIEnumerableFormaPagamentoTaxistaSummary> {
    return this.ApiV1FormaPagamentoTaxistaGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableFormaPagamentoTaxistaSummary)
    );
  }

  /**
   * @param FormaPagamentoTaxistaSummary Modified FormaPagamentoTaxista list's properties summary
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaPutResponse(FormaPagamentoTaxistaSummary?: FormaPagamentoTaxistaSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FormaPagamentoTaxistaSummary;
    let req = new HttpRequest<any>(
      'PUT',
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
        return _r as __StrictHttpResponse<ResponseBoolean>;
      })
    );
  }
  /**
   * @param FormaPagamentoTaxistaSummary Modified FormaPagamentoTaxista list's properties summary
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaPut(FormaPagamentoTaxistaSummary?: FormaPagamentoTaxistaSummary): __Observable<ResponseBoolean> {
    return this.ApiV1FormaPagamentoTaxistaPutResponse(FormaPagamentoTaxistaSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param FormaPagamentoTaxistaSummary FormaPagamentoTaxista's summary
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaPostResponse(FormaPagamentoTaxistaSummary?: FormaPagamentoTaxistaSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FormaPagamentoTaxistaSummary;
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
        return _r as __StrictHttpResponse<ResponseGuid>;
      })
    );
  }
  /**
   * @param FormaPagamentoTaxistaSummary FormaPagamentoTaxista's summary
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaPost(FormaPagamentoTaxistaSummary?: FormaPagamentoTaxistaSummary): __Observable<ResponseGuid> {
    return this.ApiV1FormaPagamentoTaxistaPostResponse(FormaPagamentoTaxistaSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseFormaPagamentoTaxistaSummary>> {
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
        return _r as __StrictHttpResponse<ResponseFormaPagamentoTaxistaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaByIdGet(id: string): __Observable<ResponseFormaPagamentoTaxistaSummary> {
    return this.ApiV1FormaPagamentoTaxistaByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseFormaPagamentoTaxistaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
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
  ApiV1FormaPagamentoTaxistaByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1FormaPagamentoTaxistaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param id Id from taxist
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaConsultaIdTaxistaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseListFormaPagamentoTaxistaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FormaPagamentoTaxista/consulta_id_taxista/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseListFormaPagamentoTaxistaSummary>;
      })
    );
  }
  /**
   * @param id Id from taxist
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaConsultaIdTaxistaByIdGet(id: string): __Observable<ResponseListFormaPagamentoTaxistaSummary> {
    return this.ApiV1FormaPagamentoTaxistaConsultaIdTaxistaByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseListFormaPagamentoTaxistaSummary)
    );
  }

  /**
   * @param id Id from taxist
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaDeletarPorTaxistaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/FormaPagamentoTaxista/Deletar_por_taxista/${id}`,
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
   * @param id Id from taxist
   * @return Success
   */
  ApiV1FormaPagamentoTaxistaDeletarPorTaxistaByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1FormaPagamentoTaxistaDeletarPorTaxistaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module FormaPagamentoTaxistaService {
}

export { FormaPagamentoTaxistaService }
