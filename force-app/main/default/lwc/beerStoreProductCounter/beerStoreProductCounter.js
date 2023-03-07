import { LightningElement, track} from 'lwc';

export default class BeerStoreProductCounter extends LightningElement {
    @track count = 0;

    incrementCount(){
        this.count++;
    }

    decrementCount(){
        if(this.count !== 0) {
            this.count--;
        }
    }
}