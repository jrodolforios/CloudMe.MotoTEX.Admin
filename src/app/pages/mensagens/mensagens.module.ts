import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { MensagensComponent } from './mensagens.component';
import { Routes, RouterModule } from '@angular/router';
import { NbTabsetModule, NbLayoutModule, NbButtonModule, NbAccordionModule, NbAlertModule, NbSelectModule, NbInputModule, NbWindowModule, NbDialogModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';
import { CaixaMensagensComponent } from './caixa-mensagens/caixa-mensagens.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

const routes: Routes = [
	{
		path: '',
		component: MensagensComponent,
	},
];


@NgModule({
	declarations: [
		MensagensComponent,
		CaixaMensagensComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),
		NbTabsetModule,
		NbButtonModule,
		NbAccordionModule,
		NbLayoutModule,
		NbAlertModule,
		NgxPaginationModule,
		NbSelectModule,
		AngularMultiSelectModule,
		NbInputModule,
		NbDialogModule.forChild(),
		NbCardModule,
		NbCheckboxModule
	],
})
export class MensagensModule { }
