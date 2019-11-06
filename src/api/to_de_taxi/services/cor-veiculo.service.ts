/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableCorVeiculoSummary } from '../models/response-ienumerable-cor-veiculo-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { CorVeiculoSummary } from '../models/cor-veiculo-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseCorVeiculoSummary } from '../models/response-cor-veiculo-summary';
@Injectable({
  providedIn: 'root',
})
class CorVeiculoService extends __BaseService {
  static readonly ApiV1CorVeiculoGetPath = '/api/v1/CorVeiculo';
  static readonly ApiV1CorVeiculoPutPath = '/api/v1/CorVeiculo';
  static readonly ApiV1CorVeiculoPostPath = '/api/v1/CorVeiculo';
  static readonly ApiV1CorVeiculoByIdGetPath = '/api/v1/CorVeiculo/{id}';
  static readonly ApiV1CorVeiculoByIdDeletePath = '/api/v1/CorVeiculo/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1CorVeiculoGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableCorVeiculoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/CorVeiculo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableCorVeiculoSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1CorVeiculoGet(): __Observable<ResponseIEnumerableCorVeiculoSummary> {
    return this.ApiV1CorVeiculoGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableCorVeiculoSummary)
    );
  }

  /**
   * @param CorVeiculoSummary Modified CorVeiculo list's properties summary
   * @return Success
   */
  ApiV1CorVeiculoPutResponse(CorVeiculoSummary?: CorVeiculoSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CorVeiculoSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/CorVeiculo`,
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
   * @param CorVeiculoSummary Modified CorVeiculo list's properties summary
   * @return Success
   */
  ApiV1CorVeiculoPut(CorVeiculoSummary?: CorVeiculoSummary): __Observable<ResponseBoolean> {
    return this.ApiV1CorVeiculoPutResponse(CorVeiculoSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param CorVeiculoSummary CorVeiculo's summary
   * @return Success
   */
  ApiV1CorVeiculoPostResponse(CorVeiculoSummary?: CorVeiculoSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CorVeiculoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/CorVeiculo`,
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
   * @param CorVeiculoSummary CorVeiculo's summary
   * @return Success
   */
  ApiV1CorVeiculoPost(CorVeiculoSummary?: CorVeiculoSummary): __Observable<ResponseGuid> {
    return this.ApiV1CorVeiculoPostResponse(CorVeiculoSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1CorVeiculoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseCorVeiculoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/CorVeiculo/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseCorVeiculoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1CorVeiculoByIdGet(id: string): __Observable<ResponseCorVeiculoSummary> {
    return this.ApiV1CorVeiculoByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseCorVeiculoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1CorVeiculoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/CorVeiculo/${id}`,
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
  ApiV1CorVeiculoByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1CorVeiculoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module CorVeiculoService {
}

export { CorVeiculoService }
