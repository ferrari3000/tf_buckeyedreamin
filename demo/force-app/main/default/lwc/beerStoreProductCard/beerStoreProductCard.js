import { LightningElement, api} from 'lwc';

export default class BeerStoreProductCard extends LightningElement {
    @api productName
    @api productImgUrl
}