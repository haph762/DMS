import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare const ClassicEditor: any;
declare const ImageInsert: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor5 = ClassicEditor; //DecoupledEditor;
  configCkEditor5 = {
    // plugin: [ImageInsert],
    placeholder: 'Nhập nội dung...',
    language: 'es',
    height: '800px',
    image: {
      resizeUnit: "%",
      toolbar: [
        'resizeImage',
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
        '|',
        'imageStyle:full',
        'imageStyle:side',
        '|',
        'imageTextAlternative'
      ],
      styles: [
        'full',
        'side',
        'alignLeft', 'alignCenter', 'alignRight'
      ],
      resizeOptions: [
        {
          name: 'imageResize:original',
          label: 'Original',
          value: null
        },
        {
          name: 'imageResize:50',
          label: '50%',
          value: '50'
        },
        {
          name: 'imageResize:75',
          label: '75%',
          value: '75'
        }
      ],
    },
  }
  ckeConfig: any;
  @Input() public mycontent: string;
  @Output() onChangeEditor: EventEmitter<any> = new EventEmitter();
  log: string = "";

  constructor() {
    this.mycontent = ``;
  }

  ngOnInit() {
  }

  onChange(event: any): void {
    console.log(event);
    this.mycontent = event;
    this.onChangeEditor.emit(this.mycontent);
  }

  onTest() {
    console.log("dsdsds")
  }
}
