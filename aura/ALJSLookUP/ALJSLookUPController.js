({
	intializeLookup : function(component, event, helper) {
		//helper.getLookupValues(component,event);
		var j$ = jQuery.noConflict(); 
        var assetsLoc = '/resource/SLDS0102';
        
        //ALJS Initialization     
        j$.aljsInit({
            assetsLocation: assetsLoc, //SLDS Static Resource Path      
            scoped: true
        });
        
        var action = component.get("c.autoCompleteArray1");
        action.setCallback(this, function(a) {
            var results = a.getReturnValue(); 
            console.log('JSON.parse(results)',typeof JSON.parse(results))
            console.log('j$', j$('#propertyLookup'))
            j$('#propertyLookup').lookup({
                items:JSON.parse(results),
                objectIconUrl: '/resource/SLDS0102/assets/icons/utility-sprite/svg/symbols.svg#account',
                showSearch: true,
                onChange: function(rec) {
                    j$('[id$=searchAccountId]').val(rec.id); 
                }
                
            })
        });
        $A.enqueueAction(action);
        
        
	}
    
})