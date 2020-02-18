import { NgModule } from '@angular/core';
import {
	NbCardModule,
	NbIconModule,
	NbSpinnerModule,
	NbInputModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { ProgressSectionComponent } from './progress-section/progress-section.component';
import { PieChartModule } from '@swimlane/ngx-charts';
import { CorridasComponent } from './corridas/corridas.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule } from '@angular/forms';
import { SolicitacoesCorridaComponent } from './solicitacoes-corrida/solicitacoes-corrida.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
	},
];

@NgModule({
	imports: [
		ThemeModule,
		FormsModule,
		CommonModule,
		RouterModule.forChild(routes),
		NbCardModule,
		NbIconModule,
		NbInputModule,
		NbSpinnerModule,
		PieChartModule,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
	],
	declarations: [
		DashboardComponent,
		ProgressSectionComponent,
		CorridasComponent,
		SolicitacoesCorridaComponent
	],
	entryComponents: [
		CorridasComponent,
		SolicitacoesCorridaComponent
	]
})
export class DashboardModule { }
