({
	doInit : function(component, event, helper) {
       //get fieldset from controller by calling helper class method
       helper.getEditableSObject(component);
    },
    editSObject: function(component, event, helper) {
        component.set('v.isDisplay', true);
    	helper.getEditableSObject(component);
    },
    closeEdit: function(component, event, helper) {
        component.set('v.isDisplay', false);
    },
    saveDetail: function(component,event,helper){
    
	},
      showSpinner : function (component, event, helper) {
        var toggleText = component.find("EditSpinner");
		$A.util.removeClass(toggleText,"toggle");
	},
    hideSpinner : function (component, event, helper) {
		var toggleText = component.find("EditSpinner");     
		$A.util.addClass(toggleText,"toggle");
   },
    save: function (component, event, helper){
        helper.saveFunction(component);
    }
})