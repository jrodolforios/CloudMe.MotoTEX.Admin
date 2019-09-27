import { Component, Input } from '@angular/core';
import { TaxistaExt, TaxistasControllerService } from '../../taxistas-controller.service';

@Component({
	selector: 'ngx-item-listagem-taxista',
	templateUrl: './item-listagem.component.html',
	styleUrls: ['./item-listagem.component.scss']
})
export class ItemListagemComponent
{
	@Input() taxista: TaxistaExt = null;
}
