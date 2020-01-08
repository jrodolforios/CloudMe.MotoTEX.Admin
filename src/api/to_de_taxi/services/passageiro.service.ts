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
import { LocalizacaoSummary } from '../models/localizacao-summary';
import { ResponseInt32 } from '../models/response-int-32';
@Injectable({
  providedIn: 'root',
})
class PassageiroService extends __BaseService {
  static readonly ApiV1PassageiroGetPath = '/api/v1/Passageiro';
  static readonly ApiV1PassageiroPutPath = '/api/v1/Passageiro';
  static readonly ApiV1PassageiroPostPath = '/api/v1/Passageiro';
  static readonly ApiV1PassageiroByIdGetPath = '/api/v1/Passageiro/{id}';
  static readonly ApiV1PassageiroByIdDeletePath = '/api/v1/Passageiro/{id}';
  static readonly ApiV1PassageiroConsultaIdPassageiroByIdGetPath = '/api/v1/Passageiro/consulta_id_passageiro/{id}';
  static readonly ApiV1PassageiroChecarLoginEmUsoGetPath = '/api/v1/Passageiro/checar_login_em_uso';
  static readonly ApiV1PassageiroEmailEmUsoGetPath = '/api/v1/Passageiro/email_em_uso';
  static readonly ApiV1PassageiroInformarLocalizacaoByIdPostPath = '/api/v1/Passageiro/informar_localizacao/{id}';
  static readonly ApiV1PassageiroClassificacaoPassageiroByIdGetPath = '/api/v1/Passageiro/classificacao_passageiro/{id}';

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
   * @param passageiroSummary Modified Passageiro list's properties summary
   * @return Success
   */
  ApiV1PassageiroPutResponse(passageiroSummary?: PassageiroSummary): __Observable<__StrictHttpResponse<ResponseBoolean>> {
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
   * @param passageiroSummary Modified Passageiro list's properties summary
   * @return Success
   */
  ApiV1PassageiroPut(passageiroSummary?: PassageiroSummary): __Observable<ResponseBoolean> {
    return this.ApiV1PassageiroPutResponse(passageiroSummary).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param passageiroSummary Passageiro's summary
   * @return Success
   */
  ApiV1PassageiroPostResponse(passageiroSummary?: PassageiroSummary): __Observable<__StrictHttpResponse<ResponseGuid>> {
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
        return _r as __StrictHttpResponse<ResponseGuid>;
      })
    );
  }
  /**
   * @param passageiroSummary Passageiro's summary
   * @return Success
   */
  ApiV1PassageiroPost(passageiroSummary?: PassageiroSummary): __Observable<ResponseGuid> {
    return this.ApiV1PassageiroPostResponse(passageiroSummary).pipe(
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

  /**
   * @param id User Id from passenger
   * @return Success
   */
  ApiV1PassageiroConsultaIdPassageiroByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponsePassageiroSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Passageiro/consulta_id_passageiro/${id}`,
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
   * @param id User Id from passenger
   * @return Success
   */
  ApiV1PassageiroConsultaIdPassageiroByIdGet(id: string): __Observable<ResponsePassageiroSummary> {
    return this.ApiV1PassageiroConsultaIdPassageiroByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponsePassageiroSummary)
    );
  }

  /**
   * @param login Id from taxist
   * @return Success
   */
  ApiV1PassageiroChecarLoginEmUsoGetResponse(login?: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (login != null) __params = __params.set('login', login.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Passageiro/checar_login_em_uso`,
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
   * @param login Id from taxist
   * @return Success
   */
  ApiV1PassageiroChecarLoginEmUsoGet(login?: string): __Observable<ResponseBoolean> {
    return this.ApiV1PassageiroChecarLoginEmUsoGetResponse(login).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param email undefined
   * @return Success
   */
  ApiV1PassageiroEmailEmUsoGetResponse(email?: string): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (email != null) __params = __params.set('email', email.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Passageiro/email_em_uso`,
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
   * @param email undefined
   * @return Success
   */
  ApiV1PassageiroEmailEmUsoGet(email?: string): __Observable<ResponseBoolean> {
    return this.ApiV1PassageiroEmailEmUsoGetResponse(email).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param params The `PassageiroService.ApiV1PassageiroInformarLocalizacaoByIdPostParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `localizacao`: Sumário da nova localização do passageiro (necessário apenas latitude e longitude)
   *
   * @return Success
   */
  ApiV1PassageiroInformarLocalizacaoByIdPostResponse(params: PassageiroService.ApiV1PassageiroInformarLocalizacaoByIdPostParams): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.localizacao;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Passageiro/informar_localizacao/${params.id}`,
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
   * @param params The `PassageiroService.ApiV1PassageiroInformarLocalizacaoByIdPostParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `localizacao`: Sumário da nova localização do passageiro (necessário apenas latitude e longitude)
   *
   * @return Success
   */
  ApiV1PassageiroInformarLocalizacaoByIdPost(params: PassageiroService.ApiV1PassageiroInformarLocalizacaoByIdPostParams): __Observable<ResponseBoolean> {
    return this.ApiV1PassageiroInformarLocalizacaoByIdPostResponse(params).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param id User Id from taxist
   * @return Success
   */
  ApiV1PassageiroClassificacaoPassageiroByIdGetResponse(id: string): __Observable<__StrictHttpResponse<ResponseInt32>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Passageiro/classificacao_passageiro/${id}`,
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
   * @param id User Id from taxist
   * @return Success
   */
  ApiV1PassageiroClassificacaoPassageiroByIdGet(id: string): __Observable<ResponseInt32> {
    return this.ApiV1PassageiroClassificacaoPassageiroByIdGetResponse(id).pipe(
      __map(_r => _r.body as ResponseInt32)
    );
  }
}

module PassageiroService {

  /**
   * Parameters for ApiV1PassageiroInformarLocalizacaoByIdPost
   */
  export interface ApiV1PassageiroInformarLocalizacaoByIdPostParams {
    id: string;

    /**
     * Sumário da nova localização do passageiro (necessário apenas latitude e longitude)
     */
    localizacao?: LocalizacaoSummary;
  }
}

export { PassageiroService }
