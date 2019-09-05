/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';
import { ModeloVeiculo } from '../models/modelo-veiculo';

@Injectable({
  providedIn: 'root',
})
class ModeloVeiculoService extends __BaseService {
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
  GetAllResponse(codigo_modelo: string): __Observable<__StrictHttpResponse<Array<ModeloVeiculo>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/carros/marcas/${codigo_modelo}/modelos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ModeloVeiculo>>;
      })
    );
  }
  /**
   * @return Success
   */
  GetAll(codigo_modelo: string): __Observable<Array<ModeloVeiculo>> {
    return this.GetAllResponse(codigo_modelo).pipe(
      __map(_r => _r.body as Array<ModeloVeiculo>)
    );
  }
}

module ModeloVeiculoService {
}

export { ModeloVeiculoService }
