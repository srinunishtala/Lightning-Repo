({
  accountSelected : function(component) {
    var event = $A.get("e.c:AccountSelected");
    event.setParams({"account": component.get("v.account")});
    event.fire();
  },
    navigateToMyComponent : function(component, event, helper) {
    var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:sample"
        /*
        componentAttributes: {
            contactName : component.get("v.contact.Name")
        }*/
    });
    evt.fire();
}
})