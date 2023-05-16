import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  pageSystemKey: any = "pageSystem";
  pageSystemIdKey: any = "pageSystemId";
  userInfo: any;
  currentPageSystem: any;
  pageSystems: any[] = [];

  constructor(
    private authService: AuthService,
  ) { }

  setCurrentPageSystem(pageSystem: any) {
    var stringObject = JSON.stringify(pageSystem)
    localStorage.setItem(this.pageSystemKey, stringObject);
    localStorage.setItem(this.pageSystemIdKey, pageSystem.id);
  }

  getCurrentPageSystem() {
    var pageSystem = localStorage.getItem(this.pageSystemKey) ?? "";
    if (pageSystem) {
      return JSON.parse(pageSystem);
    } else {
      return null;
    }
  }

  getCurrentPageSystemId() {
    var pageSystem = localStorage.getItem(this.pageSystemKey) ?? "";
    if (pageSystem) {
      var page = JSON.parse(pageSystem);
      return page.id;
    } else {
      return null;
    }
  }

  removePageSystem() {
    localStorage.removeItem(this.pageSystemKey);
    localStorage.removeItem(this.pageSystemIdKey);
  }
}
