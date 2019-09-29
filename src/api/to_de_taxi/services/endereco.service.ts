/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableEnderecoSummary } from '../models/response-ienumerable-endereco-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { EnderecoSummary } from '../models/endereco-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseEnderecoSummary } from '../models/response-endereco-summary';
@Injectable({
  providedIn: 'root',
})
class EnderecoService extends __BaseService {
  static readonly ApiV1EnderecoGetPath = '/api/v1/Endereco';
  static readonly ApiV1EnderecoPutPath = '/api/v1/Endereco';
  static readonly ApiV1EnderecoPostPath = '/api/v1/Endereco';
  static readonly ApiV1EnderecoByIdGetPath = '/api/v1/Endereco/{id}';
  static readonly ApiV1EnderecoByIdDeletePath = '/api/v1/Endereco/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1EnderecoGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableEnderecoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Endereco`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableEnderecoSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1EnderecoGet(): __Observable<ResponseIEnumerableEnderecoSummary> {
    return this.ApiV1EnderecoGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableEnderecoSummary)
    );
  }

  /**
   * @param EnderecoSummary Modified Endereco list's properties summary
   * @return Success
   */
  ApiV1EnderecoPutResponse(EnderecoSummary?: EnderecoSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = EnderecoSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Endereco`,
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
   * @param EnderecoSummary Modified Endereco list's properties summary
   * @return Success
   */
  ApiV1EnderecoPut(EnderecoSummary?: EnderecoSummary): __Observable<ResponseBoolean> {
    return this.ApiV1EnderecoPutResponse(EnderecoSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param EnderecoSummary Endereco's summary
   * @return Success
   */
  ApiV1EnderecoPostResponse(EnderecoSummary?: EnderecoSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = EnderecoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Endereco`,
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
   * @param EnderecoSummary Endereco's summary
   * @return Success
   */
  ApiV1EnderecoPost(EnderecoSummary?: EnderecoSummary): __Observable<ResponseGuid> {
    return this.ApiV1EnderecoPostResponse(EnderecoSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1EnderecoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseEnderecoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Endereco/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseEnderecoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1EnderecoByIdGet(id: string): __Observable<ResponseEnderecoSummary> {
    return this.ApiV1EnderecoByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseEnderecoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1EnderecoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Endereco/${id}`,
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
  ApiV1EnderecoByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1EnderecoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module EnderecoService {
}

export { EnderecoService }
