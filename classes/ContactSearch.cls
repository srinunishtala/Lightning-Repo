public class ContactSearch{
    public static List<Contact> searchForContacts(String str1, String str2)
    {
        List<Contact> lst_Con= new List<Contact>();
        List<Contact> lst_ConQuery= new List<Contact>([Select Id, Name, LastName,FirstName,MailingAddress  From Contact where LastName=:str1]);
        for(Contact objContact:lst_ConQuery)
        {
            
                lst_Con.add(objContact);
                system.debug('==========================' +lst_ConQuery);
           
        }
        return lst_Con;
    }
}