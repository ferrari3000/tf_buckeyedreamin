public with sharing class BeerProductWrapper {
    public static List<Product2> getBeerStoreProductInfo() {

        return [SELECT Id, 
                       Name, 
                       DisplayUrl, 
                       (SELECT Id, Product2Id, UnitPrice FROM PricebookEntries) 
                       FROM Product2 
                       WHERE ProductCode 
                       LIKE '%b-%' AND Name != null];
    }
}