import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

	constructor(
		private router: Router,
		private oauthService: OAuthService)
	{
	}

	canActivate()
	{
		if (this.oauthService.hasValidIdToken() || this.oauthService.hasValidAccessToken())
		{
			return true;
		}
		else
		{
			this.router.navigate(['/auth']);
		}
	}

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot)
	{
		return this.canActivate();
	}
}
