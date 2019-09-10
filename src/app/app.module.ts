/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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

/*export const options: Partial<IConfig> = {
};*/

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

		FipeApiModule.forRoot({rootUrl: 'https://parallelum.com.br/fipe'}),
		ApiModule.forRoot({rootUrl: 'https://localhost:44315'}),
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
