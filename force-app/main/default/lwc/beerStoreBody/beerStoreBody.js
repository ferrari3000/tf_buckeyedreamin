import { LightningElement } from 'lwc';

import getBeerStoreProducts from '@salesforce/apex/BeerStoreController.getProducts';

export default class BeerStoreBody extends LightningElement {
    products = [];
    response = {};

    fetchProductData() {
        if(Object.keys(this.response).length === 0) {  
            getBeerStoreProducts({
            
            }).then(response => {
                if(response) {
                    this.response = response;
                    this.products = JSON.parse(response);
                }
                
            }).catch(err => {
                console.error('Error getting beer store products:');
                console.error(err);
            });
        }  
    }

    renderedCallback() {
        if(this.rendered) {
            return;
        }
        this.rendered = true;

        this.fetchProductData();
    }
}