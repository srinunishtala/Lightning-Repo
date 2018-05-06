public class jQueryDataTableController {
    public List<Contact> contactList {
        get {
            if (contactList == null) {
                contactList = [SELECT Account.Name, FirstName, LastName, Phone FROM Contact limit 1000];
            }
            return contactList;
        }
        set;
    }
}