/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FotoSummary } from '../models/foto-summary';
@Injectable({
  providedIn: 'root',
})
class FotoService extends __BaseService {
  static readonly GetAllPath = '/api/v1/Foto';
  static readonly PutPath = '/api/v1/Foto';
  static readonly PostPath = '/api/v1/Foto';
  static readonly GetPath = '/api/v1/Foto/{id}';
  static readonly DeletePath = '/api/v1/Foto/{id}';
  static readonly UploadPath = '/api/v1/Foto/upload';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  GetAllResponse(): __Observable<__StrictHttpResponse<Array<FotoSummary>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Foto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<FotoSummary>>;
      })
    );
  }
  /**
   * @return Success
   */
  GetAll(): __Observable<Array<FotoSummary>> {
    return this.GetAllResponse().pipe(
      __map(_r => _r.body as Array<FotoSummary>)
    );
  }

  /**
   * @param FotoSummary Modified Foto list's properties summary
   * @return Success
   */
  PutResponse(FotoSummary?: FotoSummary): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = FotoSummary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/v1/Foto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @param FotoSummary Modified Foto list's properties summary
   * @return Success
   */
  Put(FotoSummary?: FotoSummary): __Observable<string> {
    return this.PutResponse(FotoSummary).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param fotoSummary Corrida's summary
   * @return Success
   */
  PostResponse(fotoSummary?: FotoSummary): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fotoSummary;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Foto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @param fotoSummary Corrida's summary
   * @return Success
   */
  Post(fotoSummary?: FotoSummary): __Observable<string> {
    return this.PostResponse(fotoSummary).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  GetResponse(id: string): __Observable<__StrictHttpResponse<FotoSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/Foto/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FotoSummary>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  Get(id: string): __Observable<FotoSummary> {
    return this.GetResponse(id).pipe(
      __map(_r => _r.body as FotoSummary)
    );
  }

  /**
   * @param id DialList's ID
   * @return Success
   */
  DeleteResponse(id: string): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/v1/Foto/${id}`,
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
  Delete(id: string): __Observable<boolean> {
    return this.DeleteResponse(id).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param arquivo Upload File
   * @return Success
   */
  UploadResponse(arquivo: Blob): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let __formData = new FormData();
    __body = __formData;
    if (arquivo != null) { __formData.append('arquivo', arquivo as string | Blob);}
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/Foto/upload`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @param arquivo Upload File
   * @return Success
   */
  Upload(arquivo: Blob): __Observable<string> {
    return this.UploadResponse(arquivo).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module FotoService {
}

export { FotoService }
