import { Type } from "@angular/core";
import { LoadChildren } from "@angular/router";

export interface RouterConfig {
    key: string;
    path: string;
    text: string;
    icon: string;
    parent: string;
    data: {
        breadcrumb: string;
        model: string;
    },
    isMenu: boolean;
    component?: Type<any>;
    canActivate?: any[];
    canLoad?: any[];
    loadChildren?: LoadChildren;
}