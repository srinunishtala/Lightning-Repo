({
    doInit: function(component, event, helper) {
        helper.fetchPickListVal(component, event);
 	},
    onSelectButton: function(component, event, helper) {
        console.log(event.srcElement.getAttribute('data-button-value'));
        component.set("v.picklistValuesSelected",event.srcElement.getAttribute('data-button-value'));
        console.log('===picklistValuesSelected====',component.get("v.picklistValuesSelected"));
    },
    getInput: function(component, event, helper){
        if($A.util.isEmpty(component.get("v.picklistValuesSelected"))){
            alert('Test Success');
        }
    }
})