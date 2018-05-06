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
    }
})