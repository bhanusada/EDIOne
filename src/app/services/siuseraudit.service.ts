import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
// import { RequestOptions } from '@angular/http/src/base_request_options';
// import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class Siuserauditservice {
    // options: RequestOptions;
    headers: HttpHeaders;
    wsparms: Object;

    constructor(
        public http: HttpClient,
        // public cookie: CookieService,
        public router: Router
    ) {
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Credentials', 'false');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }

    public userauditextract() {
        console.log('credentials............', JSON.stringify(this.wsparms));
        console.log('Header...................', this.headers);
        console.log('Header...................', this.headers);
        return this.http
            .post('https://b2bws.apps-np.homedepot.com/UserStatus',
            JSON.stringify(this.wsparms), { withCredentials: true,
                 headers: this.headers, responseType: 'json' })
            .toPromise()
    }
}
