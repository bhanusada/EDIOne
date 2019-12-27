import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'home-info',
    templateUrl: './home-info.route.html'
})
export class HomeInfoRoute implements OnInit {
    constructor(
        public route: ActivatedRoute,
        public router: Router) {
    }

    ngOnInit(): void {
    }
}
