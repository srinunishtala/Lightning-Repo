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
    loadValue : function(component, isSearch){
        this.typeaheadOldValue[component.getGlobalId()] = component.get('v.value');
        var action = component.get("c.getCurrentValue");
        var self = this;
        var autocompleteComp = component.get('v.FieldsToDisplay');
        var sObjectId = (component.get('v.value') != undefined) ? component.get('v.value') : '';
        var isEdit = component.get('v.isEdit');
        console.log('=====isEdit', isEdit);
        console.log('=====autocompleteComp', component.get('v.label'));
        action.setParams({
            'fieldName' : autocompleteComp,
            'objectType': component.get('v.type'),
            'searchStr': sObjectId,
            'strSearch' : $('[id='+autocompleteComp+'_typeahead]').val()
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
            if(isEdit) {
                $('[id='+autocompleteComp+'_typeahead]').autocomplete({
                        source: autoCompleteArray,
                        select: function(event, ui)
                        {      
                            var id= component.get('v.FieldsToDisplay') + '_lookId';
                            $('#'+id).val(ui.item.value);
                            $('[id='+autocompleteComp+'_typeahead]').val(ui.item.label);
                            return false;
                        },
                        focus: function(event, ui){
                            $('[id='+autocompleteComp+'_typeahead]').val(ui.item.label);
                            return false;
                        },
                        search: function(event, ui) {
                        	$('#'+id).val('');    
                        }
                    }).autocomplete('option', 'appendTo', '#'+autocompleteComp);
                	$('.ui-autocomplete').css('z-index', 10001);
            }
            
            if(component.get('v.value') != undefined){
                for(var ind = 0 ; ind < autoCompleteArray.length ; ind++)
                {
                    if(component.get('v.value') == autoCompleteArray[ind].value)
                    {
            			$('[id='+autocompleteComp+'_typeahead]').val(autoCompleteArray[ind].label);
                		var id= component.get('v.FieldsToDisplay') + '_lookId';
                        $('#'+id).val(autoCompleteArray[ind].value); 
                        component.set('v.NameoFRecord', autoCompleteArray[ind].label);
                    }
                }
            }
        });
        $A.enqueueAction(action);
    },
    setTimerForCallout: function(component){
        /*component.set('v.isLoading', false);
        var thisPointer = this;
        console.log('======', $('[id$=_typeahead]'));
        var waitForAJAX = '';
        $('[id$=_typeahead]').keyup(function(){
        	if(waitForAJAX != '') clearTimeout(waitForAJAX);
            waitForAJAX = setTimeout(function(){
                clearTimeout(waitForAJAX);
                thisPointer.loadFirstValue(component, true);
            },3000);	
        })*/
    }  
})