import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthJWTToken, NbAuthOAuth2JWTToken } from '@nebular/auth';
import { BehaviorSubject } from 'rxjs';
//import { UsuarioSummary } from '../../api/to_de_taxi/models';

/*export class Usuario implements UsuarioSummary
{
	id?: string;
	login?: string;
	senha?: string;
	nome?: string;
	tipo?: any;

	public constructor(init?: Partial<UsuarioSummary>)
	{
		Object.assign(this, init);
	}
}*/

@Injectable()
export class UsuarioService
{
	//public usuario = new BehaviorSubject<Usuario>(null);
	public id_usuario = new BehaviorSubject<string>(null);

	constructor(private authService: NbAuthService){

		this.authService.onTokenChange().subscribe((token: NbAuthOAuth2JWTToken) =>
		{
			if (token.isValid())
			{
				const payload = token.getPayload();
				//this.usuario.next(new Usuario(token.getPayload())); // here we receive a payload from the token and assigns it to our `user` variable 
				this.id_usuario.next(token.getPayload()); // here we receive a payload from the token and assigns it to our `user` variable 
			}
		});
	}
}
