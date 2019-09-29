/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableVeiculoSummary } from '../models/response-ienumerable-veiculo-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { VeiculoSummary } from '../models/veiculo-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseVeiculoSummary } from '../models/response-veiculo-summary';
@Injectable({
  providedIn: 'root',
})
class VeiculoService extends __BaseService {
  static readonly ApiV1VeiculoGetPath = '/api/v1/Veiculo';
  static readonly ApiV1VeiculoPutPath = '/api/v1/Veiculo';
  static readonly ApiV1VeiculoPostPath = '/api/v1/Veiculo';
  static readonly ApiV1VeiculoByIdGetPath = '/api/v1/Veiculo/{id}';
  static readonly ApiV1VeiculoByIdDeletePath = '/api/v1/Veiculo/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1VeiculoGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableVeiculoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Veiculo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableVeiculoSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1VeiculoGet(): __Observable<ResponseIEnumerableVeiculoSummary> {
    return this.ApiV1VeiculoGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableVeiculoSummary)
    );
  }

  /**
   * @param VeiculoSummary Modified Veiculo list's properties summary
   * @return Success
   */
  ApiV1VeiculoPutResponse(VeiculoSummary?: VeiculoSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = VeiculoSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Veiculo`,
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
   * @param VeiculoSummary Modified Veiculo list's properties summary
   * @return Success
   */
  ApiV1VeiculoPut(VeiculoSummary?: VeiculoSummary): __Observable<ResponseBoolean> {
    return this.ApiV1VeiculoPutResponse(VeiculoSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param VeiculoSummary Veiculo's summary
   * @return Success
   */
  ApiV1VeiculoPostResponse(VeiculoSummary?: VeiculoSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = VeiculoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Veiculo`,
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
   * @param VeiculoSummary Veiculo's summary
   * @return Success
   */
  ApiV1VeiculoPost(VeiculoSummary?: VeiculoSummary): __Observable<ResponseGuid> {
    return this.ApiV1VeiculoPostResponse(VeiculoSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1VeiculoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseVeiculoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Veiculo/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseVeiculoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1VeiculoByIdGet(id: string): __Observable<ResponseVeiculoSummary> {
    return this.ApiV1VeiculoByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseVeiculoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1VeiculoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Veiculo/${id}`,
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
  ApiV1VeiculoByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1VeiculoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module VeiculoService {
}

export { VeiculoService }
