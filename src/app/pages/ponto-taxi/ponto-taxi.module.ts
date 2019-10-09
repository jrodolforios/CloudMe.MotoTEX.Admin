import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PontoTaxiComponent } from './ponto-taxi.component';
import { CommonViewsModule } from '../../common-views/common-views.module';

@NgModule({
	declarations: [PontoTaxiComponent],
	imports: [
		CommonModule,
		CommonViewsModule
	]
})
export class PontoTaxiModule { }
