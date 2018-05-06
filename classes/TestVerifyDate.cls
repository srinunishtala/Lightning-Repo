@isTest 
public class TestVerifyDate{
    static testmethod void mymrthod()
    {
       
Date date11 =Date.newInstance(2015,01,01);
   Date date22 = Date.newInstance(2015,01,11);
   Date date33 = Date.newInstance(2015,05,01);
     Date str1 =VerifyDate.CheckDates(date11,date22);
        Date str2 =  VerifyDate.CheckDates(date11,date33);
          }
}