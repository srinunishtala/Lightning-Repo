({
	goPrevious : function(component,event,helper) {
     	
        helper.navigate(component,false);   
    },
    goNext : function(component,event,helper) {
     	
        helper.navigate(component,true);
    },
})