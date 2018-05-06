({
	//Search SObject LookUp values for a match
	searchLookUp : function(component, event, helper) {
        helper.doSearch(component);    
        helper.hideLookup(component);
    },
	//Select SObject from the list of values displayed
    selectValue: function(component, event, helper) {
    	helper.handleSelection(component, event);
    },
	//Clear the currently selected SObject LookUp value
    clearSelected: function(component, event, helper) {
    	helper.clearSelection(component);    
    }
})