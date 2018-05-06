public class testJsonSerialize {

public testJsonSerialize(){
 
 parse();
    
}


public class Car {
    public String make;
    public String year;
}

public void getMap() {   

   // for()
    
}

public void parse() {        
    Car c = (Car)JSON.deserializeStrict(
        '{  "make":"SFDC","year":"2020","make":"SFDC","year":"2020"}',
        Car.class);
    System.assertEquals(c.make, 'SFDC');
    System.assertEquals(c.year, '2020');
}



}