import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig =
{
	issuer: 'http://localhost:5000',
	clientId: 'ToDeTaxiAPI_admin',
	redirectUri: window.location.origin + '/auth/callback',
	postLogoutRedirectUri: window.location.origin,
	responseType: 'code',
	scope: 'openid profile email todetaxiapi offline_access',
	dummyClientSecret: '4b80ab4c-7600-42de-991b-bb402bbf206d',
	// scope: 'openid profile email todetaxiapi',
	// silentRefreshRedirectUri: window.location.origin + '/auth/silent-refresh.html',
	// oidc: true,
};
