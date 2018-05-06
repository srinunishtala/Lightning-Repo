({
    /*
     * When the v.value field changes its value, the lookup is loaded again
     */
    rerender : function(component, helper){
        this.superRerender();
		//if value changes, triggers the loading method
       
            helper.loadValue(component,true);
        
    }
})