/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableFaixaDescontoTaxistaSummary } from '../models/response-ienumerable-faixa-desconto-taxista-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { FaixaDescontoTaxistaSummary } from '../models/faixa-desconto-taxista-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseFaixaDescontoTaxistaSummary } from '../models/response-faixa-desconto-taxista-summary';
import { ResponseListFaixaDescontoTaxistaSummary } from '../models/response-list-faixa-desconto-taxista-summary';
@Injectable({
  providedIn: 'root',
})
class FaixaDescontoTaxistaService extends __BaseService {
  static readonly ApiV1FaixaDescontoTaxistaGetPath = '/api/v1/FaixaDescontoTaxista';
  static readonly ApiV1FaixaDescontoTaxistaPutPath = '/api/v1/FaixaDescontoTaxista';
  static readonly ApiV1FaixaDescontoTaxistaPostPath = '/api/v1/FaixaDescontoTaxista';
  static readonly ApiV1FaixaDescontoTaxistaByIdGetPath = '/api/v1/FaixaDescontoTaxista/{id}';
  static readonly ApiV1FaixaDescontoTaxistaByIdDeletePath = '/api/v1/FaixaDescontoTaxista/{id}';
  static readonly ApiV1FaixaDescontoTaxistaConsultaIdTaxistaByIdGetPath = '/api/v1/FaixaDescontoTaxista/consulta_id_taxista/{id}';
  static readonly ApiV1FaixaDescontoTaxistaDeletarPorTaxistaByIdDeletePath = '/api/v1/FaixaDescontoTaxista/Deletar_por_taxista/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableFaixaDescontoTaxistaSummary>> {
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
        return _r as __StrictHttpResponse<ResponseIEnumerableFaixaDescontoTaxistaSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaGet(): __Observable<ResponseIEnumerableFaixaDescontoTaxistaSummary> {
    return this.ApiV1FaixaDescontoTaxistaGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableFaixaDescontoTaxistaSummary)
    );
  }

  /**
   * @param FaixaDescontoTaxistaSummary Modified FaixaDescontoTaxista list's properties summary
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaPutResponse(FaixaDescontoTaxistaSummary?: FaixaDescontoTaxistaSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FaixaDescontoTaxistaSummary;
    let req = new HttpRequest<any>(
      'PUT',
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
        return _r as __StrictHttpResponse<ResponseBoolean>;
      })
    );
  }
  /**
   * @param FaixaDescontoTaxistaSummary Modified FaixaDescontoTaxista list's properties summary
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaPut(FaixaDescontoTaxistaSummary?: FaixaDescontoTaxistaSummary): __Observable<ResponseBoolean> {
    return this.ApiV1FaixaDescontoTaxistaPutResponse(FaixaDescontoTaxistaSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param FaixaDescontoTaxistaSummary FaixaDescontoTaxista's summary
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaPostResponse(FaixaDescontoTaxistaSummary?: FaixaDescontoTaxistaSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FaixaDescontoTaxistaSummary;
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
        return _r as __StrictHttpResponse<ResponseGuid>;
      })
    );
  }
  /**
   * @param FaixaDescontoTaxistaSummary FaixaDescontoTaxista's summary
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaPost(FaixaDescontoTaxistaSummary?: FaixaDescontoTaxistaSummary): __Observable<ResponseGuid> {
    return this.ApiV1FaixaDescontoTaxistaPostResponse(FaixaDescontoTaxistaSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseFaixaDescontoTaxistaSummary>> {
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
        return _r as __StrictHttpResponse<ResponseFaixaDescontoTaxistaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaByIdGet(id: string): __Observable<ResponseFaixaDescontoTaxistaSummary> {
    return this.ApiV1FaixaDescontoTaxistaByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseFaixaDescontoTaxistaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
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
  ApiV1FaixaDescontoTaxistaByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1FaixaDescontoTaxistaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param id Id from taxist
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaConsultaIdTaxistaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseListFaixaDescontoTaxistaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/FaixaDescontoTaxista/consulta_id_taxista/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseListFaixaDescontoTaxistaSummary>;
      })
    );
  }
  /**
   * @param id Id from taxist
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaConsultaIdTaxistaByIdGet(id: string): __Observable<ResponseListFaixaDescontoTaxistaSummary> {
    return this.ApiV1FaixaDescontoTaxistaConsultaIdTaxistaByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseListFaixaDescontoTaxistaSummary)
    );
  }

  /**
   * @param id Id from taxist
   * @return Success
   */
  ApiV1FaixaDescontoTaxistaDeletarPorTaxistaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/FaixaDescontoTaxista/Deletar_por_taxista/${id}`,
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
  ApiV1FaixaDescontoTaxistaDeletarPorTaxistaByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1FaixaDescontoTaxistaDeletarPorTaxistaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module FaixaDescontoTaxistaService {
}

export { FaixaDescontoTaxistaService }
