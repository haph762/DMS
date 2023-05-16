import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { P403Component } from './components/p403/p403.component';
import { P404Component } from './components/p404/p404.component';
import { P500Component } from './components/p500/p500.component';
import { ImageWithFallbackComponent, ImageWithFallbackDirective } from './components/img-with-fallback/img-with-fallback.component';
import { RouterModule } from '@angular/router';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { LoaddingComponent } from './components/loadding/loadding.component';
import { EditorComponent } from './components/editor/editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NotiToastrComponent } from './components/noti-toastr/noti-toastr.component';
import { DropdownListFilterComponent } from './components/dropdown-list-filter/dropdown-list-filter.component';

import { DatePickerAllModule, DatePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [
    SideBarComponent,
    NavBarComponent,
    FooterComponent,
    P403Component,
    P404Component,
    P500Component,
    ImageWithFallbackDirective,
    ImageWithFallbackComponent,
    BreadCrumbComponent,
    LoaddingComponent,
    EditorComponent,
    NotiToastrComponent,
    DropdownListFilterComponent,
  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerAllModule,
    DatePickerModule,
    DateTimePickerModule,
    CKEditorModule
  ]

  , exports: [
    SideBarComponent,
    NavBarComponent,
    FooterComponent,
    P403Component,
    P404Component,
    P500Component,
    ImageWithFallbackDirective,
    ImageWithFallbackComponent,
    BreadCrumbComponent,
    LoaddingComponent,
    EditorComponent,
    DropdownListFilterComponent,
    NotiToastrComponent
  ]
})
export class SharedModule { }
