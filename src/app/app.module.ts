import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatMenuModule, MatTabsModule, MatListModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UXStyleguideModule } from 'ux-angular-styleguide';

import { AppRoutingModule, RoutedComponents } from './routes/app.routes';
import { CookieModule } from 'ngx-cookie';
import { ChartsModule } from 'ng2-charts';

// Small sample component used for dymanic tabs/accordion
import { SampleContent } from './components/sample-content';

/* Components */
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { ReportsComponent } from './components/reports/reports.component';

/* Models */
import { User } from './models/user';
import { MenuItem } from './models/menuitem';

/* Services */
import { SecurityService } from './services/security.service';

/* Shared */
import { Base64Pipe } from './shared/base64.pipe';
import { GlobalLoader } from './shared/global-loader';
import { MenuComponent } from './components/menu/menu.component';
import { PotypeComponent } from './components/reports/potype/potype.component';
import { AlldocstypeComponent } from './components/reports/alldocstype/alldocstype.component';
import { VanprobeComponent } from './components/reports/vanprobe/vanprobe.component';
import { HomeComponent } from './components/home/home.component';
import { TmsComponent } from './components/reports/tms/tms.component';
import { SupportComponent } from './components/support/support.component';
import { VanbacklogsComponent } from './components/support/vanbacklogs/vanbacklogs.component';
import { AdmincenterComponent } from './components/admincenter/admincenter.component';
import { UserauditComponent } from './components/admincenter/useraudit/useraudit.component';
import { TableCardComponent } from './components/table-card/table-card.component';

@NgModule({
    declarations: [
        SampleContent,
        AppComponent,
        Base64Pipe,
        HeaderComponent,
        MenuComponent,
        RoutedComponents,
        SearchComponent,
        ReportsComponent,
        PotypeComponent,
        AlldocstypeComponent,
        VanprobeComponent,
        HomeComponent,
        TmsComponent,
        SupportComponent,
        VanbacklogsComponent,
        AdmincenterComponent,
        UserauditComponent,
        TableCardComponent
    ],
    entryComponents: [SampleContent], // Needed to declare dynamic components
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        CookieModule.forRoot(),
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        // MaterialModule,
        NgxDatatableModule,
        MatMenuModule,
        MatListModule,
        UXStyleguideModule,
        MatCardModule,
        MatTabsModule,
        ChartsModule
    ],
    providers: [
        GlobalLoader,
        SecurityService,
        User
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
