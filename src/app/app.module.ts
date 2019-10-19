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
import { GlobaisService } from './globais.service';

export function oAuthStorageFactory(): OAuthStorage
{
	return localStorage;
}

/*export const options: Partial<IConfig> = {
};*/
// const toDeTaxiAPIBaseURL = 'https://api.todetaxi.com.br';
const toDeTaxiAPIBaseURL = 'http://localhost:5002';

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
		ApiModule.forRoot({rootUrl: toDeTaxiAPIBaseURL}),
	],
	providers: [
		AuthGuard,
		GlobaisService,
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
