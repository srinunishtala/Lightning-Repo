({
	doInit : function(component, event, helper) {
       helper.getsObjectDetail(component);
       component.set("v.showSpinner", true); 
    },
    callEditModal: function(component, event, helper){
        helper.initializeModalEdit(component, event);
    },
    showSpinner_op : function (component, event, helper) {
        var toggleText = component.find("DetailSpinner");
		//$A.util.removeClass(toggleText,"toggle");  
        component.set('v.isdisplay','display:initial;');
        //component.set("v.showSpinner", true);
        
    },
    hideSpinner_op : function (component, event, helper) {
		var toggleText = component.find("DetailSpinner");
		$A.util.addClass(toggleText,"toggle");
        //component.set('v.isdisplay','display:none;');
        component.set("v.showSpinner", false);
    }
	
})