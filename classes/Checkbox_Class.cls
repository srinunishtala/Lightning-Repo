public class Checkbox_Class 
{

    List<accountWrapper> accountList = new List<accountWrapper>();
    List<Account> selectedAccounts = new List<Account>();
        
    public List<accountWrapper> getAccounts()
    {
        for(Account a : [select Id, Name, AccountNumber, Phone from Account limit 5])
        accountList.add(new accountWrapper(a));
        return accountList;
    }
    
    public PageReference getSelected()
    {
        selectedAccounts.clear();
        for(accountWrapper accwrapper : accountList)
        if(accwrapper.selected == true)
        selectedAccounts.add(accwrapper.acc);
        return null;
    }
    
    public List<Account> GetSelectedAccounts()
    {
        if(selectedAccounts.size()>0)
        return selectedAccounts;
        else
        return null;
    }    
    
    public class accountWrapper
    {
        public Account acc{get; set;}
        public Boolean selected {get; set;}
        public accountWrapper(Account a)
        {
            acc = a;
            selected = false;
        }
    }
}