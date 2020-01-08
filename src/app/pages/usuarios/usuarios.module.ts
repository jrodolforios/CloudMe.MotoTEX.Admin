import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { Routes, RouterModule } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbLayoutModule, NbTooltipModule, NbAlertModule, NbCardModule, NbListModule, NbInputModule, NbIconModule, NbActionsModule, NbSpinnerModule, NbSelectModule, NbAccordionModule, NbButtonModule } from '@nebular/theme';
import { CommonViewsModule } from '../../common-views/common-views.module';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
	{
		path: '',
		component: UsuariosComponent,
	},
];


@NgModule({
	declarations: [UsuariosComponent],
	imports: [
		CommonModule,
		ThemeModule,
		FormsModule,
		ReactiveFormsModule,
		NbLayoutModule,
		NbTooltipModule,
		CommonViewsModule,
		NbAlertModule,
		RouterModule.forChild(routes),
		NbCardModule,
		NbListModule,
		NbInputModule,
		NbIconModule,
		NbActionsModule,
		NbSpinnerModule,
		NbSelectModule,
		NbAccordionModule,
		NbButtonModule,
		NgxPaginationModule,
	],

})
export class UsuariosModule { }
