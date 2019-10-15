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
	NbTooltipModule,
} from '@nebular/theme';
import { FipeApiModule } from '../api/fipe/fipe-api.module';
import { ApiModule } from '../api/to_de_taxi/api.module';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import { NbAuthJWTInterceptor, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { AuthGuard } from './auth/auth-guard.service';
import { UsuarioService } from './auth/usuario.service';
import { OAuth2Module } from './pages/oauth2/oauth2.module';
import { ViaCEPModule } from '../api/viacep/viacep.module';
import { ErrorInterceptor } from './@core/utils/error-interceptor';
import { CommonViewsModule } from './common-views/common-views.module';

/*export const options: Partial<IConfig> = {
};*/
//const toDeTaxiAPIBaseURL = 'https://api.todetaxi.com.br';
const toDeTaxiAPIBaseURL = 'http://localhost:5002';
const fipeAPIBaseURL = 'https://parallelum.com.br/fipe';
const viaCEPAPIBaseURL = 'https://viacep.com.br';
const authBaseEndpoint = `${toDeTaxiAPIBaseURL}/api/v1/usuario/`;

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
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
		NbTooltipModule,
		CoreModule.forRoot(),

		FipeApiModule.forRoot({rootUrl: fipeAPIBaseURL}),
		ApiModule.forRoot({rootUrl: toDeTaxiAPIBaseURL}),
		ViaCEPModule.forRoot({rootUrl: viaCEPAPIBaseURL}),

		OAuth2Module

	],
	providers: [
		AuthGuard,
		UsuarioService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: NbAuthJWTInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true
		},
		{ provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: (req) => {return false;}},
		/*{
			provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
			useValue: function (req: HttpRequest<any>)
			{
				if (req.url === `${authBaseEndpoint}refresh-token`)
				{
					return true;
				}
				return false;
			},
		},*/
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
