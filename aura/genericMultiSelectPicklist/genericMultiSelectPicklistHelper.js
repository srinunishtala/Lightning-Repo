({
    //Fetching picklist values from apex controller and 
    //setting parameters
    buildPicklistValues : function(component, event, helper) {
        var action = component.get("c.getPicklistvalues");
        var inputMultiSel = component.find("leftSelectedValues");
        var opts=[];
        action.setParams({
            'objectName' : component.get("v.objName"),
            'field_apiname' : component.get("v.fieldAPIName")
        });
        action.setCallback(this, function(resp) {
        var state=resp.getState();
        if(state === "SUCCESS"){
            var res = resp.getReturnValue();
            for(var i=0;i< res.length;i++){
            opts.push({"class": "optionClass",
            label: res[i],
            value: res[i]});
            }
        inputMultiSel.set("v.options", opts);
        }
    });
$A.enqueueAction(action);
},
 
shiftRight : function(component, event, helper) {
    var addSelValues = component.get("v.addSelectedValues").split(";");
    var leftOpts = [];
    var rightOpts = [];
 
	rightOpts = component.find("rightSelectedValues").get("v.options");
	leftOpts = component.find("leftSelectedValues").get("v.options");
    for(var i=0;i< addSelValues.length;i++)
    {
        rightOpts.push({"class": "optionClass",
        label: addSelValues[i],
        value: addSelValues[i]});
        for(var j=0;j< leftOpts.length;j++)
        {
            if(leftOpts[j]["value"] == addSelValues[i])
            {
                leftOpts.splice(j,1);
                break;
            }
    	}
    }
    component.find("rightSelectedValues").set("v.options", rightOpts);
    component.find("leftSelectedValues").set("v.options", leftOpts);
},
shiftLeft : function(component, event, helper) {
    var remSelValues = component.get("v.removeSelectedValues").split(";");
    var leftOpts = [];
    var rightOpts = [];
 
    rightOpts = component.find("rightSelectedValues").get("v.options");
    leftOpts = component.find("leftSelectedValues").get("v.options");
    for(var i=0;i< remSelValues.length;i++){
    leftOpts.push({"class": "optionClass",
    label: remSelValues[i],
    value: remSelValues[i]});
    for(var j=0;j< rightOpts.length;j++)
    {
        if(rightOpts[j]["value"] == remSelValues[i])
        {
            rightOpts.splice(j,1);
            break;
        }
    }
    }
    component.find("leftSelectedValues").set("v.options", leftOpts);
    component.find("rightSelectedValues").set("v.options", rightOpts);
},
})