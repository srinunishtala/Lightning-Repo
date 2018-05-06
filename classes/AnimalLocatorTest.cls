@isTest 
private class AnimalLocatorTest {
    @isTest static void testGetCallout() {
        // Set mock callout class 
        Test.setMock(HttpCalloutMock.class, new AnimalLocatorMock()); 
        string animal_name = AnimalLocator.getAnimalNameById(1);
        String expectedValue = 'chicken';
        System.assertEquals(animal_name, expectedValue);
    }
}