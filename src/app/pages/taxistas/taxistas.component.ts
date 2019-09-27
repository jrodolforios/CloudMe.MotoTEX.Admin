import { Component, OnInit } from '@angular/core';
import { TaxistasControllerService } from './taxistas-controller.service';

@Component({
	selector: 'ngx-taxistas',
	templateUrl: './taxistas.component.html',
	styleUrls: ['./taxistas.component.scss']
})
export class TaxistasComponent implements OnInit
{
	constructor(private taxistasCtrl: TaxistasControllerService) { }

	ngOnInit()
	{
		this.taxistasCtrl.atualizar();
	}
}
