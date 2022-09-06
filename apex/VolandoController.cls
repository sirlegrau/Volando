public class VolandoController {

    //Return Airport List from searchkey query
    @AuraEnabled
    public static List < Airport__c > searchAirportsByKey(String searchText) {
        searchText = '%' + searchText + '%';
        List < Airport__c > rList = new List < Airport__c > ();
        rList = [SELECT Name, IATA__c, Country__c from Airport__c where IATA__C LIKE: searchText];

        return rList;
    }

    //Insert a flight given 2 IATAs. Return its distance in Decimal
    @AuraEnabled
    public static Decimal createFlight(String origin, String dest) {

        try {

            Airport__c[] air1 = [SELECT Id, Location__Latitude__s, Location__longitude__s FROM Airport__c WHERE IATA__c =: origin];
            Airport__c[] air2 = [SELECT Id, Location__Latitude__s, Location__longitude__s FROM Airport__c WHERE IATA__c =: dest];

            if (air1.size() > 0 && air2.size() > 0) {
                Flight__c f = new Flight__c();
                f.Origin__c = air1[0].Id;
                f.Destination__c = air2[0].Id;
                f.Distance__c = haversine(air1[0].Location__Latitude__s, air1[0].Location__longitude__s, air2[0].Location__Latitude__s, air2[0].Location__longitude__s);
                insert f;
                return f.Distance__c;
            }
            throw new AuraHandledException('Error inserting flight');

        } catch (Exception e) {
            System.debug(e);
            throw new AuraHandledException('Error inserting flight');

        }
    }
	
    //Return Distance between two Geolocations in Decimal
    public static Decimal haversine(Decimal latitude1, Decimal longitude1, Decimal latitude2, Decimal longitude2) {
        Integer earthRadius = 6371 * 1000; // in meters
        // Transform coordinates from degrees to radians
        Decimal latitudeRadians1 = latitude1 * Math.PI / 180;
        Decimal latitudeRadians2 = latitude2 * Math.PI / 180;
        // Latitude and longitude differences in radians
        Decimal latitudeDelta = (latitude2 - latitude1) * Math.PI / 180;
        Decimal longitudeDelta = (longitude2 - longitude1) * Math.PI / 180;
        Decimal a = Math.sin(latitudeDelta / 2) * Math.sin(latitudeDelta / 2) +
            Math.cos(latitudeRadians1) * Math.cos(latitudeRadians2) *
            Math.sin(longitudeDelta / 2) * Math.sin(longitudeDelta / 2);
        Decimal arc = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        Decimal distance = earthRadius * arc; // in metres
        distance = distance / 1000;
        distance = distance.setScale(3);
        return distance;

    }
}