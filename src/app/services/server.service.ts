import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ServerService {

    private socket;

    constructor(private http: HttpClient) {
        this.socket = io();
        this.socket.emit('fromclient', 'Checking');
    }

    public poRefresh() {
        return new Observable((observer) => {
            this.socket.on('po_refresh', function (message) {
                console.log('refreshing');
                observer.next(message);
            })
        })
    }

    public alldocsRefresh() {
        return new Observable((observer) => {
            this.socket.on('alldocs_refresh', function (message) {
                console.log('refreshing');
                observer.next(message);
            })
        })
    }

    public tmsRefresh() {
        return new Observable((observer) => {
            this.socket.on('tms_refresh', function (message) {
                console.log('refreshing');
                observer.next(message);
            })
        })
    }

    public pomRefresh() {
        return new Observable((observer) => {
            this.socket.on('pom_refresh', function (message) {
                console.log('refreshing');
                observer.next(message);
            })
        })
    }

    public comRefresh() {
        return new Observable((observer) => {
            this.socket.on('com_refresh', function (message) {
                console.log('refreshing');
                observer.next(message);
            })
        })
    }

    public vanRefresh() {
        return new Observable((observer) => {
            this.socket.on('van_refresh', function (message) {
                console.log('refreshing');
                observer.next(message);
            })
        })
    }

    public vanbacklogsStatus() {
        return new Observable( (observer) => {
            this.socket.on('message', function(message) {
                observer.next(message);
            })
        })
    }

    public vanbacklogsCounts() {
        return new Observable( (observer) => {
            this.socket.on('counts', function(message) {
                observer.next(message);
            })
        })
    }

    public vanbacklogs(data) {
        this.socket.emit('backlogs', data);
    }

    public report() {

    }

}
