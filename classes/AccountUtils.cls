public class AccountUtils {
    public static List<Account> accountsByState(String str){
       List<Account> lstAccount = [SELECT Id, Name FROM Account WHERE billingState = :str];
	   return lstAccount;
	}
}