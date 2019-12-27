import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

    menuItems: Array<Object> = [];
    activeMenu: any;

    constructor() {
        this.menuItems = [
            {
                name: 'Home',
                icon: 'icon_home',
                route: '/home'
            },
            {
                name: 'Form Components',
                icon: 'icon_check-box-filled',
                route: 'input-showcase'
            },
            {
                name: 'Layout/Formatting',
                icon: 'icon_web',
                route: 'layouts-showcase'
            },
            {
                name: 'Messaging',
                icon: 'icon_chat',
                route: 'messaging-showcase'
            },
            {
                name: 'Navigation',
                icon: 'icon_compass',
                route: 'navigation-showcase'
            },
            {
                name: 'Report',
                icon: 'icon_compass',
                route: 'reports-showcase'
            }
        ];

        this.activeMenu = this.menuItems[0];
    }

    ngOnInit() { }

    menuAction(menu) {
        this.activeMenu = menu;
    }

}
