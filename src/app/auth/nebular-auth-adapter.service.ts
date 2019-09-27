import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

//import { AuthenticationService } from '@app/_services';
import { NbAuthJWTInterceptor } from '@nebular/auth';

@Injectable()
export class NebularAuthInterceptor extends NbAuthJWTInterceptor {
	constructor(injector: Injector, filter: any) { super(injector, filter); }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// add authorization header with basic auth credentials if available
		/*const currentUser = this.authenticationService.currentUserValue;
		if (currentUser && currentUser.authdata) {
			request = request.clone({
				setHeaders:
				{
					Authorization: `Basic ${currentUser.authdata}`
				}
			});
		}*/

		return next.handle(request);
	}
}