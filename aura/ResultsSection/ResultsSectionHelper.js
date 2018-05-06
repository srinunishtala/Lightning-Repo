({
  getAccounts : function(component) {
    var action = component.get("c.getAccounts");
    action.setCallback(this, function(response){
      var state = response.getState();
      if (state === "SUCCESS") {
        component.set("v.accounts", response.getReturnValue());
      }
    });
    $A.enqueueAction(action);
  },

  getContacts : function(component) {
    var action = component.get("c.getContacts");
    action.setCallback(this, function(response){
      var state = response.getState();
      if (state === "SUCCESS") {
        component.set("v.contacts", response.getReturnValue());
      }
    });
    $A.enqueueAction(action);
  },

  getLeads : function(component) {
    var action = component.get("c.getLeads");
    action.setCallback(this, function(response){
      var state = response.getState();
      if (state === "SUCCESS") {
        component.set("v.leads", response.getReturnValue());
      }
    });
    $A.enqueueAction(action);
  },
})