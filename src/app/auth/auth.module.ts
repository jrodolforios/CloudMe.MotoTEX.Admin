/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
	NbCardModule,
	NbLayoutModule,
	NbButtonModule
} from '@nebular/theme';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthLoginComponent } from './auth-login.component';
import { AuthLoginCallbackComponent } from './auth-login-callback.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		NbButtonModule,
		NbCardModule,
		NbLayoutModule,
		AuthRoutingModule,
	],
	declarations: [
		AuthLoginComponent,
		AuthLoginCallbackComponent,
	],
})
export class AuthModule {
}
