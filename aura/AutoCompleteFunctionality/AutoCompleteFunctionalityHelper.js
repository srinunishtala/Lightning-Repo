({
	//Call Apex Controller to perform sObject LookUp Search
    doSearch : function(component) {
        
        // Fetch search string, input element and the selection container
        var searchString = component.get('v.searchString');
        var inputElement = component.find('lookup');
        var lookupList = component.find('lookuplist');
        // Clear all errors and destroy the old lookup items container
        inputElement.set('v.errors', null);
        // Search to be performed for at least 2 characters typed
        if (typeof searchString === 'undefined' || searchString.length < 2)
        {
            // Hiding the lookuplist
            $A.util.addClass(lookupList, 'slds-hide');
            this.hideLookup(component);
            return;
        }
        // Show the lookuplist
        $A.util.removeClass(lookupList, 'slds-hide');
		this.showLookup(component);
        // Fetch the API Name of the sObject
        var sObjectAPIName = component.get('v.sObjectAPIName');
		// Create an Apex action
        var action = component.get('c.lookup');
		// To prevent multiple events from the keyup executing set the action as abortable
        action.setAbortable();
        action.setParams({ "searchString" : searchString, "sObjectAPIName" : sObjectAPIName});
                          
        // Defining the callback function
        action.setCallback(this, function(response) {
            var state = response.getState();
			// To Check whether Callback succeeded or not
            if (component.isValid() && state === "SUCCESS")
            {
                // Fetch search matches
                var matches = response.getReturnValue();
				// Nothing to return if no matches
                if (matches.length == 0)
                {
                    component.set('v.matches', null);
                    return;
                }
                // Store the results
                component.set('v.matches', matches);
                var lookupPill = component.find("lookuplist");
        		$A.util.removeClass(lookupPill, 'slds-hide');
                this.showLookup(component);
            }
            else 
                // Handle errors by reporting it
                if (state === "ERROR") 
            	{
                	var errors = response.getError();
                	if (errors) 
                	{
                        if (errors[0] && errors[0].message) 
                        {
                            this.displayToast('Error', errors[0].message);
                        }
                	}
                else
                    {
                        this.displayToast('Error', 'UnIdentified Error');
                    }
            	}
        });             
        $A.enqueueAction(action);                
    },
    /**
     * Handle the Selection of an Item
     */
    handleSelection : function(component, event) {
        // Resolve SObject Id from events element Id i.e <a> tags
        var objectId = this.resolveId(event.currentTarget.id);
		// The Object label is the inner text)
        var objectLabel = event.currentTarget.innerText;

        console.log('objectId=' + objectId);
        console.log('objectLabel=' + objectLabel);
                
        // Calling the UpdateLookupId event
        var updateEvent = component.getEvent("updateLookupIdEvent");
        // Fetching Instance Id of the Component
        var instanceId = component.get('v.instanceId');

        // Setting parameters into the event called
        updateEvent.setParams({
            "sObjectId" : objectId, "instanceId" : instanceId
        });
        updateEvent.fire();
		// Updating SearchString with Label
        component.set("v.searchString", objectLabel);
		// Hiding lookup list
        var lookupList = component.find("lookuplist");
        $A.util.addClass(lookupList, 'slds-hide');
		this.hideLookup(component);
        // Hiding Input Element
        var inputElement = component.find('lookup');
        $A.util.addClass(inputElement, 'slds-hide');
		// Showing Lookup pill by removing 'slds-hide' class
        var lookupPill = component.find("lookup-pill");
        $A.util.removeClass(lookupPill, 'slds-hide');
		// fetching the lookup list based on id
        var inputElement = component.find('lookup-div');
        $A.util.addClass(inputElement, 'slds-has-selection');

    },
	//Clear the Selection
	clearSelection : function(component) {
        // Calling the ClearLookupId event
        var clearEvent = component.getEvent("clearLookupIdEvent");
		// Fetch Instance Id of the Component
        var instanceId = component.get('v.instanceId');
		// Setting parameters into the event called
        clearEvent.setParams({
            "instanceId" : instanceId
        });
        clearEvent.fire();
		// Clearing the Searchstring
        component.set("v.searchString", '');
		// Hide the Lookup pill by adding 'slds-hide' class
        var lookupPill = component.find("lookup-pill");
        $A.util.addClass(lookupPill, 'slds-hide');

        // Show the Input Element
        var inputElement = component.find('lookup');
        $A.util.removeClass(inputElement, 'slds-hide');
		// If Lookup Div has no selection remove 'slds-has-selection' class
        var inputElement = component.find('lookup-div');
        $A.util.removeClass(inputElement, 'slds-has-selection');
    },
    // Resolve Object Id from Element Id by splitting id at the _
    resolveId : function(elmId)
    {
        var i = elmId.lastIndexOf('_');
        return elmId.substr(i+1);
    },
	//Display toast messages
    displayToast : function (title, message) 
    {
        var toast = $A.get("e.force:showToast");
		// For lightning1 show the toast
        if (toast)
        {
            //fire toast event in Salesforce1
            toast.setParams({
                "title": title,
                "message": message
            });
			toast.fire();
        }
        // exception alert
        else 
        {
            alert(title + ': ' + message);
        }
    },
    showLookup: function(component){
        component.set('v.toggleLookupManual', 'display:inherit;')
    },
    hideLookup: function(component){
        component.set('v.toggleLookupManual', 'display:none;')
    }
    
})