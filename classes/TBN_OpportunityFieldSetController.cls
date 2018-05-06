public class TBN_OpportunityFieldSetController 
{
    public List<Opportunity> lstAllOpportunity = new List<Opportunity>();
    public List<Opportunity> lstOpportunityToShow {get;set;}
    public List<Opportunity> selectedOpps{get;set;}
    public Integer first {get;set;}
    public Integer list_size {get;set;}
    public Integer selectedRecNum {get;set;}
    public List<Account> lstAccounts {get;set;}
    public List<SelectOption> lstAccountOptions {get;set;}
    public List<SelectOption> lstSelectedProductOptions {get;set;}
    
    public String selectedAccounts{get;set;}
    
    public List<Id> selectedAccountId {get;set;}
    public List<Id> deSelectedAccountId {get;set;}
    

    public List<OpportunityWrapper> lstAllWrapperOpp = new list<OpportunityWrapper>();
    
    public TBN_OpportunityFieldSetController()
    {
        lstOpportunityToShow = new List<Opportunity> ();
        lstAccounts = new List<Account>([SELECT Id, 
                                                Name 
                                                FROM Account 
                                        ]);
        lstAccountOptions = new List<SelectOption>();
        for(Account objAccount : lstAccounts)
        { 
            lstAccountOptions.add(new SelectOption(objAccount.Id,objAccount.Name));
        }
        
        List<String> lstFields = new List<String>();
        for(Schema.FieldSetMember objField: SObjectType.Opportunity.FieldSets.Opp_Field_Set.getFields())
        {
            lstFields.add(objField.getFieldPath());
        }
        String strQuery = 'SELECT ';
        strQuery += String.join(lstFields, ', ');
        strQuery += ' FROM Opportunity Order By Name';
        
        lstAllOpportunity = Database.query(strQuery);
        list_size = lstAllOpportunity.size();
        
        first = 0;
        RecordSize__c objPg = RecordSize__c.getInstance('DefaultPageSize');  
        selectedRecNum = (Integer)objPg.PageSize__c;
        addOpportunityToShow();
    }
        
    public List<OpportunityWrapper> getOpportunity() 
    {
        lstAllWrapperOpp = new List<OpportunityWrapper>();
        for(Opportunity objOpport : lstAllOpportunity)
        {
            OpportunityWrapper objWrapper = new OpportunityWrapper(objOpport);
            lstAllWrapperOpp.add(objWrapper);
        }
        return lstAllWrapperOpp;
    }
    
    public List<OpportunityWrapper> lstWrapperOpp {get; set;}
    
    public class OpportunityWrapper 
    {
        public Opportunity objOpp {get; set;}
        public Boolean selected {get; set;}
        //This is the contructor method. When we create a new cContact object we pass a Contact that is set to the con property. We also set the selected value to false
        public OpportunityWrapper(Opportunity objOp) 
        {
            objOpp = objOp;
            selected = false;
        }
    }
    
    public void addOpportunityToShow()
    {
        lstOpportunityToShow = new List<Opportunity>();
        Integer count ;
        
        count = ((first + selectedRecNum) < list_size)?(first + selectedRecNum):list_size;
        for(Integer i = first; i < count; i++)
        {
            lstOpportunityToShow.add(lstAllOpportunity.get(i));
        }
        
        lstWrapperOpp = new List<OpportunityWrapper>();
        for(Opportunity objOpport : lstOpportunityToShow)
        {
            OpportunityWrapper objWrapper = new OpportunityWrapper(objOpport);
            lstWrapperOpp.add(objWrapper);
        }
        System.debug('========================='+lstWrapperOpp);
    }
    
  
    
    public PageReference processSelected() 
    {
        //We create a new list of opportunities that will be populated only with opportunities if they are selected
        List<Opportunity> lstSelectedOpportunities = new List<Opportunity>();
        //We will cycle through our list of OpportunityWrapper and will check to see if the selected property is set to true, if it is we add the Opportunity to the lstSelectedOpportunities list
        for(OpportunityWrapper objOppWrap: lstWrapperOpp) 
        {
            if(objOppWrap.selected == true) 
            {
                lstSelectedOpportunities.add(objOppWrap.objOpp);
            }
        }
        system.debug('=====lstSelectedOpportunities====='+lstSelectedOpportunities);
        
        return null;
    }
    public PageReference check()
    {
         system.debug('-----testing----'+selectedAccounts);
        return null;
    }
 
   
}