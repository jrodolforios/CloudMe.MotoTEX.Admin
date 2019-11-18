/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableContratoSummary } from '../models/response-ienumerable-contrato-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { ContratoSummary } from '../models/contrato-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseContratoSummary } from '../models/response-contrato-summary';
@Injectable({
  providedIn: 'root',
})
class ContratoService extends __BaseService {
  static readonly ApiV1ContratoGetPath = '/api/v1/Contrato';
  static readonly ApiV1ContratoPutPath = '/api/v1/Contrato';
  static readonly ApiV1ContratoPostPath = '/api/v1/Contrato';
  static readonly ApiV1ContratoByIdGetPath = '/api/v1/Contrato/{id}';
  static readonly ApiV1ContratoByIdDeletePath = '/api/v1/Contrato/{id}';
  static readonly ApiV1ContratoUltimoContratoValidoPostPath = '/api/v1/Contrato/Ultimo_contrato_valido';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1ContratoGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableContratoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Contrato`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableContratoSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1ContratoGet(): __Observable<ResponseIEnumerableContratoSummary> {
    return this.ApiV1ContratoGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableContratoSummary)
    );
  }

  /**
   * @param ContratoSUmmary Modified Contrato list's properties summary
   * @return Success
   */
  ApiV1ContratoPutResponse(ContratoSUmmary?: ContratoSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ContratoSUmmary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Contrato`,
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
   * @param ContratoSUmmary Modified Contrato list's properties summary
   * @return Success
   */
  ApiV1ContratoPut(ContratoSUmmary?: ContratoSummary): __Observable<ResponseBoolean> {
    return this.ApiV1ContratoPutResponse(ContratoSUmmary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param ContratoSummary Contrato's summary
   * @return Success
   */
  ApiV1ContratoPostResponse(ContratoSummary?: ContratoSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ContratoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Contrato`,
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
   * @param ContratoSummary Contrato's summary
   * @return Success
   */
  ApiV1ContratoPost(ContratoSummary?: ContratoSummary): __Observable<ResponseGuid> {
    return this.ApiV1ContratoPostResponse(ContratoSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1ContratoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseContratoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Contrato/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseContratoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1ContratoByIdGet(id: string): __Observable<ResponseContratoSummary> {
    return this.ApiV1ContratoByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseContratoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1ContratoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Contrato/${id}`,
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
  ApiV1ContratoByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1ContratoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @return Success
   */
  ApiV1ContratoUltimoContratoValidoPostResponse(): __Observable<__StrictHttpResponse<ResponseContratoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Contrato/Ultimo_contrato_valido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseContratoSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1ContratoUltimoContratoValidoPost(): __Observable<ResponseContratoSummary> {
    return this.ApiV1ContratoUltimoContratoValidoPostResponse().pipe(
      __map(_r => _r.body as ResponseContratoSummary)
    );
  }
}

module ContratoService {
}

export { ContratoService }
