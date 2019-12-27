import { Component, OnInit } from '@angular/core';
import { Base64Pipe } from 'shared/base64.pipe';
import { GlobalLoader } from 'shared/global-loader';
import { SecurityService } from 'services/security.service';
import { Router } from '@angular/router';
import { User } from 'models/user';

@Component({
    selector: 'login',
    templateUrl: './login.route.html',
    providers: [Base64Pipe]
})
export class LoginRoute implements OnInit {
    location = 'store';
    storeNumber = '';
    username = '';
    password = '';
    invalidCredentials = false;
    passwordType = 'password';
    updates: any = {
        date: 'Monday November 20, 2017',
        items: [
            { text: 'Incorporated new Date/Range Picker Component' }
        ]
    };

    storeRadioButtons: any = [
        {
            label: 'Store Number',
            checked: true,
            value: 'store'
        },
        {
            label: 'Other Location',
            checked: false,
            value: 'other'
        }
    ];

    constructor(
        public base64Pipe: Base64Pipe,
        public globalLoader: GlobalLoader,
        public securityService: SecurityService,
        public router: Router,
        public user: User) {
    }

    ngOnInit(): void {
        this.securityService.determineNavigation();
        this.setLocation = this.setLocation.bind(this);
    }

    login() {
        if (!this.disableLogin()) {
            this.globalLoader.show();
            const encryptedPassword = this.base64Pipe.transform('encode', this.password);

            if (this.location === 'other') {
                this.storeNumber = '9100';
            }

            if (this.storeNumber.length === 3) {
                this.storeNumber = '0' + this.storeNumber;
            }

            this.securityService.login(this.storeNumber, this.username, encryptedPassword)
                .then(response => this.getUserProfile())
                .catch(error => this.handleLoginFailure(error));
        }
    }

    getUserProfile() {
        this.securityService.getUserProfile()
            .then(response => this.handleLoginSuccess(response))
            .catch(error => this.handleLoginFailure(error));
    }

    handleLoginSuccess(success) {
        if (success) {
            this.invalidCredentials = false;
            this.user.setProfile(success);
            this.globalLoader.hide();
            this.router.navigateByUrl('/home');
        } else {
            this.handleLoginFailure('Invalid Login');
        }
    }

    handleLoginFailure(error) {
        this.invalidCredentials = true;
        this.globalLoader.hide();
    }

    disableLogin() {
        return (this.username === null || this.username === '') ||
            (this.password === null || this.password === '') ||
            (this.location === 'store' && (this.storeNumber === null || this.storeNumber === ''));
    }

    showPassword() {
        if (this.passwordType === 'password') {
            this.passwordType = 'text';
        } else {
            this.passwordType = 'password';
        }
    }

    setLocation($event) {
        this.location = $event.value;
    }
}
