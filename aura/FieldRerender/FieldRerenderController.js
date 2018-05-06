({
	FieldToBeRendered: function(component, event, helper) {
        var tag = component.get('v.TagToRender');
        var attr = JSON.parse(component.get('v.TagAttributes'));
        var label = component.get('v.TagLabel');
        $A.createComponent(tag, attr, function(comp){
           var op = component.find('tagspace');
           var body = op.get('v.body');
           body.push(comp);
           op.set('v.body', body); 
        });
    }
})