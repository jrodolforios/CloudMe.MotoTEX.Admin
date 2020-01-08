/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
	selector: 'ngx-auth-login',
	templateUrl: './auth-login.component.html',
	styleUrls: ['auth-login.component.scss'],
})
export class AuthLoginComponent implements OnDestroy {

	get authorized(): boolean
	{
		return this.oauthService.hasValidAccessToken() || this.oauthService.hasValidIdToken();
	}

	constructor(private oauthService: OAuthService){}

	public login()
	{
		this.oauthService.initCodeFlow();
	}

	public logout()
	{
		this.oauthService.logOut();
	}

	ngOnDestroy()
	{
	}
}
