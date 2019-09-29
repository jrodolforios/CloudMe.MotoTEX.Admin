/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableVeiculoTaxistaSummary } from '../models/response-ienumerable-veiculo-taxista-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { VeiculoTaxistaSummary } from '../models/veiculo-taxista-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseVeiculoTaxistaSummary } from '../models/response-veiculo-taxista-summary';
@Injectable({
  providedIn: 'root',
})
class VeiculoTaxistaService extends __BaseService {
  static readonly ApiV1VeiculoTaxistaGetPath = '/api/v1/VeiculoTaxista';
  static readonly ApiV1VeiculoTaxistaPutPath = '/api/v1/VeiculoTaxista';
  static readonly ApiV1VeiculoTaxistaPostPath = '/api/v1/VeiculoTaxista';
  static readonly ApiV1VeiculoTaxistaByIdGetPath = '/api/v1/VeiculoTaxista/{id}';
  static readonly ApiV1VeiculoTaxistaByIdDeletePath = '/api/v1/VeiculoTaxista/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1VeiculoTaxistaGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableVeiculoTaxistaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/VeiculoTaxista`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableVeiculoTaxistaSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1VeiculoTaxistaGet(): __Observable<ResponseIEnumerableVeiculoTaxistaSummary> {
    return this.ApiV1VeiculoTaxistaGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableVeiculoTaxistaSummary)
    );
  }

  /**
   * @param VeiculoTaxistaSummary Modified VeiculoTaxista list's properties summary
   * @return Success
   */
  ApiV1VeiculoTaxistaPutResponse(VeiculoTaxistaSummary?: VeiculoTaxistaSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = VeiculoTaxistaSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/VeiculoTaxista`,
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
   * @param VeiculoTaxistaSummary Modified VeiculoTaxista list's properties summary
   * @return Success
   */
  ApiV1VeiculoTaxistaPut(VeiculoTaxistaSummary?: VeiculoTaxistaSummary): __Observable<ResponseBoolean> {
    return this.ApiV1VeiculoTaxistaPutResponse(VeiculoTaxistaSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param VeiculoTaxistaSummary VeiculoTaxista's summary
   * @return Success
   */
  ApiV1VeiculoTaxistaPostResponse(VeiculoTaxistaSummary?: VeiculoTaxistaSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = VeiculoTaxistaSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/VeiculoTaxista`,
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
   * @param VeiculoTaxistaSummary VeiculoTaxista's summary
   * @return Success
   */
  ApiV1VeiculoTaxistaPost(VeiculoTaxistaSummary?: VeiculoTaxistaSummary): __Observable<ResponseGuid> {
    return this.ApiV1VeiculoTaxistaPostResponse(VeiculoTaxistaSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1VeiculoTaxistaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseVeiculoTaxistaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/VeiculoTaxista/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseVeiculoTaxistaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1VeiculoTaxistaByIdGet(id: string): __Observable<ResponseVeiculoTaxistaSummary> {
    return this.ApiV1VeiculoTaxistaByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseVeiculoTaxistaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1VeiculoTaxistaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/VeiculoTaxista/${id}`,
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
  ApiV1VeiculoTaxistaByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1VeiculoTaxistaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module VeiculoTaxistaService {
}

export { VeiculoTaxistaService }
