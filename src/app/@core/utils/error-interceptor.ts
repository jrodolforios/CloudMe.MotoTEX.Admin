import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Notification } from '../../../api/to_de_taxi/models';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(private toastSrv: NbToastrService) { }

	intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>>
	{
		return next.handle(req).pipe
		(
			tap(evt => {
				if (evt instanceof HttpResponse)
				{
					if (evt.body && evt.body.notifications)
					{
						evt.body.notifications.forEach(notif =>
						{
							const apiNotif = notif as Notification;
							this.toastSrv.danger(apiNotif.message, apiNotif.property,
							{
								position: NbGlobalPhysicalPosition.TOP_RIGHT,
								destroyByClick: true,
								duration: 0,
								preventDuplicates: true
							});
						});
					}
				}
			}),
			catchError((err: any) =>
			{
				if (err instanceof HttpErrorResponse)
				{
					this.toastSrv.danger(err.error.message, err.error.title,
					{
						position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
						destroyByClick: true,
						duration: 0,
						preventDuplicates: true
					});
				}
				return of(err);
			})
		);
	}
}
