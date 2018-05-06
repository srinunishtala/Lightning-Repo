public class SLDS_FormController {
   
    public String strfirstName         {get;set;}
    public String strlastName          {get;set;}
    public String stremail             {get;set;}
    public String strphone             {get;set;}
    public String strCompanyName       {get;set;}
    public Date strDate                {get;set;}
    public String strTitle             {get;set;}
    public String strPriority          {get;set;}
    public String strselectedCompany   {get;set;}
    @AuraEnabled
    public String strselectedAccount   {get;set;}
    public Integer intDeleteIndex      {get;set;}
    //public List<Contact> LstContact   {get;set;}
    
    public List<contact> lstcontacts       {get;set;}
    
    public String strAccountMap        {get;private set;}
    
    public SLDS_FormController() 
       { 
          lstcontacts= [select FirstName,LastName,Email,Title from Contact Limit 4]; 
       }
    
     public String autoCompleteArray {get{
         List<jqueryUIAutoCompleteArray> lstArr = new List<jqueryUIAutoCompleteArray>();
         for(Account objAcc : [Select Id,Name from Account]) {
            lstArr.add(new jqueryUIAutoCompleteArray(objAcc.Name, objAcc.Id));
         }  
         return JSON.serializePretty(lstArr);
       }}
       
       
        @AuraEnabled
        public static String autoCompleteArray1() {
            List<jqueryUIAutoCompleteArray1> lstArr = new List<jqueryUIAutoCompleteArray1>(); 
            for(Account objAcc : [Select Id,Name from Account]) {
                lstArr.add(new jqueryUIAutoCompleteArray1(objAcc.Name, objAcc.Id));
             }  
             return JSON.serializePretty(lstArr);
        }
            
       public String autoCompleteArrayMultiSelect {get{
         List<jqueryUIAutoCompleteArray> lstArr = new List<jqueryUIAutoCompleteArray>();
         for(Opportunity objOpp : [Select Id,Name from Opportunity]) {
            lstArr.add(new jqueryUIAutoCompleteArray(objOpp.Name, objOpp.Id));
         }  
         return JSON.serialize(lstArr);
       }}
       
       public class jqueryUIAutoCompleteArrayMultiSelect {
           public String label {get;set;}
           public String id {get;set;}
           
           public jqueryUIAutoCompleteArrayMultiSelect(String lb, String na) {
               this.label = lb;
               this.id = na;
           }
       }
       
       
        public class jqueryUIAutoCompleteArray {
           public String label {get;set;}
           public String id {get;set;}
           
           public jqueryUIAutoCompleteArray(String lb, String na) {
               this.label = lb;
               this.id = na;
           }
       }
       
       
       public class jqueryUIAutoCompleteArray1 {
           @AuraEnabled 
           public String label {get;set;}
           @AuraEnabled 
           public String id {get;set;}
           
           public jqueryUIAutoCompleteArray1(String lb, String na) {
               this.label = lb;
               this.id = na;
           }
       }
       
       public List<SelectOption> getPriorities()
        {
              List<SelectOption> options = new List<SelectOption>();
                     
                Schema.DescribeFieldResult fieldResult =
                Contact.Priority__c.getDescribe();
                List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
               
                       
               for( Schema.PicklistEntry f : ple)
               {
                  options.add(new SelectOption(f.getLabel(), f.getValue()));
               }       
               return options;
        }
        
       public PageReference CreateContct() {
            try
            {
                
                
                Contact c = new Contact(
                                        FirstName= strfirstName, 
                                        LastName= strlastName,
                                        Title=strTitle,
                                        Phone = strphone,
                                        Last_Payment_Date__c = strDate,
                                        Email = stremail,
                                        Priority__c = strPriority,
                                        AccountId= strCompanyName
                                        );
                system.debug('=====contct==='+c);
                insert c;
                //ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.CONFIRM, 'Contact Created Successfully!'));
                return null;
            }
            catch(exception ex) {
               
                    ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, ex.getMessage()));
                    return null;
            }
       }
       
       public void deleteGS()
       {
           if(intDeleteIndex >=0 && intDeleteIndex < lstcontacts.size() -1) {
               delete lstcontacts[intDeleteIndex];
               lstcontacts= [select FirstName,LastName,Email,Title from Contact]; 
           }
        }

}