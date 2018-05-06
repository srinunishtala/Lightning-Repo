public class AccountTriggerHandler 
{
    public static void CreateAccounts(List<Account> lstAcct)
    {
        for(Account objAcc:lstAcct)
        {
            if(objAcc.ShippingState!= objAcc.BillingState)
            {
                objAcc.ShippingState = objAcc.BillingState; 
            }
        }
    }
    
    public static void CreateAccountContacts(List<Account> lstAccounts)
    {
        List<Contact> lstContacts = new List<Contact>();
        for(Account objAcc : lstAccounts){
           Contact obj = new Contact(LastName = objAcc.Name, AccountId = objAcc.Id); 
           lstContacts.add(obj);
        }
        insert lstContacts;
    }
    public static void DeleteAccountContacts(List<Account> lstExistingAccounts)
    {
        List<Contact> lstContacts = [SELECT Id, AccountId From Contact WHERE AccountId IN:lstExistingAccounts];
        system.debug('===4==='+lstContacts);   
        delete lstContacts;
    }
    public static void UpdateAccountContacts(Map<Id, Account> mapTriggerNew)
    {
        List<Contact> lstContacts = [SELECT Id, LastName, AccountId From Contact WHERE AccountId IN:mapTriggerNew.keySet()];
        system.debug('===5==='+lstContacts);
       /* for(Account objAcc: mapTriggerNew ){
            
        }*/
    }
}