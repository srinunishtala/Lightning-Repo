({
    /**
     * Handler for receiving the updateLookupIdEvent event
     */
    handleAccountIdUpdate : function(cmp, event, helper) {
        // Get the Id from the Event
        var accountId = event.getParam("sObjectId");

        // Get the Instance Id from the Event
        var instanceId = event.getParam("instanceId");

        // Determine the instance Id of the component that fired the event
        if (instanceId == "MyAccount")
        {
            // Set the Id bound to the View
            cmp.set('v.recordId', accountId);
        }
        else
        {
            console.log('Unknown instance id: ' + instanceId);
        }
    },

    /**
     * Handler for receiving the clearLookupIdEvent event
     */
	handleAccountIdClear : function(cmp, event, helper) {
        // Get the Instance Id from the Event
        var instanceId = event.getParam("instanceId");

        // Determine the instance Id of the component that fired the event
        if (instanceId == "MyAccount")
        {
            // Clear the Id bound to the View
            cmp.set('v.recordId', null);
        }
        else
        {
            console.log('Unknown instance id: ' + instanceId);
        }
	}
})