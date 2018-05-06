({
	getPicklist : function(component) {
		var action = component.get("c.fetchPicklist");
        action.setParams({
            "strObjName":component.get("v.ObjectName"),
            "strFieldName" : component.get("v.FieldName")
        });
        action.setCallback(this, function(response) {
            var values = response.getReturnValue();
            var valuesArray = [];
            for (value in values){ 
                valuesArray.push({
                    key: value,
                    value: value
                });
            } 
            var selectlist = component.find('selection');
            selectlist.set('v.options', valuesArray);
            selectlist.set('v.value', component.get('v.fieldvalue'));
        });
        $A.enqueueAction(action);
	}
})