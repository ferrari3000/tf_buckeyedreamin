import { LightningElement } from 'lwc';

import lightningAppCss from '@salesforce/resourceUrl/lightningApp';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class Beer_Store extends LightningElement {
    renderedCallback() {
        if(this.rendered) {
            return;
        }
        this.rendered = true;

        loadStyle(this, lightningAppCss)
    }
}