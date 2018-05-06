public class OpportunityExtension {
    
    public String currOpportunityId {
        get {
            return ApexPages.currentPage().getParameters().get('Id');
        }
    }
    
    
    public String objssss {get;set;} 
    
    public Opportunity objOPpor {get;set;}
    
    public OpportunityExtension(ApexPages.StandardController opportunityStdController){
         objOPpor  = [Select Id,Name,StageName from Opportunity where Id=: ApexPages.currentPage().getParameters().get('Id')];
    }
    
}