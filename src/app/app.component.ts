import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'services/security.service';
import { GlobalLoader } from 'shared/global-loader';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    public showLoader = false;
    constructor(
        public globalLoader: GlobalLoader,
        public securityService: SecurityService
    ) { }

    ngOnInit() {
        this.securityService.determineNavigation();
        this.globalLoader.loader.subscribe(
            (loader: boolean) => {
                console.log(loader);
                this.showLoader = loader;
            }
        )
    }
}
