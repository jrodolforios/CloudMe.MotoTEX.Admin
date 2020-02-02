import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaturamentoComponent } from '../faturamento/faturamento.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbTabsetModule, NbButtonModule, NbAccordionModule, NbLayoutModule, NbAlertModule, NbSelectModule, NbInputModule, NbDialogModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

const routes: Routes = [
	{
		path: '',
		component: FaturamentoComponent,
	},
];

@NgModule({
  declarations: [FaturamentoComponent],
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
  ]
})
export class FaturamentoModule { }
