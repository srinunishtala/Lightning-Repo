({
	submitForm: function(component, event) {
        var contactName = component.get("v.contactName");
        var accId = document.querySelector('[id$=lookId]').value
        var s = [];
        s.push({
            'LastName' : contactName,
            'AccountId': accId
        })
        var action = component.get("c.saveContact");
        action.setParams({ 
            "jsonStr": JSON.stringify(s)
        });       
        
        action.setCallback(this, function(result, event) {
            if(result.state == 'SUCCESS'){
                $('input').val('');
                alert('Contact Record Created');
            } else {
                console.log('ret', result.getReturnValue());
            }
        });
        
        $A.enqueueAction(action);
    }
})