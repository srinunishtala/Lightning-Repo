public with sharing class selectCheckboxDemoController 
{
    public List<wrapperclass> wrapList {get;set;}
    public boolean checked{get;set;}
    
    public selectCheckboxDemoController()
    {
        checked = false;
    }

    public void selectallnone(){
    if(!checked)
    checked = true;
    else
    checked = false;
    }

    public List<wrapperclass> getWrapperList()
    {
        wrapList = New List<wrapperclass>();
        for(Account acc:[Select name,accountnumber,id,annualrevenue,description from account limit 5]){
            if(!checked)
            wrapList.add(New wrapperclass(acc,false));
            else
            wrapList.add(New wrapperclass(acc,true));
        }
    return wrapList;
    }

    public class wrapperclass{
    public account accRec{get;set;}
    public boolean checkFlag{get;set;}

    public wrapperclass(account acc,boolean flag)
    {
        accRec = acc;
        checkFlag = flag;
    }
}
}