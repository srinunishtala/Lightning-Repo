({
	navigate : function(component, isNext) {
     
        var state = component.get("v.state");
        if(isNext) {
            
            state++;
            
        } else {
            
            state--;
        }
        component.set("v.state",state);
        component.set("v.percentage",parseInt((state-1)*25) + "%");
    },
        
})