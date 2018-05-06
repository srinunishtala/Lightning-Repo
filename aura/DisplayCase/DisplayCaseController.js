({
 getCase : function(component, event, helper) {
  var action = component.get("c.getCaseFromId");
        action.setParams({
          "caseID": 'null';
      });
        action.setCallback(this, function(a){
        component.set("v.record", a.getReturnValue());
    });
    $A.enqueueAction(action);
 }
})