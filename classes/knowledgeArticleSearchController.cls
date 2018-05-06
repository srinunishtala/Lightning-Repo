public with sharing class knowledgeArticleSearchController 
{              
    public List<KnowledgeArticleVersion> lstKnowledgeArticleVersion                     { get; set; }
    public List<String> lstChildDataCategories                                          { get; set; }
    
    public String strResultCount                                                        { get; set; } 
    public String strChildDataCategoryselected                                          { get; set; }
    public String strSearchstring                                                       { get; set; }
    public Map<String,Integer> mapArticleToViewStat                                     { get; set; }
    public List<articleType> lstArticleType                                             { get; set; }
    public String strCaseID ;
    private Map<String,String> mapArticleType;                                         
    
    private List<KnowledgeArticleVersion> lstAllArticles    = new List<KnowledgeArticleVersion>();
    public List<knowledgeWrapper> lstArticles   { get; set; } 
    
    public knowledgeArticleSearchController(ApexPages.StandardController stdController){
        strCaseID = ApexPages.currentPage().getParameters().get('Id');
  }
    
    public void doSearch() 
    {
        if(!String.isEmpty(strSearchstring)) {
            lstArticles  = new List<knowledgeWrapper>();
            //Get All the Articles based on the criteria
            lstArticles = getArticles();
            System.debug('lstRecords--'+lstArticles);
        }
    }
    

    public List<knowledgeWrapper> getArticles()
    {
        List<knowledgeWrapper> lstArticle  = new List<knowledgeWrapper>();
        Set<String> setArticleId = new Set<String>();
        //List<KnowledgeArticleVersion> lstArticles = new List<KnowledgeArticleVersion>();
        //List<String> lstTitlesToSort = new list<String>();
        //List<String> lstArticleTitleSortedByDesc = new  List<String>();
        
        //Map<Id,KnowledgeArticleVersion> mapArticles = new Map<Id,KnowledgeArticleVersion>();
        //Map<Id,KnowledgeArticleVersion> mapArticleIdtoKnowledgeArticlesVersion = new  Map<Id,KnowledgeArticleVersion>();
        //Map<String,list<KnowledgeArticleVersion>> mapTitleToKnowledgeArticle = new Map<String,list<KnowledgeArticleVersion>>();
        
        String strquery;
        
        strSearchstring = (!String.isEmpty(strSearchstring))?strSearchstring.replaceAll('[|^|&|!|-|+|~|"|\'|]', ''):strSearchstring;
        strSearchstring = (!String.isEmpty(strSearchstring) && strSearchstring.contains('-')) ? strSearchstring.replaceAll('-', '') : strSearchstring;
        
        strquery = ' FIND {'+strSearchstring+'} IN ALL FIELDS RETURNING KnowledgeArticleVersion(Id, Summary,LastPublishedDate, KnowledgeArticleId, title, FirstPublishedDate, ArticleType, UrlName, VersionNumber WHERE PublishStatus = \'Online\' AND Language = \'en_US\'';
        
        for(articleType objType : lstArticleType) {
            if(objType.isSelected) {
                strquery += ' AND ArticleType = \''+ mapArticleType.get(objType.type)+'\'';
            }
        }
        
        strquery += ')';
        
        //strquery = formQuerywithoutSearch(strParentDataCategoryselected,mapParentDataCategoryToChildSelected.get(strParentDataCategoryselected));
        system.debug('========strquery============'+strquery);
        //SOSL Performed if Search String is Entered.
        List<List<SObject>> lstArticlesSearch =  search.query(strquery);
        
        for(KnowledgeArticleVersion objKn : (List<KnowledgeArticleVersion>)lstArticlesSearch[0]) {
               knowledgeWrapper objWrap = new  knowledgeWrapper();
               objWrap.id = objKn.Id;
               objWrap.title = objKn.Title;
               if(!String.isEmpty(objKn.ArticleType)) {
                   objWrap.type = objKn.ArticleType.substringBetween('__');
               }
               objWrap.summary = objKn.Summary;
               objWrap.knowledgeArticleId = objKn.KnowledgeArticleId;
               objWrap.versionNumber = objKn.VersionNumber;
               objWrap.UrlName = objKn.UrlName;
               if(!String.isEmpty(objKn.UrlName) && !String.isEmpty(objKn.ArticleType)){
                   objWrap.urlForArticle = 'articles/nithinlighttest__'+objKn.ArticleType.substringBetween('__')+'/'+objKn.UrlName;
               }
               
               if(setArticleId.contains(objKn.KnowledgeArticleId)) {
                   objWrap.isAttached = true;
               }
               else{
                   objWrap.isAttached = false;
               }
               objWrap.isSelected = false;
               lstArticle.add(objWrap);
        }
        
        /*
        if(!lstArticlesSearch.isEmpty())
        {
            mapArticles = new Map<Id,KnowledgeArticleVersion>((List<KnowledgeArticleVersion>)lstArticlesSearch[0]);
            lstArticles.addAll(mapArticles.values());
        }

        if(!lstArticles.isEmpty()) {
            lstAllArticles.addAll(lstArticles);
            mapArticleIdtoKnowledgeArticlesVersion.putAll(lstArticles);
        }
        
      
        for(KnowledgeArticleVersion objKA  : lstAllArticles)
        {
            
            if(!mapTitleToKnowledgeArticle.containskey(objKA.title)) {
                mapTitleToKnowledgeArticle.put(objKA.title,new list <KnowledgeArticleVersion> { objKA });
            }
            else {
                mapTitleToKnowledgeArticle.get(objKA.title).add(objKA);
            }
                
        }
        
        for(String strtitle : mapTitleToKnowledgeArticle.keyset()) {
            lstTitlesToSort.add(strtitle);
        }

        lstTitlesToSort.sort();
        
        //Variable to display the Count of Articles on the page.    
        strResultCount = lstAllArticles.size()+' Articles found.';
        */
        return lstArticle;//Returning the final list of Articles that were queried
    }
   
    public void init()
    {
        //Set<String> setArticleType = new Set<String>();
        lstArticles  = new List<knowledgeWrapper>();
        lstAllArticles = new List<KnowledgeArticleVersion>();
        mapArticleToViewStat = new Map<String,Integer>();
        lstArticleType = new List<articleType>();
        mapArticleType = new Map<String,String>();
        Set<String> setArticleId = new Set<String>();
        List<Case> lstCase = [Select Id, Subject From Case Where Id=:strCaseID];
        String strSubject;
        if(!lstCase.isEmpty()) {
            strSubject = lstCase[0].Subject;
        }
        else {
            strSubject = '';
        }
        
        for(KnowledgeArticleViewStat objStat : [Select Id, ViewCount, ParentId From KnowledgeArticleViewStat Where Channel='Internal App']) {
            mapArticleToViewStat.put(objStat.ParentId,objStat.ViewCount);
        }
        
        for(CaseArticle objCaseArt : [Select Id, KnowledgeArticleId From CaseArticle]) {
            setArticleId.add(objCaseArt.KnowledgeArticleId);
        }
        
        for(KnowledgeArticleVersion ObjKn : [SELECT Id,Title,UrlName,Summary,KnowledgeArticleId,ArticleType,VersionNumber FROM KnowledgeArticleVersion WHERE Language ='en_US' AND PublishStatus ='Online']) {
            if(!String.isEmpty(objKn.ArticleType)) {
                articleType objType = new articleType();
                if(!mapArticleType.containsKey(objKn.ArticleType.substringBetween('__'))) {
                    objType.type = objKn.ArticleType.substringBetween('__');
                    objType.isSelected = false;
                    lstArticleType.add(objType);
                    mapArticleType.put(objKn.ArticleType.substringBetween('__'),objKn.ArticleType);
                }
                //setArticleType.add(objKn.ArticleType.substringBetween('__'));
            }
        }
        
        String strQuery = 'SELECT Id,Title,UrlName,Summary,KnowledgeArticleId,ArticleType,VersionNumber FROM KnowledgeArticleVersion WHERE Language =\'en_US\' AND PublishStatus =\'Online\' AND (Title LIKE \'%'+strSubject+'%\' OR Summary LIKE \'%'+strSubject+'%\')';
        for(KnowledgeArticleVersion objKn : Database.query(strQuery)) {
               knowledgeWrapper objWrap = new  knowledgeWrapper();
               objWrap.id = objKn.Id;
               objWrap.title = objKn.Title;
               if(!String.isEmpty(objKn.ArticleType)) {
                   objWrap.type = objKn.ArticleType.substringBetween('__');
               }
               objWrap.summary = objKn.Summary;
               objWrap.knowledgeArticleId = objKn.KnowledgeArticleId;
               objWrap.versionNumber = objKn.VersionNumber;
               objWrap.UrlName = objKn.UrlName;
               if(!String.isEmpty(objKn.UrlName) && !String.isEmpty(objKn.ArticleType)){
                   objWrap.urlForArticle = 'articles/nithinlighttest__'+objKn.ArticleType.substringBetween('__')+'/'+objKn.UrlName;
               }
               
               if(setArticleId.contains(objKn.KnowledgeArticleId)) {
                   objWrap.isAttached = true;
               }
               else{
                   objWrap.isAttached = false;
               }
               objWrap.isSelected = false;
               lstArticles.add(objWrap);
        }
    }
    
    public class knowledgeWrapper {
        public String id {get;set;}
        public String title {get;set;}
        public String summary {get;set;}
        public String type {get;set;}
        public String knowledgeArticleId {get;set;}
        public Integer versionNumber {get;set;}
        public String UrlName {get;set;}
        public String urlForArticle {get;set;}
        public Boolean isSelected {get;set;}
        public Boolean isAttached {get;set;}
    }
    
    public void createCaseArticle() {
        System.debug('Called');
        List<CaseArticle> lstCaseArticle = new List<CaseArticle>();
        for(knowledgeWrapper objWrap: lstArticles) {
            if(objWrap.isSelected) {
                CaseArticle objArt = new CaseArticle(CaseId=strCaseID, KnowledgeArticleId=objWrap.knowledgeArticleId,ArticleVersionNumber=objWrap.versionNumber);
                lstCaseArticle.add(objArt);
                
            }
        }
        insert lstCaseArticle;
        System.debug('lstCaseArticle--'+lstCaseArticle);
    }
    
    public class articleType {
        public String type {get;set;}
        public Boolean isSelected {get;set;}
    }
}