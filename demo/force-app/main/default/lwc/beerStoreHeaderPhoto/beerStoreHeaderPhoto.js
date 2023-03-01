import { LightningElement, api} from 'lwc';

export default class BeerStoreHeaderPhoto extends LightningElement {
    @api url;
    @api height;
    @api width;
}