public class NewCaseListController{
public List<Case> lstCase{get;set;}
public List<Case> getNewCases()
{
  lstCase=new List<Case>();
  for(Case objCase:[Select Id,CaseNumber from Case where Status='New'])
  {
      lstCase.add(objCase);
  }
  return lstCase;
}



}