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
} from '@nebular/theme';
import { FipeApiModule } from '../api/fipe/fipe-api.module';
import { ApiModule } from '../api/to_de_taxi/api.module';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken, NbAuthJWTInterceptor, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { AuthGuard } from './auth/auth-guard.service';
import { UsuarioService } from './auth/usuario.service';

/*export const options: Partial<IConfig> = {
};*/
const toDeTaxiAPIBaseURL = 'https://localhost:44315';
const fipeAPIBaseURL = 'https://parallelum.com.br/fipe';
const authBaseEndpoint = `${toDeTaxiAPIBaseURL}/api/v1/`;

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,

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

		FipeApiModule.forRoot({rootUrl: fipeAPIBaseURL}),
		ApiModule.forRoot({rootUrl: toDeTaxiAPIBaseURL}),

		NbAuthModule.forRoot({
			strategies:
			[
				NbPasswordAuthStrategy.setup(
				{
					name: 'email',
					baseEndpoint: authBaseEndpoint,
					token:
					{
						class: NbAuthJWTToken,
						key: 'accessToken',
					},
					login:
					{
						endpoint: 'usuario/login',
						method: 'post',
					},
					register:
					{
						endpoint: 'usuario/registrar',
						method: 'post',
					},
					logout:
					{
						endpoint: 'usuario/logout',
						method: 'post',
					},
					requestPass:
					{
						endpoint: 'usuario/solicitar_senha',
						method: 'post',
					},
					resetPass:
					{
						endpoint: 'usuario/trocar_senha',
						method: 'post',
					},
				})
			],
			forms: {}
		})
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
			provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
			useValue: function (req: HttpRequest<any>)
			{
				if (req.url === `${authBaseEndpoint}refresh-token`)
				{
					return true;
				}
				return false;
			},
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
