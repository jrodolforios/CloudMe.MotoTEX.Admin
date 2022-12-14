import { Component, OnInit } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
	template: ''
})
export class AuthLoginCallbackComponent implements OnInit {

	constructor(private oauthService: OAuthService, private router: Router) {}

	ngOnInit()
	{
		this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ =>
		{
			setTimeout(() => {
				if (!this.oauthService.hasValidIdToken() && !this.oauthService.hasValidAccessToken())
				{
					this.oauthService.initCodeFlow(); // reinicia o processo de login
				}
				else
				{
					this.router.navigate(['/load_resources']);
				}
			}, 1000);
		});
	}
}
