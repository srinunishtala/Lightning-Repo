public class RichTextController {
    public String myText {get;set;}
    public RichTextController(){
        Contact abook = [Select Test__c
                                   FROM Contact  
                                   where Id = '0032800000k7zY9']; 
        myText = abook.Test__c;
        system.debug('====1==='+myText);
    }
}