import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-noti-toastr',
  templateUrl: './noti-toastr.component.html',
  styleUrls: ['./noti-toastr.component.css']
})
export class NotiToastrComponent implements OnInit {
  @Input() title: string = 'Sản phẩm';
  @ViewChild('dialogModal', { static: true }) public modal!: ElementRef
  public content: string = '';
  public run: boolean = true;
  startTime!: Date;
  stopTime!: Date;

  constructor(
    private authService: AuthService
  ) {

  }
  ngOnInit(): void {
    this.authService.controlDialogCustom.subscribe(
      (res) => {
        if (res) {
          switch (res.status) {
            case 'sync':
              this.start()
              this.modal.nativeElement.style.display = 'block';
              this.run = true;
              this.content = '';
              break;
            case 'done':
              this.stop();
              this.content = res.content;
              break;
            default:
              break;
          }
        }
      }
    )

  }

  get display() { return (this.startTime && this.stopTime) ? +this.stopTime - +this.startTime : 0 }

  timer() {
    if (this.run) {
      this.stopTime = new Date()
      setTimeout(() => {
        this.timer()
      }, 1000)
    }
  }

  start() {
    this.startTime = new Date()
    this.stopTime = this.stopTime
    this.run = true;
    this.timer()
  }

  stop() {
    this.stopTime = new Date()
    this.run = false
  }

  resetTime() {
    this.startTime = new Date()
    this.stopTime = this.stopTime
    this.run = false
    this.timer()
    this.content = '';
  }

  close() {
    this.modal.nativeElement.style.display = "none";
    this.resetTime();
  }

}
