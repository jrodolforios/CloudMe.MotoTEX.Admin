import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeiculosComponent } from './veiculos.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { VeiculosRoutingModule } from './veiculos-routing.module';

@NgModule({
	declarations: [VeiculosComponent],
	imports: [
		CommonModule,
		VeiculosRoutingModule,
		NbCardModule,
		Ng2SmartTableModule
	]
})
export class VeiculosModule { }
