({
	onload : function(component, event, helper) {
		var objectName = component.get('v.type');
        var fieldNames = component.get('v.FieldsToDisplay');
        if(objectName == '' || objectName == undefined || fieldNames == '' || fieldNames == undefined){
            return ''
        } 
        var action = component.get('c.getLookupFields');
        action.setParams({
            'sObjectTypeInContext' : objectName,
            'fields': fieldNames
        });
        action.setCallback(this, function(a){
            if(a.error && a.getReturnValue() == 'NO LOOKUPS FOUND'){
                return '';
            } 
            var lookupFieldsFiltered = a.getReturnValue();
            var lstFields = lookupFieldsFiltered.split(';');
            var lookups = [];
            for(var i=0; i< lstFields.length; i++)
            {
                if(lstFields[i] != ''){
                    console.log('====', lstFields[i]);
                    $A.createComponent(
                    'c:InputLookup',
                    {
                        'type': component.get('v.type'),
                        'FieldsToDisplay': lstFields[i]
                    },function(lookupMarkup){
                        console.log('==lookup=>>>', lookupMarkup);
                        var lookupBody = component.find('ElementHere');
                        var divBody = lookupBody.get("v.body");
            			divBody.push(lookupMarkup);
                        lookupBody.set("v.body", divBody);
                    });
                }
            }
           });
        
        $A.enqueueAction(action);
	}
})