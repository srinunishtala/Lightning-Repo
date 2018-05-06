public class StringArrayTest {
public static List<String> generateStringArray(Integer length) {
 List<String> mystringArray = new List<String>();
 for(Integer i=0;i<length;i++) {
   mystringArray .add('Test ' + i);
   System.debug(mystringArray [i]);
           
    } 
  return mystringArray ;
    }
}