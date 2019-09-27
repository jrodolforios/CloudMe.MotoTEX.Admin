/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { VeiculoSummary } from '../models/veiculo-summary';
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
  ApiV1VeiculoGetResponse(): __Observable<__StrictHttpResponse<Array<VeiculoSummary>>> {
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
        return _r as __StrictHttpResponse<Array<VeiculoSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1VeiculoGet(): __Observable<Array<VeiculoSummary>> {
    return this.ApiV1VeiculoGetResponse().pipe(
      __map(_r => _r.body as Array<VeiculoSummary>)
    );
  }

  /**
   * @param veiculoSummary Modified Veiculo list's properties summary
   * @return Success
   */
  ApiV1VeiculoPutResponse(veiculoSummary?: VeiculoSummary): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = veiculoSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Veiculo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @param veiculoSummary Modified Veiculo list's properties summary
   * @return Success
   */
  ApiV1VeiculoPut(veiculoSummary?: VeiculoSummary): __Observable<string> {
    return this.ApiV1VeiculoPutResponse(veiculoSummary).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param veiculoSummary Veiculo's summary
   * @return Success
   */
  ApiV1VeiculoPostResponse(veiculoSummary?: VeiculoSummary): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = veiculoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Veiculo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @param veiculoSummary Veiculo's summary
   * @return Success
   */
  ApiV1VeiculoPost(veiculoSummary?: VeiculoSummary): __Observable<string> {
    return this.ApiV1VeiculoPostResponse(veiculoSummary).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1VeiculoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<VeiculoSummary>> {
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
        return _r as __StrictHttpResponse<VeiculoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1VeiculoByIdGet(id: string): __Observable<VeiculoSummary> {
    return this.ApiV1VeiculoByIdGetResponse(id).pipe(
      __map(_r => _r.body as VeiculoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1VeiculoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
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
  ApiV1VeiculoByIdDelete(id: string): __Observable<boolean> {
    return this.ApiV1VeiculoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module VeiculoService {
}

export { VeiculoService }
