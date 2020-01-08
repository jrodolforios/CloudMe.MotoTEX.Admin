/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class IdentityService extends __BaseService {
  static readonly ApiV1IdentityErrorGetPath = '/api/v1/Identity/error';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param errorId undefined
   */
  ApiV1IdentityErrorGetResponse(errorId?: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (errorId != null) __params = __params.set('errorId', errorId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Identity/error`,
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
   * @param errorId undefined
   */
  ApiV1IdentityErrorGet(errorId?: string): __Observable<null> {
    return this.ApiV1IdentityErrorGetResponse(errorId).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module IdentityService {
}

export { IdentityService }
