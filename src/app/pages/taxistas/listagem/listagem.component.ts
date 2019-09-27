import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { TaxistasControllerService, TaxistaExt } from '../taxistas-controller.service';
import { Subscription } from 'rxjs';
import { BaseCardComponent } from '../../../common-views/base-card/base-card.component';

@Component({
	selector: 'ngx-listagem-taxistas',
	templateUrl: './listagem.component.html',
	styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('base_card', null) baseCard: BaseCardComponent;

	constructor(private taxistasCtrl: TaxistasControllerService) {}

	taxistas: TaxistaExt[] = [];
	taxistasSub: Subscription;

	busyStackAtualizarSub: Subscription = null;
	busyStackRemoverSub: Subscription = null;

	ngOnInit(): void
	{
	}

	ngAfterViewInit(): void
	{
		const self = this;

		const refreshingCallback = () =>
		{
			if (self.baseCard)
			{
				self.baseCard.toggleRefresh(
					self.taxistasCtrl.busyStackAtualizar.busy.value > 0 &&
					self.taxistasCtrl.busyStackRemover.busy.value > 0);
			}
		};

		self.busyStackAtualizarSub = self.taxistasCtrl.busyStackAtualizar.busy.subscribe(refreshingCallback);
		self.busyStackRemoverSub = self.taxistasCtrl.busyStackRemover.busy.subscribe(refreshingCallback);

		self.taxistasSub = self.taxistasCtrl.taxistas.subscribe(novos_taxistas =>
		{
			self.taxistas = novos_taxistas;
		});
	}

	ngOnDestroy(): void
	{
		const self = this;
		self.taxistasSub.unsubscribe();
	}
}
