({
	// Your renderer method overrides go here
	rerender : function(component, helper) 
    {
        var ren = this.superRerender();
        console.log('renderer called',ren);
        //helper.closeSortBy(component);
        //helper.calenderScroll(component);
        return ren;
	}
})