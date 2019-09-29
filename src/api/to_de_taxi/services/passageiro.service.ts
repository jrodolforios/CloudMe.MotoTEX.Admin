/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerablePassageiroSummary } from '../models/response-ienumerable-passageiro-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { PassageiroSummary } from '../models/passageiro-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponsePassageiroSummary } from '../models/response-passageiro-summary';
@Injectable({
  providedIn: 'root',
})
class PassageiroService extends __BaseService {
  static readonly ApiV1PassageiroGetPath = '/api/v1/Passageiro';
  static readonly ApiV1PassageiroPutPath = '/api/v1/Passageiro';
  static readonly ApiV1PassageiroPostPath = '/api/v1/Passageiro';
  static readonly ApiV1PassageiroByIdGetPath = '/api/v1/Passageiro/{id}';
  static readonly ApiV1PassageiroByIdDeletePath = '/api/v1/Passageiro/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1PassageiroGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerablePassageiroSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Passageiro`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerablePassageiroSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1PassageiroGet(): __Observable<ResponseIEnumerablePassageiroSummary> {
    return this.ApiV1PassageiroGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerablePassageiroSummary)
    );
  }

  /**
   * @param PassageiroSummary Modified Passageiro list's properties summary
   * @return Success
   */
  ApiV1PassageiroPutResponse(PassageiroSummary?: PassageiroSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = PassageiroSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Passageiro`,
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
   * @param PassageiroSummary Modified Passageiro list's properties summary
   * @return Success
   */
  ApiV1PassageiroPut(PassageiroSummary?: PassageiroSummary): __Observable<ResponseBoolean> {
    return this.ApiV1PassageiroPutResponse(PassageiroSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param PassageiroSummary Passageiro's summary
   * @return Success
   */
  ApiV1PassageiroPostResponse(PassageiroSummary?: PassageiroSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = PassageiroSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Passageiro`,
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
   * @param PassageiroSummary Passageiro's summary
   * @return Success
   */
  ApiV1PassageiroPost(PassageiroSummary?: PassageiroSummary): __Observable<ResponseGuid> {
    return this.ApiV1PassageiroPostResponse(PassageiroSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1PassageiroByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponsePassageiroSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Passageiro/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponsePassageiroSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1PassageiroByIdGet(id: string): __Observable<ResponsePassageiroSummary> {
    return this.ApiV1PassageiroByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponsePassageiroSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1PassageiroByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Passageiro/${id}`,
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
  ApiV1PassageiroByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1PassageiroByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module PassageiroService {
}

export { PassageiroService }
