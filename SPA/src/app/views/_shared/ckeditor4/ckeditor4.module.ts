import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Editor4Component } from './editor4/editor4.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';



@NgModule({
  declarations: [
    Editor4Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule
  ],
  exports: [
    Editor4Component
  ]
})
export class Ckeditor4Module { }
