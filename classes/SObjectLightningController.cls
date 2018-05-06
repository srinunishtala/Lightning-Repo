public class SObjectLightningController{
    static Map<String,String> auraTypes {get; set;}
    public static string strSobjectName;
    public static string strSobjectFieldSetName;
    public static List<Schema.FieldSetMember> fieldset;
    
    public class FieldsClass {
        public String label {get;set;}
        public Boolean required {get;set;}
        public String type {get;set;}
        public String name {get;set;}
        public Boolean isUpdateable {get;set;}
        
        public FieldsClass(String label, Boolean required, String type, String name, Boolean isUpdatable)
        {
            this.label = label;
            this.required = required; 
            this.type = type;
            this.name = name;
            this.isUpdateable = isUpdatable;
        }
    }

    @AuraEnabled    
    public static String getFieldSet(String strObjName,String strFieldSetName) {
        
        strSobjectName = strObjName;
        strSobjectFieldSetName = strFieldSetName;
        
        map<String , FieldsClass> mapFieldToFieldClass = new map<String, FieldsClass>();
        
        if(strObjName != null && strFieldSetName != null && strObjName.trim().length() > 0 && strFieldSetName.trim().length()>0){
            Map<String, Schema.SObjectType> GlobalDescribeMap = Schema.getGlobalDescribe(); 
            Schema.SObjectType SObjectTypeObj = GlobalDescribeMap.get(strObjName);
            Schema.DescribeSObjectResult DescribeSObjectResultObj = SObjectTypeObj.getDescribe();
            Map<String, Schema.SObjectField> describeObjectFields = SObjectTypeObj.getDescribe().fields.getMap();
            
            Schema.FieldSet fieldSetObj = DescribeSObjectResultObj.FieldSets.getMap().get(strFieldSetName);
            Set<String> setReferenceToAdd = new set<String>();    
            fieldset =  fieldSetObj.getFields();
            for(Schema.FieldSetMember f : fieldset) {
                String fieldType = String.valueOf(f.getType());
                if(describeObjectFields.get(f.getFieldPath()).getDescribe().getType() == Schema.DisplayType.TEXTAREA && describeObjectFields.get(f.getFieldPath()).getDescribe().isHtmlFormatted())
                {
                    fieldType = 'richtextArea';
                }
                mapFieldToFieldClass.put(f.getFieldPath(), new FieldsClass(f.getLabel(), (f.getDBRequired() || f.getRequired()), fieldType, f.getFieldPath(), Boolean.valueOf(describeObjectFields.get(f.getFieldPath()).getDescribe().isUpdateable())));
            } 
       }
        return JSON.serialize(mapFieldToFieldClass.values());
    }
    
    @AuraEnabled    
    public static List<SObject> fetchSObjects(String recordId) {
        String query = 'SELECT ';
        for(Schema.FieldSetMember f : fieldset){
            system.debug(f.getType());
                query += f.getFieldPath() + ', ';
        }
        query += 'Id FROM '+strSobjectName+' Where Id =:recordId LIMIT 1';
        return Database.query(query);
    }
    
    @AuraEnabled    
    public static List<SObject> fetchSObjectsithId(Id objId, String FieldSetName, String objectName) {
        
        Map<String, Schema.SObjectType> GlobalDescribeMap = Schema.getGlobalDescribe(); 
        Schema.SObjectType SObjectTypeObj = GlobalDescribeMap.get(objectName);
        Schema.DescribeSObjectResult DescribeSObjectResultObj = SObjectTypeObj.getDescribe();
            
        Schema.FieldSet fieldSetObj = DescribeSObjectResultObj.FieldSets.getMap().get(FieldSetName);
        List<Schema.FieldSetMember> lstFieldSet =  fieldSetObj.getFields();
        
        String query = 'SELECT ';
        for(Schema.FieldSetMember f : lstFieldSet){
            system.debug(f.getType());
                query += f.getFieldPath() + ', ';
        }
        query += 'Id FROM '+objectName+' WHERE Id=:objId LIMIT 1';
        return Database.query(query);
    }
    
    
   @AuraEnabled    
    public static Map<string,string> fetchPicklist(String strObjName,String strFieldName) {
    
        List<SelectOption> options = new List<SelectOption>();
        Map<string,string> picklistValues = new Map<string,string>();
        Schema.DescribeFieldResult fieldResult = Schema.getGlobalDescribe().get(strObjName).getDescribe().fields.getMap().get(strFieldName).getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        
        for( Schema.PicklistEntry f : ple)
        {
           options.add(new SelectOption(f.getLabel(), f.getValue()));
           picklistValues.put(f.getLabel(), f.getValue());
        }       
        return picklistValues;
    }
    @AuraEnabled    
     public static sObject savesObject(String contactJson, String objectType) {
        
        sObject sObj = (sObject)JSON.deserialize(contactJson, sObject.class );
        upsert sObj;
        return sObj;
    }
    
    @AuraEnabled
    public static String getStageProbability() {
        map<String, Decimal> mapStageNametoPercentage = new map<String, Decimal>();
        for(OpportunityStage objStage : [Select ApiName, DefaultProbability from OpportunityStage] ) {
            mapStageNametoPercentage.put(objStage.ApiName , objStage.DefaultProbability);
        }
        return JSON.serialize(mapStageNametoPercentage);
    }
}