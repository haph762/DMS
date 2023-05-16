import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Injectable()
export class HttpHandleErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let message;
        if (error.status === 400) {
          // this.toastrService.error(message, 'Yêu cầu của bạn thất bại');
          //return throwError(error);
        }

        if (error.status === 410 || error.status === 403) {
          //Authorization
          debugger
          // this.toastrService.error("Phiên đăng nhập đã hết hạn hoặc bạn không có quyền truy cập!");
          this.authService.logout();
          return throwError(error);
        }

        if (error instanceof HttpErrorResponse) {
          // Server Error
          message = error.message;
          if (error.error) {
            message = error.error.message;
            //this.toastrService.error(message, 'Errors')
          }
        } else {
          // Client Error
          if (!navigator.onLine) {
            message = 'No Internet Connection';
          } else {
            message = 'Client error';
          }
        }

        return throwError(error);
      }))
      .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          if (evt.body.success == false) {
            // this.toastrService.error(evt.body.message);
          }
        }

        return evt;
      }
      ));
  }
}
