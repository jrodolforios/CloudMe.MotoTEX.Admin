/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PassageiroSummary } from '../models/passageiro-summary';
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
  ApiV1PassageiroGetResponse(): __Observable<__StrictHttpResponse<Array<PassageiroSummary>>> {
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
        return _r as __StrictHttpResponse<Array<PassageiroSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1PassageiroGet(): __Observable<Array<PassageiroSummary>> {
    return this.ApiV1PassageiroGetResponse().pipe(
      __map(_r => _r.body as Array<PassageiroSummary>)
    );
  }

  /**
   * @param passageiroSummary Modified Passageiro list's properties summary
   * @return Success
   */
  ApiV1PassageiroPutResponse(passageiroSummary?: PassageiroSummary): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = passageiroSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Passageiro`,
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
   * @param passageiroSummary Modified Passageiro list's properties summary
   * @return Success
   */
  ApiV1PassageiroPut(passageiroSummary?: PassageiroSummary): __Observable<boolean> {
    return this.ApiV1PassageiroPutResponse(passageiroSummary).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param passageiroSummary Passageiro's summary
   */
  ApiV1PassageiroPostResponse(passageiroSummary?: PassageiroSummary): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = passageiroSummary;
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param passageiroSummary Passageiro's summary
   */
  ApiV1PassageiroPost(passageiroSummary?: PassageiroSummary): __Observable<null> {
    return this.ApiV1PassageiroPostResponse(passageiroSummary).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1PassageiroByIdGetResponse(id: string): __Observable<__StrictHttpResponse<PassageiroSummary>> {
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
        return _r as __StrictHttpResponse<PassageiroSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1PassageiroByIdGet(id: string): __Observable<PassageiroSummary> {
    return this.ApiV1PassageiroByIdGetResponse(id).pipe(
      __map(_r => _r.body as PassageiroSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1PassageiroByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
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
  ApiV1PassageiroByIdDelete(id: string): __Observable<boolean> {
    return this.ApiV1PassageiroByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module PassageiroService {
}

export { PassageiroService }
