public with sharing class RandomContactFactory {
  
   public static list<Contact> generateRandomContacts(Integer allcontacts,String mylastname)
   {
    list<Contact>lstContact = new list<Contact>();
     for(Integer i=0;i<allcontacts;i++) {
            Contact a = new Contact(FirstName=''+i,LastName=mylastname);
            lstContact.add(a);
            
        }
        return lstContact;
   } 

}