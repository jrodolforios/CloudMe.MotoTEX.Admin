/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnDestroy } from '@angular/core';
import { NbAuthOAuth2Token, NbAuthResult, NbAuthService } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';

@Component({
	selector: 'nb-playground-auth',
	templateUrl: './OAuth2-Login.Component.html',
	styleUrls: ['OAuth2-Login.Component.scss'],
})
export class OAuth2LoginComponent implements OnDestroy {

	token: NbAuthOAuth2Token;

	alive = true;

	constructor(private authService: NbAuthService) {
		this.authService.onTokenChange()
			.pipe(takeWhile(() => this.alive))
			.subscribe((token: NbAuthOAuth2Token) => {
				this.token = null;
				if (token && token.isValid()) {
					this.token = token;
				}
			});
	}

	login() {
		this.authService.authenticate('oauth2_todetaxi')
			.pipe(takeWhile(() => this.alive))
			.subscribe((authResult: NbAuthResult) => {
				authResult = authResult;
			});
	}

	logout() {
		this.authService.logout('oauth2_todetaxi')
			.pipe(takeWhile(() => this.alive))
			.subscribe((authResult: NbAuthResult) => {
				authResult = authResult;
			});
	}

	ngOnDestroy(): void {
		this.alive = false;
	}
}
