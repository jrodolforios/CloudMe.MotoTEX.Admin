/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
	NbChatModule,
	NbDatepickerModule,
	NbDialogModule,
	NbMenuModule,
	NbSidebarModule,
	NbToastrModule,
	NbWindowModule,
	NbLayoutModule,
} from '@nebular/theme';
import { ApiModule } from '../api/to_de_taxi/api.module';
import { NgxMaskModule } from 'ngx-mask';
import { AuthGuard } from './auth/auth-guard.service';
import { ErrorInterceptor } from './@core/utils/error-interceptor';
import { CommonViewsModule } from './common-views/common-views.module';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { NgxUidModule  } from 'ngx-uid';

import { GlobaisService } from './globais.service';
import { CatalogosService } from './catalogos/catalogos.service';
import { CatalogoTaxistas } from './catalogos/catalogo-taxistas.service';
import { CatalogoVeiculos } from './catalogos/catalogo-veiculos.service';
import { CatalogoTarifas } from './catalogos/catalogo-tarifas.service';
import { CatalogoFaixasDesconto } from './catalogos/catalogo-faixas-desconto.service';
import { CatalogoFormasPagamento } from './catalogos/catalogo-formas-pagamento.service';
import { CatalogoFaixasDescontoTaxistas } from './catalogos/catalogo-faixas-desconto-taxistas.service';
import { CatalogoFormasPagamentoTaxistas } from './catalogos/catalogo-formas-pagamento-taxistas.service';
import { CatalogoPontosTaxi } from './catalogos/catalogo-pontos-taxi.service';
import { CatalogoVeiculosTaxistas } from './catalogos/catalogo-veiculos-taxistas.service';
import { CatalogoCorVeiculos } from './catalogos/catalogo-cores-veiculos.service';
import { CatalogoPassageiros } from './catalogos/catalogo-passageiros.service';
import { CatalogoFotos } from './catalogos/catalogo-fotos.service';
import { CatalogoLocalizacoes } from './catalogos/catalogo-localizacoes.service';
import { CatalogoContatos } from './catalogos/catalogo-Contatos.service';

export function oAuthStorageFactory(): OAuthStorage
{
	return localStorage;
}

/*export const options: Partial<IConfig> = {
};*/
const motoTexAPIBaseURL = 'https://api.mototex.cloudme.com.br';
// const motoTexAPIBaseURL = 'http://localhost:5002';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		OAuthModule.forRoot({
			resourceServer: {
				// allowedUrls: ['http://www.angular.at/api'],
				sendAccessToken: true
			}
		}),
		AppRoutingModule,
		NbLayoutModule,
		CommonViewsModule,

		ThemeModule.forRoot(),

		NgxMaskModule.forRoot(/*options*/),
		NbSidebarModule.forRoot(),
		NbMenuModule.forRoot(),
		NbDatepickerModule.forRoot(),
		NbDialogModule.forRoot(),
		NbWindowModule.forRoot(),
		NbToastrModule.forRoot(),
		NbChatModule.forRoot({
			messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
		}),
		CoreModule.forRoot(),
		ApiModule.forRoot({rootUrl: motoTexAPIBaseURL}),
		NgxUidModule.forRoot(),
	],
	providers: [
		AuthGuard,
		GlobaisService,
		CatalogosService,
		CatalogoTaxistas,
		CatalogoPassageiros,
		CatalogoFotos,
		CatalogoVeiculos,
		CatalogoVeiculosTaxistas,
		CatalogoTarifas,
		CatalogoFaixasDesconto,
		CatalogoFormasPagamento,
		CatalogoFaixasDescontoTaxistas,
		CatalogoFormasPagamentoTaxistas,
		CatalogoPontosTaxi,
		CatalogoCorVeiculos,
		CatalogoLocalizacoes,
		CatalogoContatos,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true
		},
		{ provide: OAuthStorage, useFactory: oAuthStorageFactory }
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
