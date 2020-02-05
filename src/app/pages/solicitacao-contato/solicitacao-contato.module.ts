import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitacaoContatoComponent } from './solicitacao-contato.component';
import { Routes, RouterModule } from '@angular/router';
import { NbCardModule, NbListModule, NbInputModule, NbIconModule, NbActionsModule, NbDialogModule, NbSpinnerModule, NbAlertModule, NbUserModule, NbTooltipModule, NbLayoutModule, NbSelectModule, NbAccordionModule, NbButtonModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonViewsModule } from '../../common-views/common-views.module';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
	{
		path: '',
		component: SolicitacaoContatoComponent,
	},
];

@NgModule({
  declarations: [SolicitacaoContatoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    CommonModule,
		ThemeModule,
		FormsModule,
		ReactiveFormsModule,
		NbLayoutModule,
		NbTooltipModule,
		CommonViewsModule,
		NbAlertModule,
		NbCardModule,
		NbListModule,
		NbInputModule,
		NbIconModule,
		NbActionsModule,
		NbSpinnerModule,
		NbUserModule,
		NbSelectModule,
		NbAccordionModule,
		NbButtonModule,
		NgxPaginationModule
  ]
})
export class SolicitacaoContatoModule { }
