import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig =
{
	// issuer: 'http://localhost:5000',
	issuer: 'https://auth.mototex.cloudme.com.br',
	clientId: 'MotoTEXAPI_admin',
	redirectUri: window.location.origin + '/auth/callback',
	postLogoutRedirectUri: window.location.origin,
	responseType: 'code',
	scope: 'openid profile email mototexapi offline_access roles',
	dummyClientSecret: '4b80ab4c-7600-42de-991b-bb402bbf206d',
	// scope: 'openid profile email mototexapi',
	// silentRefreshRedirectUri: window.location.origin + '/auth/silent-refresh.html',
	// oidc: true,
};
