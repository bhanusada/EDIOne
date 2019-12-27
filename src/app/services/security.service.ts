import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CONFIG } from 'config/globals';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { User } from 'models/user';
import { USE_LOGIN } from 'config/globals';

@Injectable()
export class SecurityService {

    public headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        public cookie: CookieService,
        public http: HttpClient,
        public router: Router,
        public user: User) { }

    login(storenumber, username, password) {
        const data = {
            callingProgram: CONFIG.projectInfo.appName,
            j_storenumber: storenumber,
            j_username: username,
            j_password: password
        };

        return this.http
            .post(CONFIG.authUrl , data, { headers: this.headers, withCredentials: true })
            .toPromise();
    }

    getUserProfile() {

        return this.http
            .get(CONFIG.authUrl + '/getUserProfile', { headers: this.headers, withCredentials: true })
            .toPromise();
    }

    logout() {
        this.cookie.remove('THDSSO', { 'domain': '.homedepot.com' });
        this.router.navigateByUrl('/login')
            .then(response => {
                this.user.setProfile(null);
            });
    }

    determineNavigation() {
        if (USE_LOGIN === true) {
            const THDSSO = this.cookie.get('THDSSO');
            if (THDSSO) {
                this.checkIsSessionValid();
            } else {
                this.router.navigateByUrl('/login');
            }
        } else {
            this.router.navigateByUrl('/home');
        }
    }

    checkIsSessionValid() {
        return this.http
            .get(CONFIG.authUrl + '/isSessionValid', { headers: this.headers, withCredentials: true })
            .toPromise()
            .then(response => this.handleValidationSuccess(response))
            .catch(error => this.handleValidationError(error));
    }

    handleValidationSuccess(success) {
        const isValid = success.Valid;
        if (isValid && !this.user.getProfile()) {
            this.retrieveUserProfile();
        } else if (isValid && this.user.getProfile()) {
            this.router.navigateByUrl('/home');
        } else {
            this.router.navigateByUrl('/login');
        }
    }

    handleValidationError(error) {
        this.router.navigateByUrl('/login');
        return Promise.reject(error.message || error);
    }

    retrieveUserProfile() {
        this.getUserProfile()
            .then(response => this.handleRetrievalSuccess(response))
            .catch(error => this.handleValidationError(error));
    }

    handleRetrievalSuccess(success) {
        this.user.setProfile(success);
        this.router.navigateByUrl('/home');
    }
}
