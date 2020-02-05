import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'ngx-nao-autorizado',
	templateUrl: './nao-autorizado.component.html',
	styleUrls: ['./nao-autorizado.component.scss']
})
export class NaoAutorizadoComponent implements OnInit {

	constructor(private cookieService: CookieService) { }

	ngOnInit()
	{
		this.cookieService.deleteAll();
	}

}
