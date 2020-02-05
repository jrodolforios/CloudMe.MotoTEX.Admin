import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbLayoutModule } from '@nebular/theme';

import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { Routes, RouterModule } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

const routes: Routes = [
	{
		path: '',
		component: NaoAutorizadoComponent,
	},
];

@NgModule({
	declarations:
	[
		NaoAutorizadoComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NbLayoutModule,
		NbCardModule
	],
	providers: [CookieService]
})
export class NaoAutorizadoModule { }
