({
	previousPage : function(component, event, helper) {
        var myEvent = $A.get("e.c:SLDS_PageChangeEvent");
        myEvent.setParams({ "reDirectTo": "previous"});
        myEvent.fire();
	},
	nextPage : function(component, event, helper) {
       var myEvent = $A.get("e.c:SLDS_PageChangeEvent");
        myEvent.setParams({ "reDirectTo": "next"});
        myEvent.fire();
	}
})