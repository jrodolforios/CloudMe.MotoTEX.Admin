/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';
import { MarcaVeiculo } from '../models/marca-veiculo';

@Injectable({
  providedIn: 'root',
})
class MarcaVeiculoService extends __BaseService {
  static readonly GetAllPath = '/api/v1/carros/marcas';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  GetAllResponse(): __Observable<__StrictHttpResponse<Array<MarcaVeiculo>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/carros/marcas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<MarcaVeiculo>>;
      })
    );
  }
  /**
   * @return Success
   */
  GetAll(): __Observable<Array<MarcaVeiculo>> {
    return this.GetAllResponse().pipe(
      __map(_r => _r.body as Array<MarcaVeiculo>)
    );
  }
}

module MarcaVeiculoService {
}

export { MarcaVeiculoService }
