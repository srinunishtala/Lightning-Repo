({
    //typeahead already initialized
    typeaheadInitStatus : {},
    //"old value" to trigger reload on "v.value" change
    typeaheadOldValue : {},
    /*
     * Method used on initialization to get the "name" value of the lookup
     */
    loadFirstValue : function(component) {
        //this is necessary to avoid multiple initializations (same event fired again and again)
        if(this.typeaheadInitStatus[component.getGlobalId()]){ 
			return;
        }
        this.typeaheadInitStatus[component.getGlobalId()] = true;
        this.loadValue(component, false);
           
    },
    
    /*
     * Method used to load the initial value of the typeahead 
     * (used both on initialization and when the "v.value" is changed)
     */
    loadValue : function(component, skipTypeaheadLoading){
        this.typeaheadOldValue[component.getGlobalId()] = component.get('v.value');
        var action = component.get("c.getCurrentValue");
        var self = this;
        var autocompleteComp = component.get('v.FieldsToDisplay');
        action.setParams({
            'fieldName' : autocompleteComp,
            'objectType': component.get('v.type')
        });
        action.setCallback(this, function(a) {
            if(a.error && a.error.length){
                return $A.error('Unexpected error: '+a.error[0].message);
            }
            var result = JSON.parse(a.getReturnValue());
			component.set('v.isLoading',false);
            var autoCompleteArray = [];
            for(var i=0; i < result.length; i++)
            {
                autoCompleteArray.push({
                    'label': result[i].Name,
                    'value': result[i].Id
                })
            }
            
            console.log('===', autocompleteComp);
            $('[id='+autocompleteComp+'_typeahead]').autocomplete({
                    source: autoCompleteArray,
                    select: function(event, ui)
                    {      
                        console.log('iff', component.get('v.FieldsToDisplay'))
                        var id= component.get('v.FieldsToDisplay') + '_lookId';
                        console.log('===id', ui.item.value);
                        $('#'+id).val(ui.item.value);
                        $('[id='+autocompleteComp+'_typeahead]').val(ui.item.label);
                        console.log('=====',$('#'+id) )
                        return false;
                    },
                    focus: function(event, ui){
                        $('[id='+autocompleteComp+'_typeahead]').val(ui.item.label);
                        return false;
                    }
             	});
            
        });
        $A.enqueueAction(action);
    },
    setTimerForCallout: function(component, skipTypeaheadLoading){
        component.set('v.isLoading', false);
        var thisPointer = this;
        console.log('======', $('[id$=_typeahead]'));
        var waitForAJAX = '';
        $('[id$=_typeahead]').keyup(function(){
        	if(waitForAJAX != '') clearTimeout(waitForAJAX);
            waitForAJAX = setTimeout(function(){
                clearTimeout(waitForAJAX);
                thisPointer.loadFirstValue(component);
            },3000);	
        })
    },
   
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