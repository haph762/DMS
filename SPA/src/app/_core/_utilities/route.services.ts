import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { childRoutes } from "../../router";

@Injectable({
  providedIn: 'root'
})
export class RouteServices {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  getParam(paramName: string) {
    this.activatedRoute.queryParams.subscribe(params => {
      return params[paramName];
    });
  }

  getCurrentRoutePath() {
    return this.router.url;
  }

  // getPathName(): string {
  //   var url = this.router.url.replace("/", "");
  //   var menu = childRoutes?.filter(i => i.key && i.isMenu && i.path === url);
  //   return menu[0]?.text ?? "";
  // }

  getSelectedItem() {
    const currentPath = this.getCurrentRoutePath()?.split("/");
    const selectedItem = childRoutes?.filter(i => i.path === currentPath[1])[0];
    return selectedItem;
  }
}
