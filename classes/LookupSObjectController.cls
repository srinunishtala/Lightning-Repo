public with sharing class LookupSObjectController 
{
    /**
     * Aura enabled method to search a specified SObject for a specific string
     */
    @AuraEnabled
    public static Result[] lookup(String searchString, String sObjectAPIName)
    {
		system.debug('---------LOOKUP-------'+searchString + '----' + sObjectAPIName);
        
        String objSearchString = String.escapeSingleQuotes(searchString);
        String objSObjectAPIName = String.escapeSingleQuotes(sObjectAPIName);

		List<Result> results = new List<Result>();

        // Build our SOSL query
        String searchQuery = 'FIND \'' + objSearchString + '*\' IN ALL FIELDS RETURNING ' + objSObjectAPIName + '(id,name) Limit 50'; 

        // Execute the Query
        List<List<SObject>> searchList = search.query(searchQuery);

        // Create a list of matches to return
		for (SObject so : searchList[0])
        {
            results.add(new Result((String)so.get('Name'), so.Id));
        }
        
        return results;
    }
    
    /**
     * Inner class to wrap up an SObject Label and its Id
     */
	public class Result
    {
        @AuraEnabled public String SObjectLabel {get; set;}
        @AuraEnabled public Id SObjectId {get; set;}
        
        public Result(String sObjectLabel, Id sObjectId)
        {
            this.SObjectLabel = sObjectLabel;
            this.SObjectId = sObjectId;
        }
    }
}