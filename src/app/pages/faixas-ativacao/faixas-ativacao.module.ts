import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NbCardModule, NbLayoutModule } from '@nebular/theme';
import { FaixasAtivacaoComponent } from './faixas-ativacao.component';
import { CommonViewsModule } from '../../common-views/common-views.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

const routes: Routes = [
	{
		path: '',
		component: FaixasAtivacaoComponent,
	},
];

@NgModule({
	declarations: [
		FaixasAtivacaoComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		CommonViewsModule,
		NbCardModule,
		NbLayoutModule,
		Ng2SmartTableModule
	]
})
export class FaixasAtivacaoModule { }
