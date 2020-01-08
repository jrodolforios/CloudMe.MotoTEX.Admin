/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableVeiculoSummary } from '../models/response-ienumerable-veiculo-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { VeiculoSummary } from '../models/veiculo-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseVeiculoSummary } from '../models/response-veiculo-summary';
import { ResponseIEnumerableMarcaVeiculo } from '../models/response-ienumerable-marca-veiculo';
import { ResponseIEnumerableModeloVeiculo } from '../models/response-ienumerable-modelo-veiculo';
import { ResponseIEnumerableAnoVersao } from '../models/response-ienumerable-ano-versao';
@Injectable({
  providedIn: 'root',
})
class VeiculoService extends __BaseService {
  static readonly ApiV1VeiculoGetPath = '/api/v1/Veiculo';
  static readonly ApiV1VeiculoPutPath = '/api/v1/Veiculo';
  static readonly ApiV1VeiculoPostPath = '/api/v1/Veiculo';
  static readonly ApiV1VeiculoByIdGetPath = '/api/v1/Veiculo/{id}';
  static readonly ApiV1VeiculoByIdDeletePath = '/api/v1/Veiculo/{id}';
  static readonly ApiV1VeiculoMarcasGetPath = '/api/v1/Veiculo/marcas';
  static readonly ApiV1VeiculoModelosByCodigoMarcaGetPath = '/api/v1/Veiculo/modelos/{codigo_marca}';
  static readonly ApiV1VeiculoAnosVersoesByCodigoModeloGetPath = '/api/v1/Veiculo/anos_versoes/{codigo_modelo}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1VeiculoGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableVeiculoSummary>> {
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
        return _r as __StrictHttpResponse<ResponseIEnumerableVeiculoSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1VeiculoGet(): __Observable<ResponseIEnumerableVeiculoSummary> {
    return this.ApiV1VeiculoGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableVeiculoSummary)
    );
  }

  /**
   * @param VeiculoSummary Modified Veiculo list's properties summary
   * @return Success
   */
  ApiV1VeiculoPutResponse(VeiculoSummary?: VeiculoSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = VeiculoSummary;
    let req = new HttpRequest<any>(
      'PUT',
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
        return _r as __StrictHttpResponse<ResponseBoolean>;
      })
    );
  }
  /**
   * @param VeiculoSummary Modified Veiculo list's properties summary
   * @return Success
   */
  ApiV1VeiculoPut(VeiculoSummary?: VeiculoSummary): __Observable<ResponseBoolean> {
    return this.ApiV1VeiculoPutResponse(VeiculoSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param VeiculoSummary Veiculo's summary
   * @return Success
   */
  ApiV1VeiculoPostResponse(VeiculoSummary?: VeiculoSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = VeiculoSummary;
    let req = new HttpRequest<any>(
      'POST',
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
        return _r as __StrictHttpResponse<ResponseGuid>;
      })
    );
  }
  /**
   * @param VeiculoSummary Veiculo's summary
   * @return Success
   */
  ApiV1VeiculoPost(VeiculoSummary?: VeiculoSummary): __Observable<ResponseGuid> {
    return this.ApiV1VeiculoPostResponse(VeiculoSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1VeiculoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseVeiculoSummary>> {
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
        return _r as __StrictHttpResponse<ResponseVeiculoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1VeiculoByIdGet(id: string): __Observable<ResponseVeiculoSummary> {
    return this.ApiV1VeiculoByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseVeiculoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1VeiculoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
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
  ApiV1VeiculoByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1VeiculoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @return Success
   */
  ApiV1VeiculoMarcasGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableMarcaVeiculo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Veiculo/marcas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableMarcaVeiculo>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1VeiculoMarcasGet(): __Observable<ResponseIEnumerableMarcaVeiculo> {
    return this.ApiV1VeiculoMarcasGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableMarcaVeiculo)
    );
  }

  /**
   * @param codigo_marca undefined
   * @return Success
   */
  ApiV1VeiculoModelosByCodigoMarcaGetResponse(codigoMarca: string): __Observable<__StrictHttpResponse<ResponseIEnumerableModeloVeiculo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Veiculo/modelos/${codigoMarca}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableModeloVeiculo>;
      })
    );
  }
  /**
   * @param codigo_marca undefined
   * @return Success
   */
  ApiV1VeiculoModelosByCodigoMarcaGet(codigoMarca: string): __Observable<ResponseIEnumerableModeloVeiculo> {
    return this.ApiV1VeiculoModelosByCodigoMarcaGetResponse(codigoMarca).pipe(
      __map(_r => _r.body as ResponseIEnumerableModeloVeiculo)
    );
  }

  /**
   * @param params The `VeiculoService.ApiV1VeiculoAnosVersoesByCodigoModeloGetParams` containing the following parameters:
   *
   * - `codigo_modelo`:
   *
   * - `codigo_marca`:
   *
   * @return Success
   */
  ApiV1VeiculoAnosVersoesByCodigoModeloGetResponse(params: VeiculoService.ApiV1VeiculoAnosVersoesByCodigoModeloGetParams): __Observable<__StrictHttpResponse<ResponseIEnumerableAnoVersao>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.codigoMarca != null) __params = __params.set('codigo_marca', params.codigoMarca.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Veiculo/anos_versoes/${params.codigoModelo}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableAnoVersao>;
      })
    );
  }
  /**
   * @param params The `VeiculoService.ApiV1VeiculoAnosVersoesByCodigoModeloGetParams` containing the following parameters:
   *
   * - `codigo_modelo`:
   *
   * - `codigo_marca`:
   *
   * @return Success
   */
  ApiV1VeiculoAnosVersoesByCodigoModeloGet(params: VeiculoService.ApiV1VeiculoAnosVersoesByCodigoModeloGetParams): __Observable<ResponseIEnumerableAnoVersao> {
    return this.ApiV1VeiculoAnosVersoesByCodigoModeloGetResponse(params).pipe(
      __map(_r => _r.body as ResponseIEnumerableAnoVersao)
    );
  }
}

module VeiculoService {

  /**
   * Parameters for ApiV1VeiculoAnosVersoesByCodigoModeloGet
   */
  export interface ApiV1VeiculoAnosVersoesByCodigoModeloGetParams {
    codigoModelo: string;
    codigoMarca?: string;
  }
}

export { VeiculoService }
