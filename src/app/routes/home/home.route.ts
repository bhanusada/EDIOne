import { Component, OnInit } from '@angular/core';
import { GlobalLoader } from 'shared/global-loader';
import { Router } from '@angular/router';
import { SecurityService } from 'services/security.service';
import { User } from 'models/user';

@Component({
    selector: 'home',
    templateUrl: './home.route.html'
})
export class HomeRoute implements OnInit {
    constructor(
        public globalLoader: GlobalLoader,
        public router: Router,
        public securityService: SecurityService,
        public user: User) {
    }

    ngOnInit(): void {
        this.securityService.determineNavigation();
    }
}
