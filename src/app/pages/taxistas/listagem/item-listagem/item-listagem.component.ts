import { Component, Input } from '@angular/core';
import { TaxistaExt, TaxistasControllerService } from '../../taxistas-controller.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
	selector: 'ngx-item-listagem-taxista',
	templateUrl: './item-listagem.component.html',
	styleUrls: ['./item-listagem.component.scss']
})
export class ItemListagemComponent
{
	@Input() taxista: TaxistaExt = null;

	constructor(
		private taxistasCtrl: TaxistasControllerService,
		private toastSrv: NbToastrService){}

	async deletar()
	{
		const self = this;

		const sucesso = await self.taxistasCtrl.removerTaxista(self.taxista);
		if (sucesso)
		{
			self.toastSrv.success("Registro removido com sucesso!", "Taxistas", {
				destroyByClick: true,
				duration: 0,
				position: NbGlobalPhysicalPosition.TOP_RIGHT
			});
			self.taxistasCtrl.atualizar();
		}
	}

	selecionar()
	{
		this.taxistasCtrl.taxistaSelecionado.next(this.taxista);
	}
}
