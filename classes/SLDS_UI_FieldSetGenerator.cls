/**
 * This Apex Controller is created to
 * generate Field Set UI Generator
 * which would create dynamic
 * Visualforce page with Lightning
 * Design System with the Fields
 * defined in a Field Set.
 * 
 
 */
public class SLDS_UI_FieldSetGenerator {
    public Contact con              { get; set; }
    public Boolean isSuccess        { get; set; }
    public String message           { get; set; }
    public Boolean isCompleted      { get; set; }
    public String fieldSetName      { get; set; }
    public Boolean isFieldSetValid  { get; set; }
    
    public SLDS_UI_FieldSetGenerator() {
        con             = new Contact();
        
        isCompleted     = FALSE;
        
        fieldSetName    = ApexPages.currentPage().getParameters().get( 'fs' );
        
        isFieldSetValid = checkFieldSetValidity();
        
        fetchContactDetails();
    }
    
    /**
     * This method is created to Insert or Update
     * a contact and generate a message depicting
     * the status of the Insert or Update.
     */
    public void saveContact() {
        try {
            if( con.Id == NULL ) {
                INSERT con;
                message     = 'Contact was created successfully';
            }
            else {
                UPDATE con;
                message     = 'Contact was updated successfully';
            }
            isSuccess   = TRUE;
        }
        catch( Exception ex ) {
            isSuccess   = FALSE;
            message     = ex.getMessage();
        }
        
        isCompleted = TRUE;
    }
    
    /**
     * This method is created to check if the Field Set
     * name recieved from the URL is valid or not.
     */
    private Boolean checkFieldSetValidity() {
        if( fieldSetName != NULL ) {
            Map<String, Schema.FieldSet> fsMap = Schema.SObjectType.Contact.fieldSets.getMap();
            
            if( fsMap.containsKey( fieldSetName ) ) {
                return TRUE;
            }
        }
        
        return FALSE;
    }
    
    /**
     * Generates a query with all the fields in the
     * Field Set inorder to query the records values
     * from the Contact.
     */
    private void fetchContactDetails() {
        con.Id = ApexPages.currentPage().getParameters().get( 'id' );
        
        if( isFieldSetValid && con.Id != NULL ) {
            List<Schema.FieldSetMember> fieldsList = Schema.SObjectType.Contact.fieldSets.getMap().get( fieldSetName ).getFields();
            
            String query = 'SELECT ';

            for( Schema.FieldSetMember field : fieldsList ) {
                query += field.getFieldPath() + ', ';
            }
            
            query += 'Id FROM Contact WHERE Id=\'' + con.Id + '\'';
            
            con = Database.query( query );
        }
    }
}