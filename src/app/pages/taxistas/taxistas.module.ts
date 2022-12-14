import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxistasComponent } from './taxistas.component';
import { ThemeModule } from '../../@theme/theme.module';
import { TaxistasRoutingModule } from './taxistas-routing.module';
import { NbCardModule, NbListModule, NbInputModule, NbIconModule, NbActionsModule, NbDialogModule, NbSpinnerModule, NbAlertModule, NbUserModule, NbTooltipModule, NbLayoutModule, NbSelectModule, NbAccordionModule, NbButtonModule } from '@nebular/theme';
import { CommonViewsModule } from '../../common-views/common-views.module';
import { VeiculosTaxistaComponent } from './veiculos-taxista/veiculos-taxista.component';
import { PontoTaxiComponent } from './ponto-taxi/ponto-taxi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
	declarations: [
		TaxistasComponent,
		VeiculosTaxistaComponent,
		PontoTaxiComponent,
	],
	imports: [
		CommonModule,
		ThemeModule,
		FormsModule,
		ReactiveFormsModule,
		NbLayoutModule,
		NbTooltipModule,
		CommonViewsModule,
		NbAlertModule,
		TaxistasRoutingModule,
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
		NgxPaginationModule,
	],
})
export class TaxistasModule { }
