/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root',
})
class EnderecoService extends __BaseService {

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  GetResponse(cep: string): __Observable<__StrictHttpResponse<Endereco>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ws/${cep}/json/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Endereco>;
      })
    );
  }
  /**
   * @return Success
   */
  Get(cep: string): __Observable<Endereco> {
    return this.GetResponse(cep).pipe(
      __map(_r => _r.body as Endereco)
    );
  }
}

module EnderecoService {
}

export { EnderecoService }
