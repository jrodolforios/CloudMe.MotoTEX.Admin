import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { BehaviorSubject } from 'rxjs';
import { UsuarioSummary } from '../../api/to_de_taxi/models';

export class Usuario
{
	public constructor(init?: Partial<UsuarioSummary>)
	{
		Object.assign(this, init);
	}
}

@Injectable()
export class UsuarioService
{
	public usuario = new BehaviorSubject<Usuario>(null);

	constructor(private authService: NbAuthService){

		this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) =>
		{
			if (token.isValid())
			{
				this.usuario.next(new Usuario(token.getPayload())); // here we receive a payload from the token and assigns it to our `user` variable 
			}
		});
	}
}
