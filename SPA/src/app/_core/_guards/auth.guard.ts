import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from '@angular/router';
import { AuthService } from '@services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLogin: boolean = true;
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    var nextRouteConfig = next.routeConfig;
    var path = nextRouteConfig?.path;
    var loggedIn = this.checkLogin();

    if (state.url == "" || state.url == "/") {
      return true;
    }

    var active = loggedIn ? true : false;
    if (!active) {
      this.router.navigateByUrl("/login");
    }

    return true;
  }

  checkLogin(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    return this.checkLogin();
  }
}
