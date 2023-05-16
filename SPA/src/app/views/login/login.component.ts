import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
declare const toastr: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');
    this.formGroup = this.fb.group({
      phoneNumber: ['', Validators.required],
      password: ['']
    });
  }

  login() {
    if (this.formGroup.invalid) { console.log("invalid ", this.formGroup.value); return; }
    var val = this.formGroup.value;
    this.authService.login(val)
      .subscribe(
        () => {
          toastr.success('Đăng nhập thành công');
        }, error => {
          toastr.error(error?.error?.message);
        }
      )
  }
}
