import { Component, OnInit } from '@angular/core';
import { childRoutes } from 'src/app/router';
import { RouteServices } from '@utilities/route.services';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  public menus: string = "";
  public menuDisplay: any[] = [];
  public currentState = 1;

  userInfo: any;
  userPermissions: any[] = [];
  constructor(
    private routeServices: RouteServices,
    private authService: AuthService

  ) {
  }

  ngOnInit(): void {
    // this.userPermissions = JSON.parse(localStorage.getItem('Permission') ?? '')
    this.initMenu();
  }

  initMenu() {
    // const menu = childRoutes?.filter(i => !i.parent && i.key && i.isMenu);
    // menu.map((route) => {
    //   if (route.isMenu) {
    //     var menu: any;
    //     if (!this.authService.canAccess(route.key.toLowerCase(), this.userPermissions)) {
    //       return;
    //     }

    //     if (route.abstract) {
    //       menu = this.renderSubMenu(route);
    //     }
    //     else {
    //       menu = this.rendermenu(route);
    //     }

    //     this.menuDisplay.push(menu);
    //   }
    // });
  }

  rendermenu(route: any) {
    var active = this.routeServices.getSelectedItem()?.path === `${route.path}` ? "active" : "";
    var menu = {
      key: route.key,
      active: active,
      text: route.text,
      path: route.path,
      icon: route.icon,
      breakdown: route.breakdown
    }
    return menu;
  }

  renderSubMenu(route: any) {
    // var open = "";
    // var subMenuItems: any[] = [];
    // var menuItems = childRoutes?.filter(x => x.parent === route.key);
    // menuItems.map((r) => {
    //   if (r.isMenu) {

    //     if (!this.authService.canAccess(r.key.toLowerCase(), this.userPermissions)) {
    //       return;
    //     }

    //     if (open != "open") {
    //       open = this.routeServices.getSelectedItem()?.key == `${r.key}` ? "open" : "";
    //     }
    //     var subMenuItem = this.renderSubMenuItem(r);
    //     subMenuItems.push(subMenuItem);
    //   }
    // });
    // var menuItem = {
    //   key: route.key,
    //   open: open,
    //   path: route.path,
    //   icon: route.icon,
    //   text: route.text,
    //   breakdown: route.breakdown,
    //   subMenus: subMenuItems
    // }
    // return menuItem
  }

  renderSubMenuItem(route: any) {
    var active = this.routeServices.getSelectedItem()?.path === `${route.path}` ? "active" : "";
    var menuSubItem = {
      key: route.key,
      active: active,
      path: route.path,
      text: route.text
    }
    return menuSubItem;
  }

  getSelectedItem() {
    const currentPath = this.routeServices.getCurrentRoutePath()?.split("/");
    const selectedItem = childRoutes?.filter(i => i.path === currentPath[1])[0];
    return selectedItem;
  }

  getActiveLink(path: any) {
    if (path == "") {
      return "";
    }
    var active = this.routeServices.getSelectedItem()?.path === `${path}` ? "active" : "";
    return active;
  }

  onClick(e: any): void {
    this.authService.todos.next(e);
  }

}
