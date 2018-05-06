public class sObjectPaginationController {
   
    @AuraEnabled public static lightningTableWrapper fetchRecords(String ObjectName,String fieldstoget,decimal pageNumber, String pageSize){     
       
        integer offset = (integer.valueOf(pageNumber) - 1) * integer.valueof(pageSize);
        String queryString = 'Select '+ String.escapeSingleQuotes(fieldstoget)+
                             ' from '+ String.escapeSingleQuotes(ObjectName) +
                             ' Limit '+ String.escapeSingleQuotes(pageSize) + ' Offset '+offset;      
                             
        lightningTableWrapper ltwrapper = new lightningTableWrapper();
        ltwrapper.total = database.countQuery('Select count() from '+String.escapeSingleQuotes(ObjectName));
        ltwrapper.page = Integer.valueOf(pageNumber);
        ltwrapper.sObjectrecords = database.query(queryString);
        return ltwrapper;
    }
    @AuraEnabled
    public static void uselessMethod(){
        system.debug(logginglevel.error,'------------------------------------> uselessMethod! ');
    }
}