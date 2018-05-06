({
    doInit : function(component, event, helper) {
    	helper.buildPicklistValues(component, event, helper);
    },
    //Method to move selected values to the right panel
    shiftRight : function(component, event, helper) {
    if(component.get("v.addSelectedValues").length > 0)
        {
            helper.shiftRight(component, event, helper);
        } 
        else 
        {
            alert("Please select atleast one value");
        }
 	},
    //Method to move selected values to the left panel
    shiftLeft : function(component, event, helper) {
    if(component.get("v.removeSelectedValues").length > 0)
    	{
    		helper.shiftLeft(component, event, helper);
    	} 
        else 
        {
    		alert("Please select atleast one value to Move to Left");
    	}
    }
})