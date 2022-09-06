@isTest
public class VolandoController_Test {

    @testSetup static void setup() {
        //Creation of Airport Container to avoid 101
        List < Airport__c > aList = new List < Airport__c > ();

        Airport__c a = new Airport__c(
            Name = 'Barcelona',
            IATA__c = 'BCN',
            Location__Latitude__s = 1,
            Location__longitude__s = 1);
        aList.add(a);

        Airport__c b = new Airport__c(
            Name = 'Amsterdam',
            IATA__c = 'AMS',
            Location__Latitude__s = 12,
            Location__longitude__s = 1);
        aList.add(b);
        insert aList;
    }

    @isTest static void searchCallTest() {
        String searchKey = 'BC';
        Test.startTest();
        VolandoController.searchAirportsByKey(searchKey);
        Test.stopTest();
    }

    @isTest static void createFlightSuccess() {
        String a = 'BCN';
        String b = 'AMS';
        Test.startTest();
        Decimal d = VolandoController.createFlight(a, b);
        Test.stopTest();
    }
    @isTest static void createFlightExcep() {
        String a = 'asd';
        String b = 'das';
        Test.startTest();
        try {
            Decimal error = VolandoController.createFlight(a, b);
        } catch (exception e) {}
        Test.stopTest();
    }

}