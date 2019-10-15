/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableTaxistaSummary } from '../models/response-ienumerable-taxista-summary';
import { ResponseTaxistaSummary } from '../models/response-taxista-summary';
import { TaxistaSummary } from '../models/taxista-summary';
import { ResponseBoolean } from '../models/response-boolean';
@Injectable({
  providedIn: 'root',
})
class TaxistaService extends __BaseService {
  static readonly ApiV1TaxistaGetPath = '/api/v1/Taxista';
  static readonly ApiV1TaxistaPutPath = '/api/v1/Taxista';
  static readonly ApiV1TaxistaPostPath = '/api/v1/Taxista';
  static readonly ApiV1TaxistaByIdGetPath = '/api/v1/Taxista/{id}';
  static readonly ApiV1TaxistaByIdDeletePath = '/api/v1/Taxista/{id}';
  static readonly ApiV1TaxistaAssociarFotoByIdPostPath = '/api/v1/Taxista/associar_foto/{id}';
  static readonly ApiV1TaxistaAtivarByIdPostPath = '/api/v1/Taxista/ativar/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1TaxistaGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableTaxistaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Taxista`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableTaxistaSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1TaxistaGet(): __Observable<ResponseIEnumerableTaxistaSummary> {
    return this.ApiV1TaxistaGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableTaxistaSummary)
    );
  }

  /**
   * @param taxistaSummary Modified Taxista list's properties summary
   * @return Success
   */
  ApiV1TaxistaPutResponse(taxistaSummary?: TaxistaSummary): __Observable<__StrictHttpResponse<ResponseTaxistaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = taxistaSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Taxista`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseTaxistaSummary>;
      })
    );
  }
  /**
   * @param taxistaSummary Modified Taxista list's properties summary
   * @return Success
   */
  ApiV1TaxistaPut(taxistaSummary?: TaxistaSummary): __Observable<ResponseTaxistaSummary> {
    return this.ApiV1TaxistaPutResponse(taxistaSummary).pipe(
      __map(_r => _r.body as ResponseTaxistaSummary)
    );
  }

  /**
   * @param taxistaSummary Taxista's summary
   * @return Success
   */
  ApiV1TaxistaPostResponse(taxistaSummary?: TaxistaSummary): __Observable<__StrictHttpResponse<ResponseTaxistaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = taxistaSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Taxista`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseTaxistaSummary>;
      })
    );
  }
  /**
   * @param taxistaSummary Taxista's summary
   * @return Success
   */
  ApiV1TaxistaPost(taxistaSummary?: TaxistaSummary): __Observable<ResponseTaxistaSummary> {
    return this.ApiV1TaxistaPostResponse(taxistaSummary).pipe(
      __map(_r => _r.body as ResponseTaxistaSummary)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1TaxistaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseTaxistaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Taxista/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseTaxistaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1TaxistaByIdGet(id: string): __Observable<ResponseTaxistaSummary> {
    return this.ApiV1TaxistaByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseTaxistaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1TaxistaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Taxista/${id}`,
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
  ApiV1TaxistaByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1TaxistaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param params The `TaxistaService.ApiV1TaxistaAssociarFotoByIdPostParams` containing the following parameters:
   *
   * - `id`: ID do usuário
   *
   * - `idFoto`: ID da foto
   *
   * @return Success
   */
  ApiV1TaxistaAssociarFotoByIdPostResponse(params: TaxistaService.ApiV1TaxistaAssociarFotoByIdPostParams): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.idFoto != null) __params = __params.set('idFoto', params.idFoto.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Taxista/associar_foto/${params.id}`,
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
   * @param params The `TaxistaService.ApiV1TaxistaAssociarFotoByIdPostParams` containing the following parameters:
   *
   * - `id`: ID do usuário
   *
   * - `idFoto`: ID da foto
   *
   * @return Success
   */
  ApiV1TaxistaAssociarFotoByIdPost(params: TaxistaService.ApiV1TaxistaAssociarFotoByIdPostParams): __Observable<ResponseBoolean> {
    return this.ApiV1TaxistaAssociarFotoByIdPostResponse(params).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param params The `TaxistaService.ApiV1TaxistaAtivarByIdPostParams` containing the following parameters:
   *
   * - `id`: ID do usuário
   *
   * - `ativar`:
   *
   * @return Success
   */
  ApiV1TaxistaAtivarByIdPostResponse(params: TaxistaService.ApiV1TaxistaAtivarByIdPostParams): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.ativar != null) __params = __params.set('ativar', params.ativar.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Taxista/ativar/${params.id}`,
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
   * @param params The `TaxistaService.ApiV1TaxistaAtivarByIdPostParams` containing the following parameters:
   *
   * - `id`: ID do usuário
   *
   * - `ativar`:
   *
   * @return Success
   */
  ApiV1TaxistaAtivarByIdPost(params: TaxistaService.ApiV1TaxistaAtivarByIdPostParams): __Observable<ResponseBoolean> {
    return this.ApiV1TaxistaAtivarByIdPostResponse(params).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module TaxistaService {

  /**
   * Parameters for ApiV1TaxistaAssociarFotoByIdPost
   */
  export interface ApiV1TaxistaAssociarFotoByIdPostParams {

    /**
     * ID do usuário
     */
    id: string;

    /**
     * ID da foto
     */
    idFoto?: string;
  }

  /**
   * Parameters for ApiV1TaxistaAtivarByIdPost
   */
  export interface ApiV1TaxistaAtivarByIdPostParams {

    /**
     * ID do usuário
     */
    id: string;
    ativar?: boolean;
  }
}

export { TaxistaService }
