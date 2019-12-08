import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagensComponent } from './mensagens.component';
import { Routes, RouterModule } from '@angular/router';
import { NbTabsetModule, NbLayoutModule, NbButtonModule, NbAccordionModule, NbAlertModule } from '@nebular/theme';
import { CompositorComponent } from './compositor/compositor.component';

const routes: Routes = [
	{
		path: '',
		component: MensagensComponent,
	},
];


@NgModule({
	declarations: [
		MensagensComponent,
		CompositorComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NbTabsetModule,
		NbButtonModule,
		NbAccordionModule,
		NbLayoutModule,
		NbAlertModule
	]
})
export class MensagensModule { }
