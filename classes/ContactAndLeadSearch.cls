public class ContactAndLeadSearch{

 public static List<List< SObject>> searchContactsAndLeads(String str)
 {  
  
List<List<sObject>> searchList = [FIND 'Smith' IN ALL FIELDS RETURNING  Contact(Id, Name), Lead];
Contact[] searchContacts = (Contact[])searchList[0];
Lead[] searchLeads = (Lead[])searchList[1];
return searchList  ;
 }
}