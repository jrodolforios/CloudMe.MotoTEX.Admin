import { NgModule } from '@angular/core';
import { BaseCardComponent } from './base-card/base-card.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SeletorItemComponent } from './seletor-items/seletor-items.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbCardModule, NbSpinnerModule, NbIconModule, NbListModule, NbButtonModule } from '@nebular/theme';

const COMMON_VIEWS_COMPS = [
	BaseCardComponent,
	ConfirmDialogComponent,
	SeletorItemComponent
];

@NgModule({
	imports: [
		CommonModule,
		ThemeModule.forRoot(),
		NbCardModule,
		NbSpinnerModule,
		NbIconModule,
		NbListModule,
		NbButtonModule,
		NbIconModule
	],
	declarations: [
		...COMMON_VIEWS_COMPS
	],
	exports: [
		...COMMON_VIEWS_COMPS
	],
})
export class CommonViewsModule {
}
