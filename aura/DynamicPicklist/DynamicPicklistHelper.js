({
    fetchPickListVal: function(component, event) {
        var action = component.get("c.getselectOptions");
        action.setParams({
            "objObject": component.get("v.objInfo"),
            "fld": 'Industry'
        });
        
        action.setCallback(this, function(response) {
            console.log('658',response);
            if (response.getState() == "SUCCESS") {
                
                var allValues = response.getReturnValue();
 				var opts = [];
                if (typeof allValues == 'undefined' || allValues.length <= 0) {
                    opts.push({
                        class: "optionClass",
                        label: "--- None ---",
                        value: ""
                    });
                } else {
                    for (var i = 0; i < allValues.length; i++) {
                        opts.push({
                            class: "slds-button slds-button--neutral optionClass",
                            label: i + '. ' + allValues[i],
                            value: allValues[i]
                        });
                    }
                }
                console.log('=========',opts);
                component.set("v.picklistValues",opts); 
                
            }
        });
        $A.enqueueAction(action); 
        }
        
    },
})