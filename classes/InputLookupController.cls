public class InputLookupController {
    
    /*
     * Loads the initial value of the given SObject type with ID "value"
     */
    @AuraEnabled
    public static String getCurrentValue(String fieldName, String objectType, String idSobject, String strSearch){
        if(String.isBlank(objectType)){
            return null;
        }
        SObjectType objType = Schema.getGlobalDescribe().get(objectType);
        Schema.sobjectType objectName = objType.getDescribe().fields.getMap().get(fieldName.trim().toLowerCase()).getDescribe().getReferenceTo()[0];
        String query = 'Select Id,Name From ' + String.valueOf(objectName);
        /*if(!String.isBlank(strSearch)){
            query += ' Where Name Like \'%' + strSearch + '%\'';
        }*/
        System.debug('### Query: '+query);
        List<SObject> oList = Database.query(query);
        if(oList.size()==0) {
            return null;
        }
        return JSON.serialize(oList);
    }
    
    /*
     * Utility class for search results
    */
    public class SearchResult{
        public String value{get;Set;}
        public String id{get;set;}
    }
    
    /*
     * Returns the "Name" field for a given SObject (e.g. Case has CaseNumber, Account has Name)
    */
    private static String getSobjectNameField(SobjectType sobjType){
        
        //describes lookup obj and gets its name field
        String nameField = 'Name';
        Schema.DescribeSObjectResult dfrLkp = sobjType.getDescribe();
        for(schema.SObjectField sotype : dfrLkp.fields.getMap().values()){
            Schema.DescribeFieldResult fieldDescObj = sotype.getDescribe();
            system.debug('===>>>'+ fieldDescObj.getType() + ' :' + fieldDescObj.getLabel());
            if(fieldDescObj.isNameField() ){
                nameField = fieldDescObj.getName();
                break;
            }
        }
        return nameField;
    }
    
    /*
     * Searchs (using SOSL) for a given Sobject type
     */
    @AuraEnabled
    public static String searchSObject(String type, String searchString){
        if(String.isBlank(type) || String.isBlank(searchString)){
            return null;
        }
        
        SObjectType objType = Schema.getGlobalDescribe().get(type);
        if(objType == null){
            return null;
        }
        
        String nameField = getSobjectNameField(objType);
        searchString = '\'*'+searchString+'*\'';
        String soslQuery = 'FIND :searchString IN NAME FIELDS RETURNING '
                          + type +'(Id, '+nameField+' ORDER BY '+nameField+') LIMIT 20';
        System.debug('SOSL QUERY: '+soslQuery);
        List<List<SObject>> results =  Search.query(soslQuery);
        
        List<SearchResult> output = new List<SearchResult>();
        if(results.size()>0){
            for(SObject sobj : results[0]){
                SearchResult sr = new SearchResult();
                sr.id = (String)sobj.get('Id');
                sr.value = (String)sobj.get(nameField);
                output.add(sr)   ;
            }
        }
        return JSON.serialize(output);
    }
    
    @AuraEnabled
    public static contact saveContact(String jsonStr) {
        List<Contact> con = (List<Contact>)JSON.deserialize(jsonStr, List<Contact>.class);
        insert con;
        return con[0];
    }
    
    @AuraEnabled 
    public static string getLookupFields(String sObjectTypeInContext, String fields)
    {
        List<String> lstFields = (fields == '') ? new List<String>() : fields.split(';');
        if(lstFields.isEmpty()) return null;
        String strLookups = '';
        map<String , Schema.SObjectField> objSobjectFields = Schema.getGlobalDescribe().get(sObjectTypeInContext.trim().toLowerCase()).getDescribe().fields.getMap();
        for(String strField : lstFields)
        {
            if(objSobjectFields.containsKey(strField) && String.valueOf(objSobjectFields.get(strField).getDescribe().getType()) == 'REFERENCE')
            {
                strLookups+= strField + ';';    
            }
        }
        if(strLookups != '') { return strLookups; } else { return 'NO LOOKUPS FOUND';}
    }
}