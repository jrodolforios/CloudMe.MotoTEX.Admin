import { NgModule } from '@angular/core';
import {
	NbCardModule,
	NbIconModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { ProgressSectionComponent } from './progress-section/progress-section.component';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
	},
];

@NgModule({
	imports: [
		ThemeModule,
		RouterModule.forChild(routes),
		NbCardModule,
		NbIconModule,
	],
	declarations: [
		DashboardComponent,
		ProgressSectionComponent
	]
})
export class DashboardModule { }
