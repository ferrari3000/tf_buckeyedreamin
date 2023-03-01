import { LightningElement, api} from 'lwc';

export default class BeerStoreHeaderPhoto extends LightningElement {
    @api imageURL;
    @api height;
    @api width;
    
    renderedCallback() {
        if (this.rendered) {
            return;
        }
        console.log('Haaaaaaalp '+ this.imageURL);
        this.rendered = true;
    }
}