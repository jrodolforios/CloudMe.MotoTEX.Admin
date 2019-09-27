/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { VeiculoTaxistaSummary } from '../models/veiculo-taxista-summary';
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
  ApiV1VeiculoTaxistaGetResponse(): __Observable<__StrictHttpResponse<Array<VeiculoTaxistaSummary>>> {
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
        return _r as __StrictHttpResponse<Array<VeiculoTaxistaSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1VeiculoTaxistaGet(): __Observable<Array<VeiculoTaxistaSummary>> {
    return this.ApiV1VeiculoTaxistaGetResponse().pipe(
      __map(_r => _r.body as Array<VeiculoTaxistaSummary>)
    );
  }

  /**
   * @param veiculoTaxistaSummary Modified VeiculoTaxista list's properties summary
   * @return Success
   */
  ApiV1VeiculoTaxistaPutResponse(veiculoTaxistaSummary?: VeiculoTaxistaSummary): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = veiculoTaxistaSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/VeiculoTaxista`,
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
   * @param veiculoTaxistaSummary Modified VeiculoTaxista list's properties summary
   * @return Success
   */
  ApiV1VeiculoTaxistaPut(veiculoTaxistaSummary?: VeiculoTaxistaSummary): __Observable<boolean> {
    return this.ApiV1VeiculoTaxistaPutResponse(veiculoTaxistaSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param veiculoTaxistaSummary VeiculoTaxista's summary
   */
  ApiV1VeiculoTaxistaPostResponse(veiculoTaxistaSummary?: VeiculoTaxistaSummary): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = veiculoTaxistaSummary;
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param veiculoTaxistaSummary VeiculoTaxista's summary
   */
  ApiV1VeiculoTaxistaPost(veiculoTaxistaSummary?: VeiculoTaxistaSummary): __Observable<null> {
    return this.ApiV1VeiculoTaxistaPostResponse(veiculoTaxistaSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1VeiculoTaxistaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<VeiculoTaxistaSummary>> {
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
        return _r as __StrictHttpResponse<VeiculoTaxistaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1VeiculoTaxistaByIdGet(id: string): __Observable<VeiculoTaxistaSummary> {
    return this.ApiV1VeiculoTaxistaByIdGetResponse(id).pipe(
      __map(_r => _r.body as VeiculoTaxistaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1VeiculoTaxistaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
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
  ApiV1VeiculoTaxistaByIdDelete(id: string): __Observable<boolean> {
    return this.ApiV1VeiculoTaxistaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module VeiculoTaxistaService {
}

export { VeiculoTaxistaService }
