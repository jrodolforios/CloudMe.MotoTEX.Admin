import { Component, OnInit, OnDestroy } from '@angular/core';
import { TarifaService } from '../../../api/services';
import { TarifaSummary } from '../../../api/models';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'ngx-tarifas',
	templateUrl: './tarifas.component.html',
	styleUrls: ['./tarifas.component.scss'],
})
export class TarifasComponent implements OnInit, OnDestroy {

	constructor(private tarifaSrv: TarifaService) { }

	private sub_tarifas: Subscription;

	tarifasForm: FormGroup = new FormGroup({
		'id': new FormControl(0),
		'bandeirada': new FormControl(0, [
			Validators.required,
			Validators.min(0)
		]),
		'kmRodadoBandeira1': new FormControl(0, [Validators.required, Validators.min(0)]),
		'kmRodadoBandeira2': new FormControl(0, [Validators.required, Validators.min(0)]),
		'horaParada': new FormControl(0, [Validators.required, Validators.min(0)])
	});

	ngOnInit()
	{
		const self = this;

		self.sub_tarifas = self.tarifaSrv.GetAll().subscribe(tarifas => {
			const tarifa = tarifas ? tarifas[0] : {};
			this.tarifasForm.setValue(tarifa);

			/*
			this.tarifasForm.patchValue( {
				bandeirada: tarifa ? tarifa.bandeirada : 0,
				kmRodadoBandeira1: tarifa ? tarifa.kmRodadoBandeira1 : 0,
				kmRodadoBandeira2: tarifa ? tarifa.kmRodadoBandeira2 : 0,
				horaParada: tarifa ? tarifa.horaParada : 0
			});
			*/
		});
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
			bandeirada: self.tarifasForm.get('bandeirada').value,
			kmRodadoBandeira1: self.tarifasForm.get('kmRodadoBandeira1').value,
			kmRodadoBandeira2: self.tarifasForm.get('kmRodadoBandeira2').value,
			horaParada: self.tarifasForm.get('horaParada').value
		};

		let sucesso = false;
		if (tarifa.id === undefined)
		{
			await self.tarifaSrv.Post(tarifa).toPromise().then( result => {
				sucesso = result !== null;
			});
		}
		else
		{
			await self.tarifaSrv.Put(tarifa).toPromise().then( result => {
				sucesso = result !== null;
			});
		}

		if (sucesso)
		{
			alert('Valores atualizados!');
		}
		else
		{
			alert('Erro ao atualizar valores!');
		}
	}

	ngOnDestroy(): void
	{
		const self = this;
		self.sub_tarifas.unsubscribe();
	}
}
