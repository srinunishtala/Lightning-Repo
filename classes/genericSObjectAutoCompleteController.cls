/**
    * \arg ClassName        : genericSObjectAutoCompleteController
    * \arg CreatededBy      : Nikhil
    * \arg ModifiedBy       : 
    * \arg Description      : Apex class to perform autoComplete for any sObject
**/
public with sharing class genericSObjectAutoCompleteController 
{
     /**
        @MethodName : lookup
        @Param      : searchString, sObjectAPIName
        @Description: Aura enabled method to search a specified SObject for a specific string
     **/
    @AuraEnabled
    public static Result[] lookup(String searchString, String sObjectAPIName)
    {
        
        String objSearchString = String.escapeSingleQuotes(searchString);
        String objSObjectAPIName = String.escapeSingleQuotes(sObjectAPIName);

		List<Result> results = new List<Result>();

        // SOSL Query built
        String searchQuery = 'FIND \'' + objSearchString + '*\' IN ALL FIELDS RETURNING ' + objSObjectAPIName + '(id,name) Limit 50'; 

        // Executing the Query built
        List<List<SObject>> searchList = search.query(searchQuery);

        // Creating a list of matches to return
		for (SObject so : searchList[0])
        {
            results.add(new Result((String)so.get('Name'), so.Id));
        }
        
        return results;
    }
    
     /**
        @MethodName : Result
        @Description: Inner class to wrap up an SObject Label and its Id
     **/
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