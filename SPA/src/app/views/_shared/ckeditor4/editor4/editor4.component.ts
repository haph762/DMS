import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editor4',
  templateUrl: './editor4.component.html',
  styleUrls: ['./editor4.component.css']
})
export class Editor4Component implements OnInit {
  @Input() public mycontent: string = ``;
  @Input() public name: string = '';
  @Output() onChangeEditor: EventEmitter<any> = new EventEmitter();

  ckEditorConfig = {
    extraPlugins: 'uploadimage',
    forcePasteAsPlainText: true,
    width: "auto",
    removePlugins: 'exportpdf',
    uploadUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',
    // Configure your file manager integration. This example uses CKFinder 3 for PHP.
    filebrowserBrowseUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html',
    filebrowserImageBrowseUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
    filebrowserUploadUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
    filebrowserImageUploadUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images',
    // https://ckeditor.com/latest/samples/toolbarconfigurator/index.html#basic
  }
  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: any): void {
    console.log(event);
    this.mycontent = event;
    this.onChangeEditor.emit(this.mycontent);
  }
}
