public class SLDS_AutoCompleteController {
	
	@AuraEnabled
	public static List<sObjectAutoComplete> getSObjectList(String sObjectType,String searchTerm) {
		return querySObjects('Select Id,Name From '+String.escapeSingleQuotes(sObjectType)+
					' Where Name Like \'%' + String.escapeSingleQuotes(searchTerm) + '%\''+
					' Limit 5');
	}

	@AuraEnabled
	public static List<sObjectAutoComplete> getSObject(String sObjectType,String searchId) {
		return querySObjects('Select Id,Name From '+String.escapeSingleQuotes(sObjectType)+
					' Where Id = \'' + String.escapeSingleQuotes(searchId) + '\''+
					' Limit 1');
	}    

	private static List<sObjectAutoComplete> querySObjects(String qry) {
		List<sObjectAutoComplete> auraObjs = new List<sObjectAutoComplete>();
		try {
			List<sObject> objs = Database.query(qry);
		        for (sObject s : objs) {
		            auraObjs.add(new sObjectAutoComplete(s));
		        }
		} catch (Exception e) {
		    auraObjs.add(new sObjectAutoComplete('error',e.getMessage()+'; '+e.getStackTraceString()));
		}
		
		return auraObjs;
	}
    
	public class sObjectAutoComplete {
		@AuraEnabled public String id {get;set;}
		@AuraEnabled public String name {get;set;} 
		
		public sObjectAutoComplete(sObject obj) {
		    this.id = (String)obj.get('Id');
		    this.name = (String)obj.get('Name');            
		}
		
		public sObjectAutoComplete(String id,String name) {
		    this.id = id;
		    this.name = name;            
		}        
	}
}