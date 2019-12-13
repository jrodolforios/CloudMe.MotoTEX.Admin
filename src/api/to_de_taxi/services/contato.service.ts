/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableContatoSummary } from '../models/response-ienumerable-contato-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { ContatoSummary } from '../models/contato-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseContatoSummary } from '../models/response-contato-summary';
@Injectable({
  providedIn: 'root',
})
class ContatoService extends __BaseService {
  static readonly ApiV1ContatoGetPath = '/api/v1/Contato';
  static readonly ApiV1ContatoPutPath = '/api/v1/Contato';
  static readonly ApiV1ContatoPostPath = '/api/v1/Contato';
  static readonly ApiV1ContatoByIdGetPath = '/api/v1/Contato/{id}';
  static readonly ApiV1ContatoByIdDeletePath = '/api/v1/Contato/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1ContatoGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableContatoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Contato`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableContatoSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1ContatoGet(): __Observable<ResponseIEnumerableContatoSummary> {
    return this.ApiV1ContatoGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableContatoSummary)
    );
  }

  /**
   * @param ContatoSUmmary Modified Contato list's properties summary
   * @return Success
   */
  ApiV1ContatoPutResponse(ContatoSUmmary?: ContatoSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ContatoSUmmary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Contato`,
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
   * @param ContatoSUmmary Modified Contato list's properties summary
   * @return Success
   */
  ApiV1ContatoPut(ContatoSUmmary?: ContatoSummary): __Observable<ResponseBoolean> {
    return this.ApiV1ContatoPutResponse(ContatoSUmmary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param ContatoSummary Contato's summary
   * @return Success
   */
  ApiV1ContatoPostResponse(ContatoSummary?: ContatoSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ContatoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Contato`,
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
   * @param ContatoSummary Contato's summary
   * @return Success
   */
  ApiV1ContatoPost(ContatoSummary?: ContatoSummary): __Observable<ResponseGuid> {
    return this.ApiV1ContatoPostResponse(ContatoSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1ContatoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseContatoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Contato/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseContatoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1ContatoByIdGet(id: string): __Observable<ResponseContatoSummary> {
    return this.ApiV1ContatoByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseContatoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1ContatoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Contato/${id}`,
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
  ApiV1ContatoByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1ContatoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module ContatoService {
}

export { ContatoService }
