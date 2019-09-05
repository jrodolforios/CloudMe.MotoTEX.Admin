/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { SolicitacaoCorridaSummary } from '../models/solicitacao-corrida-summary';
@Injectable({
  providedIn: 'root',
})
class SolicitacaoCorridaService extends __BaseService {
  static readonly GetAllPath = '/api/v1/SolicitacaoCorrida';
  static readonly PutPath = '/api/v1/SolicitacaoCorrida';
  static readonly PostPath = '/api/v1/SolicitacaoCorrida';
  static readonly GetPath = '/api/v1/SolicitacaoCorrida/{id}';
  static readonly DeletePath = '/api/v1/SolicitacaoCorrida/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  GetAllResponse(): __Observable<__StrictHttpResponse<Array<SolicitacaoCorridaSummary>>> {
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
        return _r as __StrictHttpResponse<Array<SolicitacaoCorridaSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  GetAll(): __Observable<Array<SolicitacaoCorridaSummary>> {
    return this.GetAllResponse().pipe(
      __map(_r => _r.body as Array<SolicitacaoCorridaSummary>)
    );
  }

  /**
   * @param solicitacaoCorridaSummary Modified SolicitacaoCorrida list's properties summary
   * @return Success
   */
  PutResponse(solicitacaoCorridaSummary?: SolicitacaoCorridaSummary): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = solicitacaoCorridaSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/SolicitacaoCorrida`,
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
   * @param solicitacaoCorridaSummary Modified SolicitacaoCorrida list's properties summary
   * @return Success
   */
  Put(solicitacaoCorridaSummary?: SolicitacaoCorridaSummary): __Observable<boolean> {
    return this.PutResponse(solicitacaoCorridaSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param solicitacaoCorridaSummary SolicitacaoCorrida's summary
   */
  PostResponse(solicitacaoCorridaSummary?: SolicitacaoCorridaSummary): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = solicitacaoCorridaSummary;
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param solicitacaoCorridaSummary SolicitacaoCorrida's summary
   */
  Post(solicitacaoCorridaSummary?: SolicitacaoCorridaSummary): __Observable<null> {
    return this.PostResponse(solicitacaoCorridaSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  GetResponse(id: string): __Observable<__StrictHttpResponse<SolicitacaoCorridaSummary>> {
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
        return _r as __StrictHttpResponse<SolicitacaoCorridaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  Get(id: string): __Observable<SolicitacaoCorridaSummary> {
    return this.GetResponse(id).pipe(
      __map(_r => _r.body as SolicitacaoCorridaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  DeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
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
  Delete(id: string): __Observable<boolean> {
    return this.DeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module SolicitacaoCorridaService {
}

export { SolicitacaoCorridaService }