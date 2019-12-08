/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResponseIEnumerableGuid } from '../models/response-ienumerable-guid';
import { ResponseIEnumerableDetalhesMensagem } from '../models/response-ienumerable-detalhes-mensagem';
import { ResponseBoolean } from '../models/response-boolean';
import { MensagemSummary } from '../models/mensagem-summary';
import { ResponseInt32 } from '../models/response-int-32';
import { MensagemMultiUsuarios } from '../models/mensagem-multi-usuarios';
@Injectable({
  providedIn: 'root',
})
class MensagemService extends __BaseService {
  static readonly ApiV1MensagemConversacoesUsrsGetPath = '/api/v1/Mensagem/conversacoes_usrs';
  static readonly ApiV1MensagemConversacoesGrpsUsrsGetPath = '/api/v1/Mensagem/conversacoes_grps_usrs';
  static readonly ApiV1MensagemMsgsUsrGetPath = '/api/v1/Mensagem/msgs_usr';
  static readonly ApiV1MensagemMsgsConversacaoUsrGetPath = '/api/v1/Mensagem/msgs_conversacao_usr';
  static readonly ApiV1MensagemMsgsConversacaoGrpUsrGetPath = '/api/v1/Mensagem/msgs_conversacao_grp_usr';
  static readonly ApiV1MensagemEnviarParaUsuarioPostPath = '/api/v1/Mensagem/enviar_para_usuario';
  static readonly ApiV1MensagemEnviarParaUsuariosPostPath = '/api/v1/Mensagem/enviar_para_usuarios';
  static readonly ApiV1MensagemEnviarParaGrupoUsuariosPostPath = '/api/v1/Mensagem/enviar_para_grupo_usuarios';
  static readonly ApiV1MensagemAlterarStatusMsgPostPath = '/api/v1/Mensagem/alterar_status_msg';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `MensagemService.ApiV1MensagemConversacoesUsrsGetParams` containing the following parameters:
   *
   * - `inicio`:
   *
   * - `id_usuario`:
   *
   * - `fim`:
   *
   * @return Success
   */
  ApiV1MensagemConversacoesUsrsGetResponse(params: MensagemService.ApiV1MensagemConversacoesUsrsGetParams): __Observable<__StrictHttpResponse<ResponseIEnumerableGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.inicio != null) __params = __params.set('inicio', params.inicio.toString());
    if (params.idUsuario != null) __params = __params.set('id_usuario', params.idUsuario.toString());
    if (params.fim != null) __params = __params.set('fim', params.fim.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Mensagem/conversacoes_usrs`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableGuid>;
      })
    );
  }
  /**
   * @param params The `MensagemService.ApiV1MensagemConversacoesUsrsGetParams` containing the following parameters:
   *
   * - `inicio`:
   *
   * - `id_usuario`:
   *
   * - `fim`:
   *
   * @return Success
   */
  ApiV1MensagemConversacoesUsrsGet(params: MensagemService.ApiV1MensagemConversacoesUsrsGetParams): __Observable<ResponseIEnumerableGuid> {
    return this.ApiV1MensagemConversacoesUsrsGetResponse(params).pipe(
      __map(_r => _r.body as ResponseIEnumerableGuid)
    );
  }

  /**
   * @param params The `MensagemService.ApiV1MensagemConversacoesGrpsUsrsGetParams` containing the following parameters:
   *
   * - `inicio`:
   *
   * - `id_usuario`:
   *
   * - `fim`:
   *
   * @return Success
   */
  ApiV1MensagemConversacoesGrpsUsrsGetResponse(params: MensagemService.ApiV1MensagemConversacoesGrpsUsrsGetParams): __Observable<__StrictHttpResponse<ResponseIEnumerableGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.inicio != null) __params = __params.set('inicio', params.inicio.toString());
    if (params.idUsuario != null) __params = __params.set('id_usuario', params.idUsuario.toString());
    if (params.fim != null) __params = __params.set('fim', params.fim.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Mensagem/conversacoes_grps_usrs`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableGuid>;
      })
    );
  }
  /**
   * @param params The `MensagemService.ApiV1MensagemConversacoesGrpsUsrsGetParams` containing the following parameters:
   *
   * - `inicio`:
   *
   * - `id_usuario`:
   *
   * - `fim`:
   *
   * @return Success
   */
  ApiV1MensagemConversacoesGrpsUsrsGet(params: MensagemService.ApiV1MensagemConversacoesGrpsUsrsGetParams): __Observable<ResponseIEnumerableGuid> {
    return this.ApiV1MensagemConversacoesGrpsUsrsGetResponse(params).pipe(
      __map(_r => _r.body as ResponseIEnumerableGuid)
    );
  }

  /**
   * @param params The `MensagemService.ApiV1MensagemMsgsUsrGetParams` containing the following parameters:
   *
   * - `inicio`:
   *
   * - `id_usuario`:
   *
   * - `fim`:
   *
   * @return Success
   */
  ApiV1MensagemMsgsUsrGetResponse(params: MensagemService.ApiV1MensagemMsgsUsrGetParams): __Observable<__StrictHttpResponse<ResponseIEnumerableDetalhesMensagem>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.inicio != null) __params = __params.set('inicio', params.inicio.toString());
    if (params.idUsuario != null) __params = __params.set('id_usuario', params.idUsuario.toString());
    if (params.fim != null) __params = __params.set('fim', params.fim.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Mensagem/msgs_usr`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableDetalhesMensagem>;
      })
    );
  }
  /**
   * @param params The `MensagemService.ApiV1MensagemMsgsUsrGetParams` containing the following parameters:
   *
   * - `inicio`:
   *
   * - `id_usuario`:
   *
   * - `fim`:
   *
   * @return Success
   */
  ApiV1MensagemMsgsUsrGet(params: MensagemService.ApiV1MensagemMsgsUsrGetParams): __Observable<ResponseIEnumerableDetalhesMensagem> {
    return this.ApiV1MensagemMsgsUsrGetResponse(params).pipe(
      __map(_r => _r.body as ResponseIEnumerableDetalhesMensagem)
    );
  }

  /**
   * @param params The `MensagemService.ApiV1MensagemMsgsConversacaoUsrGetParams` containing the following parameters:
   *
   * - `inicio`:
   *
   * - `id_usuario_conversacao`:
   *
   * - `id_usuario`:
   *
   * - `fim`:
   *
   * @return Success
   */
  ApiV1MensagemMsgsConversacaoUsrGetResponse(params: MensagemService.ApiV1MensagemMsgsConversacaoUsrGetParams): __Observable<__StrictHttpResponse<ResponseIEnumerableDetalhesMensagem>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.inicio != null) __params = __params.set('inicio', params.inicio.toString());
    if (params.idUsuarioConversacao != null) __params = __params.set('id_usuario_conversacao', params.idUsuarioConversacao.toString());
    if (params.idUsuario != null) __params = __params.set('id_usuario', params.idUsuario.toString());
    if (params.fim != null) __params = __params.set('fim', params.fim.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Mensagem/msgs_conversacao_usr`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableDetalhesMensagem>;
      })
    );
  }
  /**
   * @param params The `MensagemService.ApiV1MensagemMsgsConversacaoUsrGetParams` containing the following parameters:
   *
   * - `inicio`:
   *
   * - `id_usuario_conversacao`:
   *
   * - `id_usuario`:
   *
   * - `fim`:
   *
   * @return Success
   */
  ApiV1MensagemMsgsConversacaoUsrGet(params: MensagemService.ApiV1MensagemMsgsConversacaoUsrGetParams): __Observable<ResponseIEnumerableDetalhesMensagem> {
    return this.ApiV1MensagemMsgsConversacaoUsrGetResponse(params).pipe(
      __map(_r => _r.body as ResponseIEnumerableDetalhesMensagem)
    );
  }

  /**
   * @param params The `MensagemService.ApiV1MensagemMsgsConversacaoGrpUsrGetParams` containing the following parameters:
   *
   * - `inicio`:
   *
   * - `id_grupo_usuario`:
   *
   * - `fim`:
   *
   * @return Success
   */
  ApiV1MensagemMsgsConversacaoGrpUsrGetResponse(params: MensagemService.ApiV1MensagemMsgsConversacaoGrpUsrGetParams): __Observable<__StrictHttpResponse<ResponseIEnumerableGuid>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.inicio != null) __params = __params.set('inicio', params.inicio.toString());
    if (params.idGrupoUsuario != null) __params = __params.set('id_grupo_usuario', params.idGrupoUsuario.toString());
    if (params.fim != null) __params = __params.set('fim', params.fim.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Mensagem/msgs_conversacao_grp_usr`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseIEnumerableGuid>;
      })
    );
  }
  /**
   * @param params The `MensagemService.ApiV1MensagemMsgsConversacaoGrpUsrGetParams` containing the following parameters:
   *
   * - `inicio`:
   *
   * - `id_grupo_usuario`:
   *
   * - `fim`:
   *
   * @return Success
   */
  ApiV1MensagemMsgsConversacaoGrpUsrGet(params: MensagemService.ApiV1MensagemMsgsConversacaoGrpUsrGetParams): __Observable<ResponseIEnumerableGuid> {
    return this.ApiV1MensagemMsgsConversacaoGrpUsrGetResponse(params).pipe(
      __map(_r => _r.body as ResponseIEnumerableGuid)
    );
  }

  /**
   * @param params The `MensagemService.ApiV1MensagemEnviarParaUsuarioPostParams` containing the following parameters:
   *
   * - `mensagem`:
   *
   * - `id_usuario`:
   *
   * @return Success
   */
  ApiV1MensagemEnviarParaUsuarioPostResponse(params: MensagemService.ApiV1MensagemEnviarParaUsuarioPostParams): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.mensagem;
    if (params.idUsuario != null) __params = __params.set('id_usuario', params.idUsuario.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Mensagem/enviar_para_usuario`,
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
   * @param params The `MensagemService.ApiV1MensagemEnviarParaUsuarioPostParams` containing the following parameters:
   *
   * - `mensagem`:
   *
   * - `id_usuario`:
   *
   * @return Success
   */
  ApiV1MensagemEnviarParaUsuarioPost(params: MensagemService.ApiV1MensagemEnviarParaUsuarioPostParams): __Observable<ResponseBoolean> {
    return this.ApiV1MensagemEnviarParaUsuarioPostResponse(params).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }

  /**
   * @param mensagem_usuarios undefined
   * @return Success
   */
  ApiV1MensagemEnviarParaUsuariosPostResponse(mensagemUsuarios?: MensagemMultiUsuarios): __Observable<__StrictHttpResponse<ResponseInt32>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = mensagemUsuarios;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Mensagem/enviar_para_usuarios`,
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
   * @param mensagem_usuarios undefined
   * @return Success
   */
  ApiV1MensagemEnviarParaUsuariosPost(mensagemUsuarios?: MensagemMultiUsuarios): __Observable<ResponseInt32> {
    return this.ApiV1MensagemEnviarParaUsuariosPostResponse(mensagemUsuarios).pipe(
      __map(_r => _r.body as ResponseInt32)
    );
  }

  /**
   * @param params The `MensagemService.ApiV1MensagemEnviarParaGrupoUsuariosPostParams` containing the following parameters:
   *
   * - `mensagem`:
   *
   * - `id_grupo_usuario`:
   *
   * @return Success
   */
  ApiV1MensagemEnviarParaGrupoUsuariosPostResponse(params: MensagemService.ApiV1MensagemEnviarParaGrupoUsuariosPostParams): __Observable<__StrictHttpResponse<ResponseInt32>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.mensagem;
    if (params.idGrupoUsuario != null) __params = __params.set('id_grupo_usuario', params.idGrupoUsuario.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Mensagem/enviar_para_grupo_usuarios`,
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
   * @param params The `MensagemService.ApiV1MensagemEnviarParaGrupoUsuariosPostParams` containing the following parameters:
   *
   * - `mensagem`:
   *
   * - `id_grupo_usuario`:
   *
   * @return Success
   */
  ApiV1MensagemEnviarParaGrupoUsuariosPost(params: MensagemService.ApiV1MensagemEnviarParaGrupoUsuariosPostParams): __Observable<ResponseInt32> {
    return this.ApiV1MensagemEnviarParaGrupoUsuariosPostResponse(params).pipe(
      __map(_r => _r.body as ResponseInt32)
    );
  }

  /**
   * @param params The `MensagemService.ApiV1MensagemAlterarStatusMsgPostParams` containing the following parameters:
   *
   * - `status`:
   *
   * - `id_usuario`:
   *
   * - `id_mensagem`:
   *
   * @return Success
   */
  ApiV1MensagemAlterarStatusMsgPostResponse(params: MensagemService.ApiV1MensagemAlterarStatusMsgPostParams): __Observable<__StrictHttpResponse<ResponseBoolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.status != null) __params = __params.set('status', params.status.toString());
    if (params.idUsuario != null) __params = __params.set('id_usuario', params.idUsuario.toString());
    if (params.idMensagem != null) __params = __params.set('id_mensagem', params.idMensagem.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Mensagem/alterar_status_msg`,
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
   * @param params The `MensagemService.ApiV1MensagemAlterarStatusMsgPostParams` containing the following parameters:
   *
   * - `status`:
   *
   * - `id_usuario`:
   *
   * - `id_mensagem`:
   *
   * @return Success
   */
  ApiV1MensagemAlterarStatusMsgPost(params: MensagemService.ApiV1MensagemAlterarStatusMsgPostParams): __Observable<ResponseBoolean> {
    return this.ApiV1MensagemAlterarStatusMsgPostResponse(params).pipe(
      __map(_r => _r.body as ResponseBoolean)
    );
  }
}

module MensagemService {

  /**
   * Parameters for ApiV1MensagemConversacoesUsrsGet
   */
  export interface ApiV1MensagemConversacoesUsrsGetParams {
    inicio?: string;
    idUsuario?: string;
    fim?: string;
  }

  /**
   * Parameters for ApiV1MensagemConversacoesGrpsUsrsGet
   */
  export interface ApiV1MensagemConversacoesGrpsUsrsGetParams {
    inicio?: string;
    idUsuario?: string;
    fim?: string;
  }

  /**
   * Parameters for ApiV1MensagemMsgsUsrGet
   */
  export interface ApiV1MensagemMsgsUsrGetParams {
    inicio?: string;
    idUsuario?: string;
    fim?: string;
  }

  /**
   * Parameters for ApiV1MensagemMsgsConversacaoUsrGet
   */
  export interface ApiV1MensagemMsgsConversacaoUsrGetParams {
    inicio?: string;
    idUsuarioConversacao?: string;
    idUsuario?: string;
    fim?: string;
  }

  /**
   * Parameters for ApiV1MensagemMsgsConversacaoGrpUsrGet
   */
  export interface ApiV1MensagemMsgsConversacaoGrpUsrGetParams {
    inicio?: string;
    idGrupoUsuario?: string;
    fim?: string;
  }

  /**
   * Parameters for ApiV1MensagemEnviarParaUsuarioPost
   */
  export interface ApiV1MensagemEnviarParaUsuarioPostParams {
    mensagem?: MensagemSummary;
    idUsuario?: string;
  }

  /**
   * Parameters for ApiV1MensagemEnviarParaGrupoUsuariosPost
   */
  export interface ApiV1MensagemEnviarParaGrupoUsuariosPostParams {
    mensagem?: MensagemSummary;
    idGrupoUsuario?: string;
  }

  /**
   * Parameters for ApiV1MensagemAlterarStatusMsgPost
   */
  export interface ApiV1MensagemAlterarStatusMsgPostParams {
    status?: 0 | 1 | 2 | 3 | 4;
    idUsuario?: string;
    idMensagem?: string;
  }
}

export { MensagemService }
