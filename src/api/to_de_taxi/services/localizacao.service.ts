/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableLocalizacaoSummary } from '../models/response-ienumerable-localizacao-summary';
import { ResponseBoolean } from '../models/response-boolean';
import { LocalizacaoSummary } from '../models/localizacao-summary';
import { ResponseGuid } from '../models/response-guid';
import { ResponseLocalizacaoSummary } from '../models/response-localizacao-summary';
import { ResponseInt32 } from '../models/response-int-32';
@Injectable({
  providedIn: 'root',
})
class LocalizacaoService extends __BaseService {
  static readonly ApiV1LocalizacaoGetPath = '/api/v1/Localizacao';
  static readonly ApiV1LocalizacaoPutPath = '/api/v1/Localizacao';
  static readonly ApiV1LocalizacaoPostPath = '/api/v1/Localizacao';
  static readonly ApiV1LocalizacaoByIdGetPath = '/api/v1/Localizacao/{id}';
  static readonly ApiV1LocalizacaoByIdDeletePath = '/api/v1/Localizacao/{id}';
  static readonly ApiV1LocalizacaoGetQtTaxistasOnlineGetPath = '/api/v1/Localizacao/get_qt_taxistas_online';
  static readonly ApiV1LocalizacaoGetLocalizacaoUsuarioGetPath = '/api/v1/Localizacao/get_localizacao_usuario';
  static readonly ApiV1LocalizacaoGetLocalizacaoTaxistaGetPath = '/api/v1/Localizacao/get_localizacao_taxista';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ApiV1LocalizacaoGetResponse(): __Observable<__StrictHttpResponse<ResponseIEnumerableLocalizacaoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Localizacao`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableLocalizacaoSummary>;
      })
    );
  }
  /**
   * @return Success
   */
  ApiV1LocalizacaoGet(): __Observable<ResponseIEnumerableLocalizacaoSummary> {
    return this.ApiV1LocalizacaoGetResponse().pipe(
      __map(_r => _r.body as ResponseIEnumerableLocalizacaoSummary)
    );
  }

  /**
   * @param LocalizacaoSummary Modified Localizacao list's properties summary
   * @return Success
   */
  ApiV1LocalizacaoPutResponse(LocalizacaoSummary?: LocalizacaoSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = LocalizacaoSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Localizacao`,
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
   * @param LocalizacaoSummary Modified Localizacao list's properties summary
   * @return Success
   */
  ApiV1LocalizacaoPut(LocalizacaoSummary?: LocalizacaoSummary): __Observable<ResponseBoolean> {
    return this.ApiV1LocalizacaoPutResponse(LocalizacaoSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param LocalizacaoSummary Localizacao's summary
   * @return Success
   */
  ApiV1LocalizacaoPostResponse(LocalizacaoSummary?: LocalizacaoSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = LocalizacaoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Localizacao`,
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
   * @param LocalizacaoSummary Localizacao's summary
   * @return Success
   */
  ApiV1LocalizacaoPost(LocalizacaoSummary?: LocalizacaoSummary): __Observable<ResponseGuid> {
    return this.ApiV1LocalizacaoPostResponse(LocalizacaoSummary).pipe(
      __map(_r => _r.body as ResponseGuid)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiV1LocalizacaoByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseLocalizacaoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Localizacao/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseLocalizacaoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ApiV1LocalizacaoByIdGet(id: string): __Observable<ResponseLocalizacaoSummary> {
    return this.ApiV1LocalizacaoByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseLocalizacaoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  ApiV1LocalizacaoByIdDeleteResponse(id: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Localizacao/${id}`,
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
  ApiV1LocalizacaoByIdDelete(id: string): __Observable<ResponseBoolean> {
    return this.ApiV1LocalizacaoByIdDeleteResponse(id).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @return Success
   */
  ApiV1LocalizacaoGetQtTaxistasOnlineGetResponse(): __Observable<__StrictHttpResponse<ResponseInt32>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Localizacao/get_qt_taxistas_online`,
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
   * @return Success
   */
  ApiV1LocalizacaoGetQtTaxistasOnlineGet(): __Observable<ResponseInt32> {
    return this.ApiV1LocalizacaoGetQtTaxistasOnlineGetResponse().pipe(
      __map(_r => _r.body as ResponseInt32)
    );
  }

  /**
   * @param IdUsuario undefined
   * @return Success
   */
  ApiV1LocalizacaoGetLocalizacaoUsuarioGetResponse(IdUsuario?: string): __Observable<__StrictHttpResponse<ResponseLocalizacaoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdUsuario != null) __params = __params.set('IdUsuario', IdUsuario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Localizacao/get_localizacao_usuario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseLocalizacaoSummary>;
      })
    );
  }
  /**
   * @param IdUsuario undefined
   * @return Success
   */
  ApiV1LocalizacaoGetLocalizacaoUsuarioGet(IdUsuario?: string): __Observable<ResponseLocalizacaoSummary> {
    return this.ApiV1LocalizacaoGetLocalizacaoUsuarioGetResponse(IdUsuario).pipe(
      __map(_r => _r.body as ResponseLocalizacaoSummary)
    );
  }

  /**
   * @param IdTaxista undefined
   * @return Success
   */
  ApiV1LocalizacaoGetLocalizacaoTaxistaGetResponse(IdTaxista?: string): __Observable<__StrictHttpResponse<ResponseLocalizacaoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdTaxista != null) __params = __params.set('IdTaxista', IdTaxista.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Localizacao/get_localizacao_taxista`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseLocalizacaoSummary>;
      })
    );
  }
  /**
   * @param IdTaxista undefined
   * @return Success
   */
  ApiV1LocalizacaoGetLocalizacaoTaxistaGet(IdTaxista?: string): __Observable<ResponseLocalizacaoSummary> {
    return this.ApiV1LocalizacaoGetLocalizacaoTaxistaGetResponse(IdTaxista).pipe(
      __map(_r => _r.body as ResponseLocalizacaoSummary)
    );
  }
}

module LocalizacaoService {
}

export { LocalizacaoService }
