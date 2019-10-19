import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig =
{
	issuer: 'http://localhost:5000',
	clientId: 'ToDeTaxiAPI_admin',
	postLogoutRedirectUri: window.location.origin,
	redirectUri: window.location.origin + '/auth/callback',
	scope: 'openid profile email todetaxiapi',
	silentRefreshRedirectUri: window.location.origin + '/auth/silent-refresh.html',
	oidc: true,
};
