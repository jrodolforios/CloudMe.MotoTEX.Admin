import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { CommonViewsModule } from '../../common-views/common-views.module';
import { NbLayoutModule, NbToastrModule } from '@nebular/theme';
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
		NbToastrModule,
		RouterModule.forChild(routes),
		AgmCoreModule.forRoot(
		{
			apiKey: 'AIzaSyAP_Xy-1QSclKYAvxSmAZO2BuFAWWAlOZQ'
		}),
		AgmDirectionModule
	]
})
export class MapaModule { }
