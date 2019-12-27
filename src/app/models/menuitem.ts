import { Injectable } from '@angular/core';

export class MenuItem {

    public id: string;
    public name: string;
    public icon: string;
    public route: string;
    public subMenu: Array<MenuItem>;

    constructor(id?: string, name?: string, icon?: string, route?: string, subMenu?: Array<MenuItem>) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.route = route;
        this.subMenu = subMenu;
    }

    setSubMenu(subMenu: Array<MenuItem>) {
        this.subMenu = subMenu;
    }
}
