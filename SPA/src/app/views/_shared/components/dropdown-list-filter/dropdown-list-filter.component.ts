import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const toastr: any;

@Component({
  selector: 'app-dropdown-list-filter',
  templateUrl: './dropdown-list-filter.component.html',
  styleUrls: ['./dropdown-list-filter.component.css'],
  host: {
    'class': 'position-relative w-100'
  },
  providers: [DatePipe]
})
export class DropdownListFilterComponent implements OnInit {
  public title: string = 'Hôm nay';
  @Input() timeStart: Date = new Date();
  @Input() timeEnd: Date = new Date();
  @Output() onChangeTime = new EventEmitter<any>()
  formGroup!: FormGroup;
  submited: boolean = false;
  date: Date = new Date();
  public weekStart: Date = new Date(this.date.setDate(this.date.getDate() - this.date.getDay()));
  public weekEnd: Date = new Date(this.date.setDate((this.date.getDate() - this.date.getDay() + 6)));
  public monthStart = new Date(this.date.getFullYear(), 1, 1, 0, 1);
  public monthEnd = new Date(this.date.getFullYear(), 12, 0, 0, 1);
  public yesterday = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24);
  public today = new Date(String(new Date().getMonth() + 1).padStart(2, '0') + '/' + String(new Date().getDate()).padStart(2, '0') + '/' + new Date().getFullYear());

  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      timeStart: [this.timeStart, Validators.required],
      timeEnd: [this.timeEnd, Validators.required]
    })
  }

  ngOnInit(): void {
    let firstChild = document.getElementById("filter-dropdown-dialog")?.firstChild as any;
    firstChild.classList.add('filter-active');
  }

  openDropdownFilter() {
    this.open();
  }

  switchDate(value: any) {
    let data: any;
    switch (value) {
      case 'today':
        data = {
          timeStart: this.datePipe.transform(this.today, 'yyyy-MM-ddT00:01'),
          timeEnd: this.datePipe.transform(this.today, 'yyyy-MM-ddT23:59')
        }
        break;
      case 'yesterday':
        data = {
          timeStart: this.datePipe.transform(this.yesterday, 'yyyy-MM-ddT00:01'),
          timeEnd: this.datePipe.transform(this.yesterday, 'yyyy-MM-ddT23:59')
        }
        break;
      case 'month':
        data = {
          timeStart: this.datePipe.transform(this.monthStart, 'yyyy-MM-ddT00:01'),
          timeEnd: this.datePipe.transform(this.monthEnd, 'yyyy-MM-ddT23:59')
        }
        break;
      case 'week':
        data = {
          timeStart: this.datePipe.transform(this.weekStart, 'yyyy-MM-ddT00:01'),
          timeEnd: this.datePipe.transform(this.weekEnd, 'yyyy-MM-ddT23:59')
        }
        break;
      default:
        break;
    }
    return data;
  }

  chooesItemFilter(event: any, value: any) {
    let data = this.switchDate(value);
    this.title = event.currentTarget.textContent;
    this.onChangeTime.emit(data)
    this.close(event);
  }

  closeFilter() {
    this.close('close');
  }

  confirmFilter() {
    this.submited = true;
    if (this.formGroup.invalid) {
      toastr.error('Ngày bắt đầu và ngày kết thúc không được để trống');
      return;
    }
    var val = this.formGroup.value;
    let data = {
      timeStart: this.datePipe.transform(val.timeStart, 'yyyy-MM-ddT00:01'),
      timeEnd: this.datePipe.transform(val.timeEnd, 'yyyy-MM-ddT23:59')
    }
    this.title = this.datePipe.transform(val.timeStart, 'dd/MM/yyyy') + ' - ' + this.datePipe.transform(val.timeEnd, 'dd/MM/yyyy') ?? '';
    this.onChangeTime.emit(data);
    this.close('confirm');
    this.submited = false;
  }

  close(event: any) {
    let dialogDropdown = document.getElementById('filter-dropdown-dialog');
    if (event != 'confirm' && event != 'close') {
      dialogDropdown?.childNodes.forEach((childNode: any) => {
        childNode.classList.remove('filter-active');
      })
      event.currentTarget.classList.add('filter-active');
    }
    if (event == 'confirm') {
      dialogDropdown?.childNodes.forEach((childNode: any) => {
        childNode.classList.remove('filter-active');
      })
    }
    dialogDropdown?.classList.remove('d-block');
    dialogDropdown?.classList.add('d-none');
    document.getElementById('btn-filter')?.classList.remove('active');
  }

  open() {
    let btnFilter = document.getElementById('btn-filter');
    let dialogDropdown = document.getElementById('filter-dropdown-dialog');
    if (btnFilter?.classList.contains('active')) {
      btnFilter?.classList.remove('active')
      dialogDropdown?.classList.add('d-none');
      dialogDropdown?.classList.remove('d-block');
    } else {
      btnFilter?.classList.add('active');
      dialogDropdown?.classList.add('d-block');
      dialogDropdown?.classList.remove('d-none');
    }

  }

  get f() {
    return this.formGroup.controls;
  }
}
