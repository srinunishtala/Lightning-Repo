({
     configMap: {
        "anytype": { componentDef: "ui:outputText" },
        "base64": { componentDef: "ui:inputText" },
        "boolean": {componentDef: "ui:inputCheckbox" },
        "combobox": { componentDef: "ui:inputText" },
        "currency": { componentDef: "ui:inputText" },
        "datacategorygroupreference": { componentDef: "ui:inputText" },
         "date": { componentDef: "ui:inputDate", attributes: {values: {format: "yyyy-MM-dd"}} },
        "datetime": { componentDef: "ui:inputDateTime" },
        "double": { componentDef: "ui:inputNumber", attributes: { values: { format: "0.00"} } },
        "email": { componentDef: "ui:inputEmail" },
        "encryptedstring": { componentDef: "ui:inputText" },
        "id": { componentDef: "ui:inputText" },
        "integer": { componentDef: "ui:inputNumber", attributes: { values: { format: "0"} } },
        "multipicklist": { componentDef: "ui:inputText" },
        "percent": { componentDef: "ui:inputNumber", attributes: { values: { format: "0"} } },
        "picklist": { componentDef: "ui:inputText" },
        "reference": { componentDef: "ui:inputText" }, 
        "string": { componentDef: "ui:inputText" },
        "textarea": { componentDef: "ui:inputText" },
        "time": { componentDef: "ui:inputDateTime", attributes: { values: { format: "h:mm a"} } },
        "url": { componentDef: "ui:inputText" },
        "phone": { componentDef: "ui:inputPhone" },
        "richtextarea": { componentDef: "ui:inputRichText"} 
    },
     configOutputMap: {
        "anytype": { componentDef: "ui:outputText" },
        "base64": { componentDef: "ui:outputText" },
        "boolean": {componentDef: "ui:outputCheckbox" },
        "combobox": { componentDef: "ui:outputText" },
        "currency": { componentDef: "ui:outputText" },
        "datacategorygroupreference": { componentDef: "ui:outputText" },
         "date": { componentDef: "ui:outputDate" },
        "datetime": { componentDef: "ui:outputDateTime" },
        "double": { componentDef: "ui:outputNumber", attributes: { values: { format: "0.00"} } },
        "email": { componentDef: "ui:outputEmail" },
        "encryptedstring": { componentDef: "ui:outputText" },
         "id": { componentDef: "ui:outputText" },
        "integer": { componentDef: "ui:outputNumber", attributes: { values: { format: "0"} } },
        "multipicklist": { componentDef: "ui:outputText" },
        "percent": { componentDef: "ui:outputNumber", attributes: { values: { format: "0"} } },
        "picklist": { componentDef: "ui:outputText" },
        "reference": { componentDef: "ui:outputText" }, 
        "string": { componentDef: "ui:outputText" },
        "textarea": { componentDef: "ui:outputText"},
        "time": { componentDef: "ui:outputDateTime", attributes: { values: { format: "h:mm a"} } },
        "url": { componentDef: "ui:outputText" },
        "phone": { componentDef: "ui:outputPhone"},
        "richtextarea": { componentDef: "ui:outputRichText"} 
    	},   
     addComponent: function(component, facet, config, fieldPath, isLookup, isEditable) {
        var compId = (isEditable) ? fieldPath.name + '_edit': fieldPath.name;
         if(!isLookup) {
            $A.createComponent('c:FieldRerender', {
                'TagToRender':config.componentDef,
                'TagAttributes' : JSON.stringify(config.attributes.values),
                'TagLabel' : fieldPath.label,
                'id': compId,
                'isEditable': isEditable
            },function(comp){
                facet.push(comp);
                component.set('v.form', facet);
            });
        } else {
            
            $A.createComponent('c:InputLookup',
                               {
                                   'type': component.get("v.ObjectName"),
                                   'FieldsToDisplay': fieldPath.name,
                                   'value': config.attributes.values.value,
                                   'id': compId,
                                   'isEdit':isEditable,
                                   'label':fieldPath.label
                               },
                               function(createdMarkup){
                                   facet.push(createdMarkup);
                                   component.set('v.form', facet);
                               })
        }    
    },
   
    // Create a form given the set of fields
    createForm: function(component, fields, valuesOfSobject) {
        var field = {};
        var cmp = null;
        var def = null;
        var config = null;

        // Clear any existing components in the form facet
        component.set("v.form", []);
		component.find("ElementHere").set('v.body',[]);
        var facet = component.get("v.form");
        var values = [];
        component.get('v.recordName',  valuesOfSobject[0].name);
        if(fields != null && fields.length > 0){
            for (var ii = 0; ii < fields.length; ii++) {
                field = fields[ii];
                if(field.isUpdateable){
                	if(field.type.toLowerCase() == 'picklist')
                    {
                        //valuesOfSobject[0][field.name]
                        $A.createComponent(
                        	'c:FetchPicklist',
                            {
                                'ObjectName': component.get('v.ObjectName'),
                                'FieldName': field.name,
                                'fieldvalue': valuesOfSobject[0][field.name],
                                'id': field.name+ '_edit'
                            },function(lookupMarkup){
                                facet.push(lookupMarkup);
                                component.set('v.form', facet);
                            }
                    	);
                	}
                    else
                	{
                        var lookup = false;    
                        config = JSON.parse(JSON.stringify(this.configMap[field.type.toLowerCase()]));
                        config.attributes = config.attributes || {};
                        config.attributes.values = config.attributes.values || {};
                        config.attributes.id = field.name;
                        
                        config.attributes.values.class = "slds-input";
                        config.attributes.values.labelClass="slds-form-element__label";
                        
                        if(field.type.toLowerCase() == 'date' || field.type.toLowerCase() == 'datetime'){
                            config.attributes.values.displayDatePicker="true";
                            config.attributes.values.labelClass="slds-form-element__label"; 
                        }
                        
                        if(field.type.toLowerCase() == 'reference'){            
                             lookup = true;       
                        }
                        
                        if(field.type.toLowerCase() == 'boolean'){
                            config.attributes.values.class = "slds-form-element slds-checkbox--faux";
                            config.attributes.values.labelClass="slds-form-element__label";    
                        } 
                        
                        if(field.type.toLowerCase() == 'richtextarea') {
                            config.attributes.values.isRichText = "true";
                            
                        }    
                            
                        if(valuesOfSobject != ''){
                             config.attributes.values.value =  valuesOfSobject[0][field.name];      
                        }    
                            
                        // Set the required and label attributes
                        config.attributes.values.required = field.required;
                        config.attributes.values.label = field.label;
                        
                        // Add the value for each field as a name/value            
                        values.push({name: field.fieldPath, value: undefined});
                        
                        // Add the component to the facet and configure it
                        this.addComponent(component, facet, config, field, lookup, true);
                    }    
                } else {
                    config = JSON.parse(JSON.stringify(this.configOutputMap[field.type.toLowerCase()]));
                    config.attributes = config.attributes || {};
                    config.attributes.values = config.attributes.values || {};
                    if(valuesOfSobject != ''){
                        config.attributes.values.value =  valuesOfSobject[0][field.name];      
                    }
                    var lookup = false;
                    if(field.type.toLowerCase() == 'reference'){            
                         lookup = true; 
                    }
                    config.attributes.id = field.name;
                    config.attributes.values.class="slds-form-element__static";  
                    this.addComponent(component, facet, config, field, lookup, false);
                } 
            }
        }
    },
	getEditableSObject: function(component) {
        var action = component.get("c.getFieldSet");
        if(component.get("v.FieldSet") == null || component.get("v.FieldSet").length <=0 || component.get("v.ObjectName") == null || component.get("v.ObjectName").length <=0){
            return ;
        }
        action.setParams({"strFieldSetName": component.get("v.FieldSet"),
                              "strObjName" : component.get("v.ObjectName")
                             });
        action.setCallback(this, function(response) {
            var jsonFieldset = JSON.parse(response.getReturnValue());
            if(jsonFieldset != ''){
            	component.set("v.SObjectFields", jsonFieldset);
                var fieldNames = [];
                fieldNames = component.get("{!v.SObjectFields}");
                if(component.get('v.sObjectId') != undefined){
                    var action1 = component.get("c.fetchSObjectsithId");
                     action1.setParams({
                         	'objId':component.get('v.sObjectId'),
                            'FieldSetName': component.get("v.FieldSet"),
                            'objectName': component.get("v.ObjectName") });
                	action1.setCallback(this, function(response){
                    	this.createForm(component, fieldNames, response.getReturnValue());    
                	});
                 $A.enqueueAction(action1);   
                } else {
                    this.createForm(component, fieldNames, '');
                }
               
            }
        });
        $A.enqueueAction(action);
	},
    saveFunction: function(component){
        var fields = component.get("{!v.SObjectFields}");
        var objName = component.get("{!v.ObjectName}");
        var fieldValues = {
            'attributes': {
                'type': objName,
                'url': "/services/data/v36.0/sobjects/"+objName+"/" + component.get('v.sObjectId') 
				},
            'id' : component.get('v.sObjectId')
        };
        var fieldsToDisplayError = [];
        for(var indx = 0; indx < fields.length; indx++)
        {
            var field_name = fields[indx].name;
            var field_val = '';
            if(!fields[indx].isUpdateable) { continue; }
            
            $('#' + fields[indx].name + '_edit').each(function(){
                
                $(this).find('input,textarea,select').css('border-color', '');
                
                if($(this).find('select').length > 0){
                    field_val = $(this).find('select').val();
                }
                                
                if($(this).find('input:not(:hidden), textarea').length > 0){
                    field_val = $(this).find('input:not(:hidden), textarea').val();
                }
                if($(this).find('input[type=hidden]').length > 0){
                    field_val = $(this).find('input[type=hidden]').val();
                    if(field_val == '' && $(this).find('input:not(:hidden)').val() != '') {
                        fieldsToDisplayError.push({ 
                            name : fields[indx].name+'_edit',
                            label: fields[indx].label
                        });
                    }
                }
                if($(this).find('input[type=checkbox]').length > 0){
                    field_val = $(this).find('input[type=checkbox]').is(':checked');
                }
                if(field_val == '' && fields[indx].required) {
                    fieldsToDisplayError.push({
                        name: fields[indx].name + '_edit',
                        label:fields[indx].label 
                    });
                }
            })
            fieldValues[field_name] = field_val;
        }
        if(fieldsToDisplayError.length > 0) {
            var errorLabels = ''
             for(var i=0 ; i < fieldsToDisplayError.length ; i++) {
                $('#' + fieldsToDisplayError[i].name ).find('input,textarea,select').css('border-color', 'red');
                errorLabels += fieldsToDisplayError[i].label + ',';
            }
            component.set("v.strError",'Please review data for the following fields:' + errorLabels);
            return ; 
        }
        var JSONsObject = JSON.stringify(fieldValues);
        var action = component.get("c.savesObject");
        action.setParams({
            "contactJson": JSONsObject,
            'objectType': objName
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                console.log('reponse=====',response.getReturnValue());
                
                component.set('v.isDisplay', false);
                this.displayToast('Success', 'Record Created Successfully!');
            } 
            if (state === "ERROR") {
                console.log('reponse=====',response.getError());
                var errors = response.getError();
                if (errors[0] && errors[0].pageErrors) {
                    console.log('>>>>>Error',errors[0].pageErrors[0].message);
                    component.set("v.strError",errors[0].pageErrors[0].message);
                }
            }
        });
        $A.enqueueAction(action);
    },
    displayToast : function (title, message) 
    {
        var toast = $A.get("e.force:showToast");
 
        // For lightning1 show the toast
        if (toast)
        {
            //fire the toast event in Salesforce1
            toast.setParams({
                "title": title,
                "message": message
            });
 
            toast.fire();
        }
        else // otherwise throw an alert
        {
            alert(title + ': ' + message);
        }
    }
})