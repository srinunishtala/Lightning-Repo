public class SLDS_PicklistController {
    
  
        public String strIndustry          {get;set;}
    
        public SLDS_PicklistController() {
           
        }
        public List<SelectOption> getIndustries()
        {
              List<SelectOption> options = new List<SelectOption>();
                    
               Schema.DescribeFieldResult fieldResult =
                Account.Industry.getDescribe();
               List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
               
                       
               for( Schema.PicklistEntry f : ple)
               {
                  options.add(new SelectOption(f.getLabel(), f.getValue()));
               }       
               return options;
        }
}