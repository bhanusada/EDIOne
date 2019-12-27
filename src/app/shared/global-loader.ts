import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class GlobalLoader {

    // public showLoader = false;

    public loader = new Subject<boolean>();

    public showLoader = false;

    constructor() { }

    show() {
        this.showLoader = true;
        this.loader.next(true);
    };

    hide() {
        this.showLoader = false;
        this.loader.next(false);
    };
}
