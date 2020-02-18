/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableCorridaSummary } from '../models/response-ienumerable-corrida-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { CorridaSummary } from '../models/corrida-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseCorridaSummary } from '../models/response-corrida-summary';
import { ResponseInt32 } from '../models/response-int-32';
import { ResponseListCorridaSummary } from '../models/response-list-corrida-summary';
import { ResponseEstatisticasCorridas } from '../models/response-estatisticas-corridas';
@Injectable({
  providedIn: 'root',
})
class CorridaService extends __BaseService {
  static readonly ApiV1CorridaGetPath = '/api/v1/Corrida';
  static readonly ApiV1CorridaPutPath = '/api/v1/Corrida';
  static readonly ApiV1CorridaPostPath = '/api/v1/Corrida';
  static readonly ApiV1CorridaConsultaIdPassageiroByIdGetPath = '/api/v1/Corrida/consulta_id_passageiro/{id}';
  static readonly ApiV1CorridaConsultaIdTaxistaByIdGetPath = '/api/v1/Corrida/consulta_id_taxista/{id}';
  static readonly ApiV1CorridaConsultaIdSolicitacaoCorridaByIdGetPath = '/api/v1/Corrida/consulta_id_solicitacao_corrida/{id}';
  static readonly ApiV1CorridaClassificaTaxistaByIdGetPath = '/api/v1/Corrida/classifica_taxista/{id}';
  static readonly ApiV1CorridaClassificarPassageiroByIdGetPath = '/api/v1/Corrida/classificar_passageiro/{id}';
  static readonly ApiV1CorridaByIdGetPath = '/api/v1/Corrida/{id}';
  static readonly ApiV1CorridaByIdDeletePath = '/api/v1/Corrida/{id}';
  static readonly ApiV1CorridaPausarCorridaByIdPostPath = '/api/v1/Corrida/pausar_corrida/{id}';
  static readonly ApiV1CorridaRecuperarApartirDeDataByDataPostPath = '/api/v1/Corrida/recuperar_apartir_de_data/{data}';
  static readonly ApiV1CorridaRetomarCorridaByIdPostPath = '/api/v1/Corrida/retomar_corrida/{id}';
  static readonly ApiV1CorridaObterEstatisticasPostPath = '/api/v1/Corrida/obter_estatisticas';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1CorridaGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableCorridaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Corrida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableCorridaSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1CorridaGet(): __Observable<ResponseIEnumerableCorridaSummary> {
    return this.ApiV1CorridaGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableCorridaSummary)
    );
  }

  /**
   * @param corridaSummary Modified Corrida list's properties summary
   * @return Success
   */
  ApiV1CorridaPutResponse(corridaSummary?: CorridaSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = corridaSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Corrida`,
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
   * @param corridaSummary Modified Corrida list's properties summary
   * @return Success
   */
  ApiV1CorridaPut(corridaSummary?: CorridaSummary): __Observable<ResponseBoolean> {
    return this.ApiV1CorridaPutResponse(corridaSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param corridaSummary Corrida's summary
   * @return Success
   */
  ApiV1CorridaPostResponse(corridaSummary?: CorridaSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = corridaSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Corrida`,
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
   * @param corridaSummary Corrida's summary
   * @return Success
   */
  ApiV1CorridaPost(corridaSummary?: CorridaSummary): __Observable<ResponseGuid> {
    return this.ApiV1CorridaPostResponse(corridaSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1CorridaConsultaIdPassageiroByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseIEnumerableCorridaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Corrida/consulta_id_passageiro/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableCorridaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1CorridaConsultaIdPassageiroByIdGet(id: string): __Observable<ResponseIEnumerableCorridaSummary> {
    return this.ApiV1CorridaConsultaIdPassageiroByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseIEnumerableCorridaSummary)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1CorridaConsultaIdTaxistaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseIEnumerableCorridaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Corrida/consulta_id_taxista/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableCorridaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1CorridaConsultaIdTaxistaByIdGet(id: string): __Observable<ResponseIEnumerableCorridaSummary> {
    return this.ApiV1CorridaConsultaIdTaxistaByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseIEnumerableCorridaSummary)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1CorridaConsultaIdSolicitacaoCorridaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseCorridaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Corrida/consulta_id_solicitacao_corrida/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseCorridaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1CorridaConsultaIdSolicitacaoCorridaByIdGet(id: string): __Observable<ResponseCorridaSummary> {
    return this.ApiV1CorridaConsultaIdSolicitacaoCorridaByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseCorridaSummary)
    );
  }

  /**
   * @param params The `CorridaService.ApiV1CorridaClassificaTaxistaByIdGetParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `classificacao`:
   *
   * @return Success
   */
  ApiV1CorridaClassificaTaxistaByIdGetResponse(params: CorridaService.ApiV1CorridaClassificaTaxistaByIdGetParams): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.classificacao != null) __params = __params.set('classificacao', params.classificacao.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Corrida/classifica_taxista/${params.id}`,
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
   * @param params The `CorridaService.ApiV1CorridaClassificaTaxistaByIdGetParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `classificacao`:
   *
   * @return Success
   */
  ApiV1CorridaClassificaTaxistaByIdGet(params: CorridaService.ApiV1CorridaClassificaTaxistaByIdGetParams): __Observable<ResponseBoolean> {
    return this.ApiV1CorridaClassificaTaxistaByIdGetResponse(params).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param params The `CorridaService.ApiV1CorridaClassificarPassageiroByIdGetParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `classificacao`:
   *
   * @return Success
   */
  ApiV1CorridaClassificarPassageiroByIdGetResponse(params: CorridaService.ApiV1CorridaClassificarPassageiroByIdGetParams): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.classificacao != null) __params = __params.set('classificacao', params.classificacao.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Corrida/classificar_passageiro/${params.id}`,
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
   * @param params The `CorridaService.ApiV1CorridaClassificarPassageiroByIdGetParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `classificacao`:
   *
   * @return Success
   */
  ApiV1CorridaClassificarPassageiroByIdGet(params: CorridaService.ApiV1CorridaClassificarPassageiroByIdGetParams): __Observable<ResponseBoolean> {
    return this.ApiV1CorridaClassificarPassageiroByIdGetResponse(params).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1CorridaByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseCorridaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Corrida/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseCorridaSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1CorridaByIdGet(id: string): __Observable<ResponseCorridaSummary> {
    return this.ApiV1CorridaByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseCorridaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1CorridaByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Corrida/${id}`,
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
  ApiV1CorridaByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1CorridaByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1CorridaPausarCorridaByIdPostResponse(id: string): __Observable<__StrictHttpResponse<ResponseInt32>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Corrida/pausar_corrida/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseInt32>;
      })
    );
  }
  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1CorridaPausarCorridaByIdPost(id: string): __Observable<ResponseInt32> {
    return this.ApiV1CorridaPausarCorridaByIdPostResponse(id).pipe(
      __map(_r => _r.body as ResponseInt32)
    );
  }

  /**
   * @param data DialList's ID
   * @return Success
   */
  ApiV1CorridaRecuperarApartirDeDataByDataPostResponse(data: string): __Observable<__StrictHttpResponse<ResponseListCorridaSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Corrida/recuperar_apartir_de_data/${data}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseListCorridaSummary>;
      })
    );
  }
  /**
   * @param data DialList's ID
   * @return Success
   */
  ApiV1CorridaRecuperarApartirDeDataByDataPost(data: string): __Observable<ResponseListCorridaSummary> {
    return this.ApiV1CorridaRecuperarApartirDeDataByDataPostResponse(data).pipe(
      __map(_r => _r.body as ResponseListCorridaSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1CorridaRetomarCorridaByIdPostResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Corrida/retomar_corrida/${id}`,
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
  ApiV1CorridaRetomarCorridaByIdPost(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1CorridaRetomarCorridaByIdPostResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param params The `CorridaService.ApiV1CorridaObterEstatisticasPostParams` containing the following parameters:
   *
   * - `inicio`:
   *
   * - `fim`:
   *
   * @return Success
   */
  ApiV1CorridaObterEstatisticasPostResponse(params: CorridaService.ApiV1CorridaObterEstatisticasPostParams): __Observable<__StrictHttpResponse<ResponseEstatisticasCorridas>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.inicio != null) __params = __params.set('inicio', params.inicio.toString());
    if (params.fim != null) __params = __params.set('fim', params.fim.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Corrida/obter_estatisticas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseEstatisticasCorridas>;
      })
    );
  }
  /**
   * @param params The `CorridaService.ApiV1CorridaObterEstatisticasPostParams` containing the following parameters:
   *
   * - `inicio`:
   *
   * - `fim`:
   *
   * @return Success
   */
  ApiV1CorridaObterEstatisticasPost(params: CorridaService.ApiV1CorridaObterEstatisticasPostParams): __Observable<ResponseEstatisticasCorridas> {
    return this.ApiV1CorridaObterEstatisticasPostResponse(params).pipe(
      __map(_r => _r.body as ResponseEstatisticasCorridas)
    );
  }
}

module CorridaService {

  /**
   * Parameters for ApiV1CorridaClassificaTaxistaByIdGet
   */
  export interface ApiV1CorridaClassificaTaxistaByIdGetParams {
    id: string;
    classificacao?: number;
  }

  /**
   * Parameters for ApiV1CorridaClassificarPassageiroByIdGet
   */
  export interface ApiV1CorridaClassificarPassageiroByIdGetParams {
    id: string;
    classificacao?: number;
  }

  /**
   * Parameters for ApiV1CorridaObterEstatisticasPost
   */
  export interface ApiV1CorridaObterEstatisticasPostParams {
    inicio?: string;
    fim?: string;
  }
}

export { CorridaService }
