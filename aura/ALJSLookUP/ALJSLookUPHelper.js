({
	getLookupValues : function(component) {
       	var j$ = jQuery.noConflict(); 
        var assetsLoc = '/resource/SLDS090';
        
        //ALJS Initialization     
        j$.aljsInit({
            assetsLocation: assetsLoc, //SLDS Static Resource Path      
            scoped: true
        });
        
        var action = component.get("c.autoCompleteArray1");
        action.setCallback(this, function(a) {
            var results = a.getReturnValue(); 
            console.log('-----results-----',results);
            j$('#propertyLookup').lookup({
                items:JSON.parse(results),
                objectIconUrl: '/resource/SLDS090/assets/icons/utility-sprite/svg/symbols.svg#account',
                showSearch: true,
                onChange: function(rec) {
                    j$('[id$=searchAccountId]').val(rec.id); 
                }
                
            })
        });
        $A.enqueueAction(action);
        
        
	}
})