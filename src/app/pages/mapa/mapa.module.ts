import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa.component';
import { AgmCoreModule } from '@agm/core';
import { CommonViewsModule } from '../../common-views/common-views.module';
import { NbLayoutModule } from '@nebular/theme';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: MapaComponent,
	},
];

@NgModule({
	declarations: [MapaComponent],
	imports: [
		CommonModule,
		CommonViewsModule,
		NbLayoutModule,
		RouterModule.forChild(routes),
		AgmCoreModule.forRoot(
		{
			apiKey: 'AIzaSyAP_Xy-1QSclKYAvxSmAZO2BuFAWWAlOZQ'
		})
	]
})
export class MapaModule { }
