import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@env/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export class DialogModel {
  status: string = '';
  content: string = '';
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  apiUrl: string = environment.apiUrl;
  TURN_ON_PERMISSION: boolean = true;
  public loading: boolean = false;
  public todos: any = new BehaviorSubject<any>(null);
  public controlDialogCustom: BehaviorSubject<DialogModel> = new BehaviorSubject<DialogModel>(new DialogModel());
  readonly todosAction = this.todos.asObservable();
  constructor(
    public jwtHelper: JwtHelperService,
    private http: HttpClient,
    private router: Router
  ) { }

  login(val: any) {
    return this.http.post(this.apiUrl + 'auth/login', val).pipe(
      map((result: any) => {
        var tokenDecode = this.jwtHelper.decodeToken(result.accessToken);
        if (tokenDecode) {
          var userInfo = {
            name: tokenDecode.email,
            exp: tokenDecode.exp,
            nameId: tokenDecode.nameId,
            aud: tokenDecode.aud
          }

          localStorage.setItem('access_token', result.accessToken);
          localStorage.setItem('user_info', JSON.stringify(userInfo));
        }
        return result;
      })
    )
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');
    localStorage.removeItem('Permission');
    this.router.navigateByUrl('/login');
  }

  resetPassword(val: any) {

  }

  changePassword(val: any) {

  }

  get userInfo() {
    return JSON.parse(localStorage.getItem('user_info') ?? "");
  }

  isAuthenticated(): boolean {
    var token = this.getAuthorizationToken();
    if (token) {
      if (this.jwtHelper.isTokenExpired(token)) {
        console.log("Token Expired");
        return false;
      }
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    return localStorage.getItem('access_token');
  }

  canAccess(key: any, permissions: any): boolean {
    if (!this.TURN_ON_PERMISSION) {
      return true;
    }

    var hasPermission = false;
    permissions.forEach((value: any, index: any) => {
      var permission = value.key.toLowerCase();
      if (key.toLowerCase() === permission) {
        hasPermission = true;
        return;
      }
      var permissionList: any[] = permission.split('.');
      permissionList?.forEach(element => {
        if (key.toLowerCase() === element) {
          hasPermission = true;
          return;
        }
      });
    });

    return hasPermission;
  }

  checkLoading() {

  }
}
