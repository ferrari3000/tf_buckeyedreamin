import { LightningElement, track, wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import DOMC from "@salesforce/messageChannel/Dev_Org_Message_Channel__c";
import {MessageContext, APPLICATION_SCOPE, subscribe, unsubscribe} from 'lightning/messageService';
export default class BeerStoreCart extends LightningElement {
    @track receivedMessage = '';
    @track count = 0;
    subscription = null;
    products = [];

    @wire(MessageContext)
    messageContext;
 
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                DOMC,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
 
    handleMessage(event) {
        if (event) {
            this.addProductToCart(event);
        }
    }

    addProductToCart(event) {
            let eventCopy = {...event};
            let message = event.messageBody;
            let source = event.source;
            let count = event.count;
            let type = event.type;
            this.receivedMessage = 'Message: ' + message + '.\n \n Sent From: ' + source;
            this.updateCount(count, type);
            this.updateCart(eventCopy);
            this.showNotification('Success',  'Cart Updated', 'success', null);
    }

    updateCount(count, type) {
        type === 'increment' ? this.count++ : this.count--;
        return;
    }

    updateCart(obj) {
        let foundIndex = this.products.findIndex(element => element.id === obj.id);
        let productCount = Number(0);
        
        if(foundIndex === -1) {
            delete obj['type'];
            this.products.push(obj);
        }
        else {
            productCount = Number(obj.count);

            try{
                if(obj.count !== undefined && obj.count === 0) {
                    this.products.splice(foundIndex, 1);
                }
                else {
                    obj.type === 'increment' ? this.products[foundIndex].count ++  : this.products[foundIndex].count --;
                }
            }
            catch(e) {
                console.log(e.message);
            }
        }
        
        return;
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    showNotification(errorTitle, errorMessage, errorVariant, errorMode) {
        // const evt = new ShowToastEvent({
        //     title: errorTitle,
        //     message: errorMessage,
        //     variant: errorVariant,
        //     mode: errorMode,
        // });
        // this.dispatchEvent(evt);
    }
}