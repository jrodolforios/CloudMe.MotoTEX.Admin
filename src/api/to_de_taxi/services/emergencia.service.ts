/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableEmergenciaSummary } from '../models/response-ienumerable-emergencia-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { EmergenciaSummary } from '../models/emergencia-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseEmergenciaSummary } from '../models/response-emergencia-summary';
@Injectable({
  providedIn: 'root',
})
class EmergenciaService extends __BaseService {
  static readonly ApiV1EmergenciaGetPath = '/api/v1/Emergencia';
  static readonly ApiV1EmergenciaPutPath = '/api/v1/Emergencia';
  static readonly ApiV1EmergenciaPostPath = '/api/v1/Emergencia';
  static readonly ApiV1EmergenciaByIdGetPath = '/api/v1/Emergencia/{id}';
  static readonly ApiV1EmergenciaByIdDeletePath = '/api/v1/Emergencia/{id}';
  static readonly ApiV1EmergenciaPanicoPostPath = '/api/v1/Emergencia/panico';
  static readonly ApiV1EmergenciaAlterarStatusPostPath = '/api/v1/Emergencia/alterar_status';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1EmergenciaGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableEmergenciaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Emergencia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableEmergenciaSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1EmergenciaGet(): __Observable<ResponseIEnumerableEmergenciaSummary> {
    return this.ApiV1EmergenciaGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableEmergenciaSummary)
    );
  }

  /**
   * @param EmergenciaSummary Modified Emergencia list's properties summary
   * @return Success
   */
  ApiV1EmergenciaPutResponse(EmergenciaSummary?: EmergenciaSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = EmergenciaSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Emergencia`,
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
   * @param EmergenciaSummary Modified Emergencia list's properties summary
   * @return Success
   */
  ApiV1EmergenciaPut(EmergenciaSummary?: EmergenciaSummary): __Observable<ResponseBoolean> {
    return this.ApiV1EmergenciaPutResponse(EmergenciaSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param EmergenciaSummary Emergencia's summary
   * @return Success
   */
  ApiV1EmergenciaPostResponse(EmergenciaSummary?: EmergenciaSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = EmergenciaSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Emergencia`,
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
   * @param EmergenciaSummary Emergencia's summary
   * @return Success
   */
  ApiV1EmergenciaPost(EmergenciaSummary?: EmergenciaSummary): __Observable<ResponseGuid> {
    return this.ApiV1EmergenciaPostResponse(EmergenciaSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1EmergenciaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseEmergenciaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Emergencia/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseEmergenciaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1EmergenciaByIdGet(id: string): __Observable<ResponseEmergenciaSummary> {
    return this.ApiV1EmergenciaByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseEmergenciaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1EmergenciaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Emergencia/${id}`,
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
  ApiV1EmergenciaByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1EmergenciaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param params The `EmergenciaService.ApiV1EmergenciaPanicoPostParams` containing the following parameters:
   *
   * - `longitude`:
   *
   * - `latitude`:
   *
   * - `id_taxista`:
   *
   * @return Success
   */
  ApiV1EmergenciaPanicoPostResponse(params: EmergenciaService.ApiV1EmergenciaPanicoPostParams): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.longitude != null) __params = __params.set('longitude', params.longitude.toString());
    if (params.latitude != null) __params = __params.set('latitude', params.latitude.toString());
    if (params.idTaxista != null) __params = __params.set('id_taxista', params.idTaxista.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Emergencia/panico`,
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
   * @param params The `EmergenciaService.ApiV1EmergenciaPanicoPostParams` containing the following parameters:
   *
   * - `longitude`:
   *
   * - `latitude`:
   *
   * - `id_taxista`:
   *
   * @return Success
   */
  ApiV1EmergenciaPanicoPost(params: EmergenciaService.ApiV1EmergenciaPanicoPostParams): __Observable<ResponseBoolean> {
    return this.ApiV1EmergenciaPanicoPostResponse(params).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param params The `EmergenciaService.ApiV1EmergenciaAlterarStatusPostParams` containing the following parameters:
   *
   * - `status`:
   *
   * - `id_emergencia`:
   *
   * @return Success
   */
  ApiV1EmergenciaAlterarStatusPostResponse(params: EmergenciaService.ApiV1EmergenciaAlterarStatusPostParams): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.status != null) __params = __params.set('status', params.status.toString());
    if (params.idEmergencia != null) __params = __params.set('id_emergencia', params.idEmergencia.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Emergencia/alterar_status`,
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
   * @param params The `EmergenciaService.ApiV1EmergenciaAlterarStatusPostParams` containing the following parameters:
   *
   * - `status`:
   *
   * - `id_emergencia`:
   *
   * @return Success
   */
  ApiV1EmergenciaAlterarStatusPost(params: EmergenciaService.ApiV1EmergenciaAlterarStatusPostParams): __Observable<ResponseBoolean> {
    return this.ApiV1EmergenciaAlterarStatusPostResponse(params).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module EmergenciaService {

  /**
   * Parameters for ApiV1EmergenciaPanicoPost
   */
  export interface ApiV1EmergenciaPanicoPostParams {
    longitude?: string;
    latitude?: string;
    idTaxista?: string;
  }

  /**
   * Parameters for ApiV1EmergenciaAlterarStatusPost
   */
  export interface ApiV1EmergenciaAlterarStatusPostParams {
    status?: 0 | 1 | 2 | 3;
    idEmergencia?: string;
  }
}

export { EmergenciaService }
