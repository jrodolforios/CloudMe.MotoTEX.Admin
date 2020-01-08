import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { TaxistasRoutingModule } from './passageiros-routing.module';
import { NbCardModule, NbListModule, NbInputModule, NbIconModule, NbActionsModule, NbDialogModule, NbSpinnerModule, NbAlertModule, NbUserModule, NbTooltipModule, NbLayoutModule, NbSelectModule, NbAccordionModule, NbButtonModule } from '@nebular/theme';
import { CommonViewsModule } from '../../common-views/common-views.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PassageirosComponent } from './passageiros.component';

@NgModule({
	declarations: [
		PassageirosComponent,
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
		NbButtonModule
	],
})
export class PassageirosModule { }
