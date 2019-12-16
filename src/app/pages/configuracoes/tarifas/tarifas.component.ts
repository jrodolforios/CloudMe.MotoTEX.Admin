import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { BaseCardComponent } from '../../../common-views/base-card/base-card.component';
import { TarifaService } from '../../../../api/to_de_taxi/services';
import { TarifaSummary } from '../../../../api/to_de_taxi/models';
import { BusyStack } from '../../../@core/utils/busy_stack';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { CatalogosService } from '../../../catalogos/catalogos.service';

@Component({
	selector: 'ngx-tarifas',
	templateUrl: './tarifas.component.html',
	styleUrls: ['./tarifas.component.scss'],
})
export class TarifasComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('baseCard', null) baseCard: BaseCardComponent;
	busyStack = new BusyStack();
	busyStackSub: Subscription = null;

	constructor(
		private catalogosSrv: CatalogosService,
		private dialogSrv: NbDialogService,
		private toastSrv: NbToastrService) { }

	private tarifasChangesSub: Subscription;

	tarifasForm: FormGroup = new FormGroup({
		'id': new FormControl(0),
		'bandeirada': new FormControl(0, [Validators.required, Validators.min(0)]),
		'kmRodadoBandeira1': new FormControl(0, [Validators.required, Validators.min(0)]),
		'kmRodadoBandeira2': new FormControl(0, [Validators.required, Validators.min(0)]),
		'horaParada': new FormControl(0, [Validators.required, Validators.min(0)])
	});

	get bandeirada() { return this.tarifasForm.get('bandeirada'); }
	get kmRodadoBandeira1() { return this.tarifasForm.get('kmRodadoBandeira1'); }
	get kmRodadoBandeira2() { return this.tarifasForm.get('kmRodadoBandeira2'); }
	get horaParada() { return this.tarifasForm.get('horaParada'); }

	ngOnInit()
	{
		const self = this;

		self.busyStackSub = self.busyStack.busy.subscribe(count =>
		{
			if (self.baseCard)
			{
				self.baseCard.toggleRefresh(count > 0);
			}
		});
	}

	ngAfterViewInit()
	{
		const self = this;

		self.busyStack.push();

		self.obterTarifas();
		self.tarifasChangesSub = self.catalogosSrv.tarifas.changesSubject.subscribe(changes =>
		{
			self.obterTarifas();
		});

		self.busyStack.pop();
	}

	ngOnDestroy(): void
	{
		const self = this;
		self.busyStackSub.unsubscribe();
		self.tarifasChangesSub.unsubscribe();
	}

	obterTarifas()
	{
		const self = this;

		const novaTarifa: TarifaSummary =
		{
			id: '',
			bandeirada: 0,
			kmRodadoBandeira1: 0,
			kmRodadoBandeira2: 0,
			horaParada: 0
		};

		const tarifas = self.catalogosSrv.tarifas.items;
		const tarifa = tarifas.length > 0 ? tarifas[0] : novaTarifa;
		self.tarifasForm.setValue(tarifa);
	}

	async salvar()
	{
		const self = this;

		if (self.tarifasForm.invalid)
		{
			alert('Parâmetros inválidos');
			return;
		}

		const tarifa: TarifaSummary = {
			id: self.tarifasForm.get('id').value,
			bandeirada: +self.bandeirada.value,
			kmRodadoBandeira1: +self.kmRodadoBandeira1.value,
			kmRodadoBandeira2: +self.kmRodadoBandeira2.value,
			horaParada: +self.horaParada.value
		};

		self.busyStack.push();
		if (tarifa.id)
		{
			await self.catalogosSrv.tarifas.put(tarifa).then( resultado =>
			{
				if (resultado)
				{
					self.toastSrv.success('Tarifas atualizadas com sucesso!', 'Tarifas');
				}
			}).catch(() => {});
		}
		else
		{
			tarifa.id = UUID.UUID(); // para permitir a serialização
			await self.catalogosSrv.tarifas.post(tarifa).then( resultado =>
			{
				if (resultado)
				{
					self.toastSrv.success('Tarifas cadastradas com sucesso!', 'Tarifas');
				}
			}).catch(() => {});
		}
		self.busyStack.pop();
	}
}
