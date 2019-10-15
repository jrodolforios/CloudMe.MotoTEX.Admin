import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxistasComponent } from './taxistas.component';
import { ThemeModule } from '../../@theme/theme.module';
import { TaxistasRoutingModule } from './taxistas-routing.module';
import { NbCardModule, NbListModule, NbInputModule, NbIconModule, NbActionsModule, NbDialogModule, NbSpinnerModule, NbAlertModule, NbUserModule, NbTooltipModule } from '@nebular/theme';
import { CommonViewsModule } from '../../common-views/common-views.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
	declarations: [
		TaxistasComponent,
	],
	imports: [
		CommonModule,
		NbTooltipModule,
		ThemeModule,
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
	],
})
export class TaxistasModule { }
