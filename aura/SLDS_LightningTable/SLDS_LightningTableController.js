({
	doInit : function(component, event, helper) {
        helper.fetchsObjectRecords(component);
	},
    pageChange: function(component, event, helper) {
         var page = component.get("v.page") || 1;
         var directTo = event.getParam("reDirectTo");
         page = directTo === "previous" ? (page - 1) : (page + 1);
         helper.fetchsObjectRecords(component,page);
    },
    navigateToMyComponent : function(component, event, helper) {
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:sample",
            componentAttributes: {
               myAttribute: component.get("v.id")
            }
        });
        evt.fire();
    },
    nextStage: function(component, event, helper){
        console.log("----------------> nextStage 0");
        helper.completeStage(component, event, helper);               
    },
})