/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { CorridaService } from './services/corrida.service';
import { EnderecoService } from './services/endereco.service';
import { FaixaDescontoService } from './services/faixa-desconto.service';
import { FaixaDescontoTaxistaService } from './services/faixa-desconto-taxista.service';
import { FavoritoService } from './services/favorito.service';
import { FormaPagamentoService } from './services/forma-pagamento.service';
import { FormaPagamentoTaxistaService } from './services/forma-pagamento-taxista.service';
import { FotoService } from './services/foto.service';
import { GrupoUsuarioService } from './services/grupo-usuario.service';
import { IdentityService } from './services/identity.service';
import { LocalizacaoService } from './services/localizacao.service';
import { PassageiroService } from './services/passageiro.service';
import { RotaService } from './services/rota.service';
import { SolicitacaoCorridaService } from './services/solicitacao-corrida.service';
import { TarifaService } from './services/tarifa.service';
import { TaxistaService } from './services/taxista.service';
import { UsuarioService } from './services/usuario.service';
import { UsuarioGrupoUsuarioService } from './services/usuario-grupo-usuario.service';
import { VeiculoService } from './services/veiculo.service';
import { VeiculoTaxistaService } from './services/veiculo-taxista.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    CorridaService,
    EnderecoService,
    FaixaDescontoService,
    FaixaDescontoTaxistaService,
    FavoritoService,
    FormaPagamentoService,
    FormaPagamentoTaxistaService,
    FotoService,
    GrupoUsuarioService,
    IdentityService,
    LocalizacaoService,
    PassageiroService,
    RotaService,
    SolicitacaoCorridaService,
    TarifaService,
    TaxistaService,
    UsuarioService,
    UsuarioGrupoUsuarioService,
    VeiculoService,
    VeiculoTaxistaService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
