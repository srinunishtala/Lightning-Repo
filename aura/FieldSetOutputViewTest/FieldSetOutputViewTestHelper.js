({
     configMap: {
        "anytype": { componentDef: "ui:outputText" },
        "base64": { componentDef: "ui:outputText" },
        "boolean": {componentDef: "ui:outputCheckbox" },
        "combobox": { componentDef: "ui:outputText" },
        "currency": { componentDef: "ui:outputText" },
        "datacategorygroupreference": { componentDef: "ui:outputText" },
        "date": { componentDef: "ui:outputDate" },
        "datetime": { componentDef: "ui:outputDateTime" },
        "double": { componentDef: "ui:outputNumber" },
        "email": { componentDef: "ui:outputEmail" },
        "encryptedstring": { componentDef: "ui:outputText" },
        "id": { componentDef: "ui:outputText" },
        "integer": { componentDef: "ui:outputNumber" },
        "multipicklist": { componentDef: "ui:outputText" },
        "percent": { componentDef: "ui:outputNumber"},
        "picklist": { componentDef: "ui:outputText" },
        "reference": { componentDef: "ui:outputText" }, //attributes : { values: { press : "{!c.LookUp}"} }, events: { values: { focus : function(){ console.log("--eventfire--->"); }} } },
        "string": { componentDef: "ui:outputText" },
        "textarea": { componentDef: "ui:outputText" },
        "time": { componentDef: "ui:outputDateTime"},
        "url": { componentDef: "ui:outputText" },
        "phone": { componentDef: "ui:outputPhone" }
    },
    
    addComponent: function(component, facet, config, fieldPath, isLookup) {
        console.log('===config=', fieldPath);
        if(!isLookup) {
            try{
            $A.createComponent(config.componentDef,
                              config.attributes.values,
                               function(createdMarkup){
                                   facet.push(createdMarkup);
                                   component.set('v.form', facet);
                               });
            } catch(e) {
                console.log(e);
            }   
        } else {
            
        }    
    },
   
    // Create a form given the set of fields
    createForm: function(component, fields) {
        var field = {};
        var cmp = null;
        var def = null;
        var config = null;

        // Clear any existing components in the form facet
        component.set("v.form", []);
		component.find("ElementHere").set('v.body',[]);
        var facet = component.get("v.form");
        var values = [];
        console.log('====', fields);
        if(fields != null && fields.length > 0){
            for (var ii = 0; ii < fields.length; ii++) {
                field = fields[ii];
                if(field.type.toLowerCase() == 'picklist'){
                    console.log('-===picklist');
                    $A.createComponent(
                        'c:FetchPicklist',
                        {
                            'ObjectName': component.get('v.ObjectName'),
                            'FieldName': field.name
                        },function(lookupMarkup){
                            var form1 = component.find('ElementHere');
                            var divBody = form1.get("v.body");
                            divBody.push(lookupMarkup);
                            form1.set("v.body", divBody);
                            //this.addComponent1(component,facet);
                        }
                    );
                }else{
                var lookup = false;    
                console.log('====Non picklist');
                // Copy the config, note that this type of copy may not work on all browsers!
                config = JSON.parse(JSON.stringify(this.configMap[field.type.toLowerCase()]));
                config.attributes = config.attributes || {};
                config.attributes.values = config.attributes.values || {};
                if(field.type.toLowerCase() == 'date' || field.type.toLowerCase() == 'datetime'){
                    config.attributes.values.class="slds-datepicker__filter slds-grid";
                    //config.attributes.values.labelClass="slds-dropdown slds-dropdown--left slds-datepicker";
                }
                if(field.type.toLowerCase() != 'boolean'){
                    config.attributes.values.class = "slds-form-element__static";
                    //config.attributes.values.labelClass="slds-form-element__label";
                }
                
                if(field.type.toLowerCase() == 'reference'){            
                	 lookup = true;       
                }
                
                if(field.type.toLowerCase() == 'boolean'){
                	config.attributes.values.class = "slds-form-element slds-checkbox--faux";
                	//config.attributes.values.labelClass="slds-form-element__label";    
                } 
                    
                 if(field.type.toLowerCase() == 'picklist'){
                	config.attributes.values.class = "slds-picklist ";
                	//config.attributes.values.labelClass="slds-select_container";
                } 
                    
                  if(field.type.toLowerCase() == 'textarea'){
                	config.attributes.values.class = "slds-form-element__static";
                    //config.attributes.values.labelClass="slds-form-element__label";
                } 
                   
                  if(field.type.toLowerCase() == 'currency'){
                	config.attributes.values.class = "slds-form-element__static";
                    //config.attributes.values.labelClass="slds-form-element__label";
                } 
                    
                    
                    
                    
                // Set the required and label attributes
                // config.attributes.values.required = field.required;
                //config.attributes.values.label = field.label;
                
                // Add the value for each field as a name/value            
                values.push({name: field.fieldPath, value: undefined});
                
                // Add the component to the facet and configure it
                this.addComponent(component, facet, config, field, lookup);
                // component.set("v.values", values);
                }
            }
        }
    },
	getEditableSObject: function(component) {
        var action = component.get("c.getFieldSet");
        if(component.get("v.FieldSet") == null || component.get("v.FieldSet").length <=0 || component.get("v.ObjectName") == null || component.get("v.ObjectName").length <=0){
            return ;
        }
        action.setParams({"strFieldSetName":component.get("v.FieldSet"),
                              "strObjName" : component.get("v.ObjectName")
                             });
        action.setCallback(this, function(response) {
            var jsonFieldset = JSON.parse(response.getReturnValue());
            if(jsonFieldset != ''){
            	component.set("v.SObjectFields", jsonFieldset);
                var fieldNames = [];
                fieldNames = component.get("{!v.SObjectFields}");
                this.createForm(component, fieldNames);
            }
        });
        $A.enqueueAction(action);
	}
})