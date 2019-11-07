import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarregamentoComponent } from './carregamento.component';
import { NbCardModule, NbLayoutModule } from '@nebular/theme';

const routes: Routes = [
	{
		path: '',
		component: CarregamentoComponent,
	},
];

@NgModule({
	declarations: [
		CarregamentoComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NbCardModule,
		NbLayoutModule,
	]
})
export class CarregamentoModule { }
