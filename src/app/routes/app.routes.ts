import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRoute } from 'routes/login/login.route';
import { HomeRoute } from 'routes/home/home.route';
import { HomeComponent } from '../components/home/home.component';
import { HomeInfoRoute } from 'routes/home/home-info.route';
import { ReportsComponent } from '../components/reports/reports.component';
import { PotypeComponent } from '../components/reports/potype/potype.component';
import { AlldocstypeComponent } from '../components/reports/alldocstype/alldocstype.component';
import { VanprobeComponent } from '../components/reports/vanprobe/vanprobe.component';
import { TmsComponent } from '../components/reports/tms/tms.component';
import { SupportComponent } from '../components/support/support.component';
import { VanbacklogsComponent } from '../components/support/vanbacklogs/vanbacklogs.component';
import { AdmincenterComponent } from '../components/admincenter/admincenter.component';
import { UserauditComponent } from '../components/admincenter/useraudit/useraudit.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginRoute
    },
    {
        path: 'home',
        component: HomeRoute,
        children: [
            { path: '', redirectTo: 'info', pathMatch: 'full' },
            { path: 'info', component: HomeComponent },
            { path: 'reports', component: ReportsComponent, children: [
                { path: '', component: AlldocstypeComponent },
                { path: 'po', component:  PotypeComponent },
                { path: 'van', component: VanprobeComponent },
                { path: 'tms', component: TmsComponent }
            ]},
            { path: 'support', component: SupportComponent, children: [
                { path: 'backlogs', component: VanbacklogsComponent}
            ]},
            { path: 'admincenter', component: AdmincenterComponent, children: [
                { path: 'siuseraudit', component: UserauditComponent }
            ] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutedComponents = [LoginRoute, HomeRoute, HomeInfoRoute, ReportsComponent];
