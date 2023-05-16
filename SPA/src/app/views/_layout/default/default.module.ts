import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { SharedModule } from '../../_shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LoginComponent } from '../../login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { CheckBoxModule, RadioButtonModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerAllModule, DatePickerModule, DateTimePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ComboBoxModule, DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Ckeditor4Module } from '../../_shared/ckeditor4/ckeditor4.module';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TreeGridAllModule,
    CheckBoxModule,
    DatePickerAllModule,
    RichTextEditorModule,
    NumericTextBoxModule,
    SwitchModule,
    CdkStepperModule,
    DateTimePickerModule,
    GridAllModule,
    RadioButtonModule,
    DatePickerModule,
    TreeViewModule,
    ComboBoxModule,
    MultiSelectModule,
    DropDownListModule,
    ComboBoxModule,
    MatStepperModule,
    CKEditorModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    TimePickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyByuLGCZhnVJEc0nD60Qcn3UeHPEn6y8lQ',
      language: 'vi',
      libraries: ['geometry', 'places']
    }),
    Ckeditor4Module
  ],
  exports: [DefaultComponent]
})
export class DefaultModule { }
