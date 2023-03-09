public with sharing class BeerStoreController {
    @AuraEnabled
    public static string getProducts(){
        List<Product2> beerStoreProducts = new List<Product2>();
        String payload = '{}';

        try {
            beerStoreProducts = getBeerStoreProducts();
            payload = beerStoreProductObjMapper(beerStoreProducts);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

        return payload;
    }

    private static List<Product2> getBeerStoreProducts() {
        
        return BeerProductWrapper.getBeerStoreProductInfo();
    }

    private static String beerStoreProductObjMapper(List<Product2> beerStoreProducts) {
        String payLoad = '{}';

        if(!beerStoreProducts.isEmpty()) {
            List<BeerStoreProductObj> productList = new List<BeerStoreProductObj>();

            for(Product2 product :beerStoreProducts) {
                Decimal unitPrice = 0.00;
                BeerStoreProductObj beerStoreProductObj = new BeerStoreProductObj();
                
                for(PricebookEntry pbe :product.PricebookEntries) {
                    unitPrice = pbe.UnitPrice;    
                }

                beerStoreProductObj.name = product.Name;
                beerStoreProductObj.id = product.Id;
                beerStoreProductObj.displayUrl = product.DisplayUrl;
                beerStoreProductObj.unitPrice = unitPrice;
                productList.add(beerStoreProductObj);
            }
            payLoad = JSON.serialize(productList);
        }

        return payLoad;
    }

    private class BeerStoreProductObj {
        private String name {set;}
        private String id {set;}
        private string displayUrl {set;}
        private Decimal unitPrice {set;}
    }
}