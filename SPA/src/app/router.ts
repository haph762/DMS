import { AuthGuard } from "./_core/_guards/auth.guard";
import { ModalComponent } from "./views/_layout/modals/modal/modal.component";
import { P403Component } from "./views/_shared/components/p403/p403.component";
import { P404Component } from "./views/_shared/components/p404/p404.component";
import { P500Component } from "./views/_shared/components/p500/p500.component";

export const childRoutes = [
    {
        path: '403',
        component: P403Component,
        data: {
            title: 'Forbidden!'
        }
    },
    {
        path: '404',
        component: P404Component,
        data: {
            title: 'Not Found'
        }
    },
    {
        path: 'm',
        component: ModalComponent,
        data: {
            title: 'MMM'
        }
    },
    {
        path: '500',
        component: P500Component,
        data: {
            title: 'Server Error'
        }
    },
    // {
    //     key: 'Demo',
    //     path: 'setting',
    //     text: 'Cấu hình hệ thống',
    //     icon: 'feather icon-settings',
    //     data: {
    //         breadcrumb: 'Cấu hình hệ thống',
    //         model: 'Cấu hình hệ thống'
    //     },
    //     isMenu: true,
    //     component: SettingComponent,
    //     canActivate: [AuthGuard],
    // }
]
