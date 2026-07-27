import { LightningElement, track, api, wire} from 'lwc';
import {MessageContext, APPLICATION_SCOPE, publish} from 'lightning/messageService';
import DOMC from "@salesforce/messageChannel/Dev_Org_Message_Channel__c";

export default class BeerStoreProductCounter extends LightningElement {
    @api productName;
    @api productId;
    @track count = 0;
    @track msg = '';
    type = ''

    @wire(MessageContext)
    context;
 
    handleChange(event) {
        this.msg = event.detail.value;
    }
 
    handlePublish() {
            let payload = {
                source: "LWC",
                id: this.productId,
                type: this.type,
                count: this.count,
                productName: this.productName,
                messageBody: this.msg
            };
            publish(this.context, DOMC, payload);
    }

    incrementCount(){
        this.count++;
        this.type = 'increment';
        this.handlePublish();
    }

    decrementCount(){
        if(this.count !== 0) {
            this.count--;
            this.type = 'decrement';
            this.handlePublish();
        }
    }
}