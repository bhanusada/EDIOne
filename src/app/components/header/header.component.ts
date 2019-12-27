/* import { Component, Input } from '@angular/core';
import { AppVersion, USE_LOGIN } from 'config/globals';
import { SecurityService } from 'services/security.service';
import { User } from 'models/user';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() empty: boolean;
    @Input() userProfile: User;

    name = 'Angular Framework';
    version = AppVersion;
    useLogin = USE_LOGIN;
    dropdownItems = [
        {
            display: 'Item1', // Display string to show in list
            value: 'item-1', // Value of selected item
            selected: true // Set as default selected value
        },
        {
            display: 'Item2', // Display string to show in list
            value: 'item-2', // Value of selected item
            selected: true // Set as default selected value
        },
        {
            display: 'Item3', // Display string to show in list
            value: 'item-3', // Value of selected item
            selected: true // Set as default selected value
        }
    ];

    constructor(
        public securityService: SecurityService) {
    }

    dropdownCallback = (value: any): void => {
        // Perform actions on value
        console.log('selected');
    };

    logout() {
        this.securityService.logout();
    }
} */

import { Component, Input, OnInit } from '@angular/core';
import { AppVersion, USE_LOGIN } from 'config/globals';
import { SecurityService } from 'services/security.service';
import { User } from 'models/user';
import { Router } from '@angular/router'
import { MenuItem } from 'models/menuitem';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() empty: boolean;
    @Input() userProfile: User;

    name = 'B2BOne UI';
    version = AppVersion;
    useLogin = USE_LOGIN;

    // isLoggedIn$: Observable<boolean>;
    LoggedIn = true;
    userMenuItems: Array<Object> = [];
    activeMenu: any;
    isIn = false;   // store state

    MENU_ITEMS: Array<MenuItem> = new Array(
        new MenuItem('home', 'Home', 'icon_home', '/home', null),
        new MenuItem('operations', 'Operations', 'icon_support-outlined', '',
            new Array<MenuItem>(
                new MenuItem('masterparm', 'Parm Switch', 'icon_bell-active', '/home/masterparm', null),
                new MenuItem('vanbacklog', 'VAN BackLog', 'icon_connected-services-outlined', '/home/support/backlogs', null),
                new MenuItem('vanreload', 'VAN Reload', 'icon_bopis', '/home/support/vanreload', null)
            )
        ),
        new MenuItem('reports', 'Analytics', 'icon_chart-bar-1-outlined', '/home/reports', null),
        new MenuItem('admincenter', 'AdminCenter', 'icon_security', '',
            new Array<MenuItem>(
                new MenuItem('siuseraudit', 'User Audit', 'icon_payment-cards', '/home/admincenter/siuseraudit', null),
                new MenuItem('b2boneaccts', 'B2BOne Account', 'icon_account', '/home/b2boneaccts', null),
            )
        )
        // new MenuItem('faq', 'FAQ', 'icon_information-filled', '/faq', null),
    )

    private ROUTING_MAP: Map<string, Array<string>> = new Map(
        [
            ['home', ['/home']],
            ['operations', ['/operations/masterparm', '/operations/vanbacklog', '/operations/vanreload']],
            ['reports', ['/home/reports']],
            ['admincenter', ['/admincenter/siuseraudit', '/admincenter/b2boneaccts']]
            // ['faq', ['/faq']]
        ]
    )

    PAGE_PERMITTED_ROLES_MAP: Map<string, Array<string>> = new Map(
        [
            ['home', ['ADMIN', 'B2B_ADMIN']],
            ['masterparm', ['ADMIN', 'B2B_ADMIN']],
            ['vanbacklog', ['ADMIN', 'B2B_ADMIN']],
            ['vanreload', ['ADMIN', 'B2B_ADMIN']],
            ['reports', ['ADMIN', 'B2B_ADMIN']],
            ['serverstatus', ['ADMIN', 'B2B_ADMIN']],
            ['siuseraudit', ['ADMIN', 'B2B_ADMIN']],
            ['b2boneaccts', ['ADMIN', 'B2B_ADMIN']],
            // ['faq', ['ADMIN', 'FAQ']]
        ]
    )

    getUserMenuItems(login: boolean) {

        const result_menu: Array<MenuItem> = new Array();
        for (const menu of this.MENU_ITEMS) {

            const menu_subMenu: Array<MenuItem> = new Array();
            if (menu.subMenu) {

                for (const subMenu of menu.subMenu) {
                    const permittedRoles = this.PAGE_PERMITTED_ROLES_MAP.get(subMenu.id);
                    if (permittedRoles) {
                        let roleExists = false;
                        for (const permittedRole of permittedRoles) {

                            roleExists = true;
                            // roleExists = roleExists || roles.includes(permittedRole);
                        }
                        if (roleExists) {

                            menu_subMenu.push(subMenu);
                        }
                    }

                }
            }
            // if to exclude Menu Item altogether if menu_subMenu is empty, Do check here and skip below
            if (menu.route || menu_subMenu.length > 0) {

                const result_menu_item: MenuItem = new MenuItem(menu.id, menu.name, menu.icon, menu.route, menu_subMenu);
                result_menu.push(result_menu_item);
            }
        }
        this.userMenuItems = result_menu;
        this.activeMenu = this.userMenuItems[0];

    }

    constructor( public securityService: SecurityService, private router: Router) {
        this.getUserMenuItems(this.LoggedIn)

    }

    ngOnInit() {
        // this.isLoggedIn$ = this.authService.isLoggedIn;

        if (this.LoggedIn) {
            this.getUserMenuItems(this.LoggedIn);
        }
        this.getMenuItemFromRoutePath(this.router.url);
    }

    dropdownCallback = (value: any): void => {
        // Perform actions on value

    };

    getMenuItemFromRoutePath(activePath: string) {
        this.ROUTING_MAP.forEach((value: string[], key: string) => {
            if (value.indexOf(activePath) > -1) {
                this.userMenuItems.forEach((menu: MenuItem) => {
                    if (menu.id === key) {

                        this.activeMenu = menu;
                    }
                });
            }
        });
    }

    setActiveMenu(menu) {

        this.activeMenu = menu;
    }

    logout() {
        this.securityService.logout();
    }
}
