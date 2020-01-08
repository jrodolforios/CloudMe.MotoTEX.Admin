/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { AuthLoginComponent } from './auth-login.component';
import { AuthLoginCallbackComponent } from './auth-login-callback.component';

const routes: Route[] = [
	{
		path: '',
		component: AuthLoginComponent,
	},
	{
		path: 'callback',
		component: AuthLoginCallbackComponent,
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
})
export class AuthRoutingModule {}
