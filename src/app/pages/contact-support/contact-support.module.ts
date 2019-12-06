import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactSupportComponent } from './contact-support/contact-support.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonViewsModule } from '../../common-views/common-views.module';
import { NbLayoutModule, NbTooltipModule, NbAlertModule, NbCardModule, NbListModule, NbInputModule, NbIconModule, NbActionsModule, NbSpinnerModule, NbUserModule, NbAccordionModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

const routes: Routes = [
	{
		path: '',
		component: ContactSupportComponent,
	},
];

@NgModule({
  declarations: [ContactSupportComponent],
  imports: [
    RouterModule.forChild(routes),
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ThemeModule,
		NbLayoutModule,
		NbTooltipModule,
		CommonViewsModule,
		NbAlertModule,
		NbCardModule,
		NbListModule,
		NbInputModule,
		NbIconModule,
		NbActionsModule,
		NbSpinnerModule,
		NbUserModule,
		NbAccordionModule
  ]
})
export class ContactSupportModule { }
