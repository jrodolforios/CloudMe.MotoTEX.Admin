import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeiculosComponent } from './veiculos.component';
import { NbCardModule, NbDialogModule, NbInputModule, NbSpinnerModule, NbListModule, NbUserModule, NbAlertModule, NbSelectComponent, NbSelectModule } from '@nebular/theme';
import { VeiculosRoutingModule } from './veiculos-routing.module';
import { CommonViewsModule } from '../../common-views/common-views.module';
import { SeletorMarcaEditorComponent } from './seletor-marca/seletor-marca-editor.component';
import { SeletorMarcaViewComponent } from './seletor-marca/seletor-marca-view.component';
import { SeletorModeloEditorComponent } from './seletor-modelo/seletor-modelo-editor.component';
import { SeletorModeloViewComponent } from './seletor-modelo/seletor-modelo-view.component';
import { PlacaEditorComponent } from './placa/placa-editor.component';
import { FormsModule } from '@angular/forms';
import { CapacidadeEditorComponent } from './capacidade/capacidade-editor.component';
import { FotoEditorComponent } from './foto/foto-editor.component';
import { NgxMaskModule } from 'ngx-mask';
import { FotoViewComponent } from './foto/foto-view.component';
import { CorEditorComponent } from './cor/cor-editor.component';
import { CorViewComponent } from './cor/cor-view.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SeletorAnoEditorComponent } from './ano/seletor-ano-editor.component';
import { SeletorAnoViewComponent } from './ano/seletor-ano-view.component';
import { ControleCoresComponent } from './controle-cores/controle-cores.component';

const COMPONENTS = [
	VeiculosComponent,
	ControleCoresComponent,
	SeletorMarcaEditorComponent,
	SeletorMarcaViewComponent,
	SeletorModeloEditorComponent,
	SeletorModeloViewComponent,
	PlacaEditorComponent,
	CapacidadeEditorComponent,
	FotoEditorComponent,
	FotoViewComponent,
	CorEditorComponent,
	CorViewComponent,
	SeletorAnoEditorComponent,
	SeletorAnoViewComponent
];

@NgModule({
	declarations: [
		...COMPONENTS
	],
	imports: [
		CommonModule,
		FormsModule,
		CommonViewsModule,
		VeiculosRoutingModule,
		NbCardModule,
		Ng2SmartTableModule,
		NbInputModule,
		NgxMaskModule,
		NbSpinnerModule,
		NbListModule,
		NbUserModule,
		NbAlertModule,
		NbSelectModule
	]
})
export class VeiculosModule { }
