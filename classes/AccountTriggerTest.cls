@isTest
public class AccountTriggerTest {
    
    @isTest static void TestCreate200Records()
    {
        List<Account> lstAccounts = new List<Account>();
        for(Integer i=0; i < 200; i++) 
        {
            Account objAcc = new Account(Name='Test Account ' + i, BillingState = 'CA');
            lstAccounts.add(objAcc);
        }
        
        Test.startTest();
            insert lstAccounts ;
        Test.stopTest();
        
        
        List<Account> lstAccount = [select ShippingState from Account];
        for (Account objAcc: lstAccount )
        {
            System.assertEquals('CA', objAcc.ShippingState, 'ERROR');
        }
        
    }
}