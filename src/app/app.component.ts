/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbIconLibraries } from '@nebular/theme';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth/auth.config';
import { Router } from '@angular/router';

@Component({
	selector: 'ngx-app',
	template:
	`
	<router-outlet></router-outlet>
	`
})
export class AppComponent implements OnInit, OnDestroy {

	constructor(
		private analytics: AnalyticsService,
		private iconLibraries: NbIconLibraries,
		private oauthService: OAuthService,
		private router: Router)
	{
		this.iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa' });
		this.iconLibraries.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
		this.iconLibraries.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
		this.iconLibraries.registerFontPack('ion', { iconClassPrefix: 'ion' });
		this.configureWithNewConfigApi();
	}

	private async configureWithNewConfigApi()
	{
		this.oauthService.configure(authConfig);
		this.oauthService.setStorage(localStorage);
		this.oauthService.tokenValidationHandler = new JwksValidationHandler();
		this.oauthService.setupAutomaticSilentRefresh();

		await this.oauthService.loadDiscoveryDocumentAndTryLogin();
		if (this.oauthService.hasValidIdToken() || this.oauthService.hasValidAccessToken())
		{
			this.router.navigate(['/pages/dashboard']);
		}
	}

	ngOnInit(): void
	{
		this.analytics.trackPageViews();
	}

	ngOnDestroy(): void
	{
		this.analytics.trackPageViews();
	}
}
