/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableSolicitacaoCorridaSummary } from '../models/response-ienumerable-solicitacao-corrida-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { SolicitacaoCorridaSummary } from '../models/solicitacao-corrida-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseSolicitacaoCorridaSummary } from '../models/response-solicitacao-corrida-summary';
@Injectable({
  providedIn: 'root',
})
class SolicitacaoCorridaService extends __BaseService {
  static readonly ApiV1SolicitacaoCorridaGetPath = '/api/v1/SolicitacaoCorrida';
  static readonly ApiV1SolicitacaoCorridaPutPath = '/api/v1/SolicitacaoCorrida';
  static readonly ApiV1SolicitacaoCorridaPostPath = '/api/v1/SolicitacaoCorrida';
  static readonly ApiV1SolicitacaoCorridaByIdGetPath = '/api/v1/SolicitacaoCorrida/{id}';
  static readonly ApiV1SolicitacaoCorridaByIdDeletePath = '/api/v1/SolicitacaoCorrida/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1SolicitacaoCorridaGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableSolicitacaoCorridaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/SolicitacaoCorrida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableSolicitacaoCorridaSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1SolicitacaoCorridaGet(): __Observable<ResponseIEnumerableSolicitacaoCorridaSummary> {
    return this.ApiV1SolicitacaoCorridaGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableSolicitacaoCorridaSummary)
    );
  }

  /**
   * @param SolicitacaoCorridaSummary Modified SolicitacaoCorrida list's properties summary
   * @return Success
   */
  ApiV1SolicitacaoCorridaPutResponse(SolicitacaoCorridaSummary?: SolicitacaoCorridaSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = SolicitacaoCorridaSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/SolicitacaoCorrida`,
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
   * @param SolicitacaoCorridaSummary Modified SolicitacaoCorrida list's properties summary
   * @return Success
   */
  ApiV1SolicitacaoCorridaPut(SolicitacaoCorridaSummary?: SolicitacaoCorridaSummary): __Observable<ResponseBoolean> {
    return this.ApiV1SolicitacaoCorridaPutResponse(SolicitacaoCorridaSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param SolicitacaoCorridaSummary SolicitacaoCorrida's summary
   * @return Success
   */
  ApiV1SolicitacaoCorridaPostResponse(SolicitacaoCorridaSummary?: SolicitacaoCorridaSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = SolicitacaoCorridaSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/SolicitacaoCorrida`,
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
   * @param SolicitacaoCorridaSummary SolicitacaoCorrida's summary
   * @return Success
   */
  ApiV1SolicitacaoCorridaPost(SolicitacaoCorridaSummary?: SolicitacaoCorridaSummary): __Observable<ResponseGuid> {
    return this.ApiV1SolicitacaoCorridaPostResponse(SolicitacaoCorridaSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1SolicitacaoCorridaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseSolicitacaoCorridaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/SolicitacaoCorrida/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseSolicitacaoCorridaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1SolicitacaoCorridaByIdGet(id: string): __Observable<ResponseSolicitacaoCorridaSummary> {
    return this.ApiV1SolicitacaoCorridaByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseSolicitacaoCorridaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1SolicitacaoCorridaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/SolicitacaoCorrida/${id}`,
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
  ApiV1SolicitacaoCorridaByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1SolicitacaoCorridaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module SolicitacaoCorridaService {
}

export { SolicitacaoCorridaService }
