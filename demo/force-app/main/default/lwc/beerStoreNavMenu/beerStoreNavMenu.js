import { LightningElement } from 'lwc';

export default class BeerStoreNavMenu extends LightningElement {
    navMenu = {
        navItems:[
            {
                title: "Home",
                value: "Home"
            },
            {
                title: "About",
                value: "About",
            }
        ]
    }
}