global  class TBN_OpportunityAttachment_batch implements Database.Batchable <sObject>{
    global Database.QueryLocator start(Database.BatchableContext BC)
    {
         return Database.getQueryLocator('select Id , Name  from Account  '  );//where RecordType.Name=\'AttachmentCompany\'
    }
    global void execute(Database.BatchableContext BC, list<Account> scope)
    {
        
        list<Opportunity> lstOPP = [select Id ,AccountId , name from Opportunity where accountId In:scope];
       
        MAp<Id,Id> mapOppIdtoAccId = new MAp<Id,Id>();
        for(Opportunity objOpp :lstOPP )
        {
            mapOppIdtoAccId.put(objOpp.id,objOpp.AccountId); 
        }
        
       
         list<Attachment>lstAttold = [Select Parentid , body , name from Attachment where parentID IN:mapOppIdtoAccId.keySet()];
          system.debug('====lstattach==='+lstAttold); 
          system.debug('====lstattach==='+lstOPP); 
         list<Attachment> lstNewAttachment = new list<Attachment>();
       
        for (Attachment objAttold :lstAttold)
        {
            Attachment objAtt = new Attachment();
            objAtt.Body = objAttold.body;
            objAtt.Name = objAttold.Name; 
            objAtt.ParentId= mapOppIdtoAccId.get(objAttold.ParentId);
            lstNewAttachment.add(objAtt);
         }
      
        Map<String,List<Attachment>> mapNewAttachment = new  Map<String,List<Attachment>>();
        for(Attachment objAtt : lstNewAttachment)
        {
            if(mapNewAttachment.containsKey(objAtt.name))
            {
             list<Attachment> lstatt =  mapNewAttachment.get(objAtt.name);
             lstatt.add(objAtt);   
             mapNewAttachment.put(objAtt.name,lstatt);
            }
            else
            {
                mapNewAttachment.put(objAtt.name,new List<Attachment>{objAtt}) ;
            }
        }
        system.debug('maplist'+mapNewAttachment);
        Map<String,Attachment> maptoinsert = new  Map<String,Attachment>();
        for(string strkey :mapNewAttachment.keySet())
        {
            for(Attachment objAttachment :mapNewAttachment.get(strkey))
            {
               string key = strkey + objAttachment.parentId;
                maptoinsert.put(key,objAttachment);
            }
        }
        
        Insert maptoinsert.values();
       system.debug ('=====map ==='+ maptoinsert.values());        
       //Delete lstAttold;
        system.debug ('=====attachment ==='+lstNewAttachment);
    }
    global void finish(Database.BatchableContext BC)
    {}
}