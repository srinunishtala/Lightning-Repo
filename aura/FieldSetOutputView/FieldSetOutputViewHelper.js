({
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
        "reference": { componentDef: "c:InputLookup" , attributes: { values: { isEdit: false }}}, //, attributes: { values: { isEdit: "false" }}
        "string": { componentDef: "ui:outputText" },
        "textarea": { componentDef: "ui:outputText"},
        "time": { componentDef: "ui:outputDateTime", attributes: { values: { format: "h:mm a"} } },
        "url": { componentDef: "ui:outputText" },
        "phone": { componentDef: "ui:outputPhone"},
        "richtextarea": { componentDef: "ui:outputRichText"} 
    },   
	getsObjectDetail: function(component) {
        var action = component.get("c.getFieldSet");
        var action1 = component.get("c.fetchSObjects");
        if(component.get("v.FieldSet") != null && component.get("v.FieldSet").length >0 && component.get("v.ObjectName") != null && component.get("v.ObjectName").length >0){
            action.setParams({"strFieldSetName":component.get("v.FieldSet"),
                              "strObjName" : component.get("v.ObjectName")
                             });
            action1.setParams({
                'recordId': component.get("v.recordId")
            })
        } else {
            return ;
        }
        
        action.setCallback(this, function(response) {
            var jsonFieldset = JSON.parse(response.getReturnValue());
            if(jsonFieldset != ''){
            	component.set("v.SObjectFields", jsonFieldset);
            }
        });
        action1.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var object = response.getReturnValue();
                component.set("v.SObjectList", response.getReturnValue());
                var SObjects = component.get("{!v.SObjectList}");
                var fieldNames = component.get("{!v.SObjectFields}");
                var values = [];
                if(SObjects != null && SObjects.length >0 ){
                    for (var i=0; i<SObjects.length; i++){
                        if(fieldNames != null && fieldNames.length > 0){
                            for (var ii = 0; ii < fieldNames.length; ii++) {
                                field = fieldNames[ii];
                                values.push({name: field.name, value: SObjects[i][field.name]});
                        		component.set("v.values", values);
                                var label = [fieldNames[ii].label];
                                var valuesForArtifacts = SObjects[i][fieldNames[ii].name];
                                if(valuesForArtifacts == undefined){
                                    valuesForArtifacts = '';
                                }
                                
                                var config = JSON.parse(JSON.stringify(this.configOutputMap[field.type.toLowerCase()]));
                                
                                config.attributes = config.attributes || {};
                                config.attributes.values = config.attributes.values || {};
                                config.attributes.values.id = field.name;
                                config.attributes.values.value=valuesForArtifacts; 
                                
                                if(field.type.toLowerCase() != 'reference') {
                                    config.attributes.values.class="slds-form-element__static";  
                                } else {
                                    config.attributes.values.FieldsToDisplay=field.name;
                                    config.attributes.values.type=component.get("v.ObjectName");
                                }
                                console.log('attribute bj', config.attributes.values);
                                $A.createComponent('c:FieldRerender', {
                                    'TagToRender':config.componentDef,
                                    'TagAttributes' : JSON.stringify(config.attributes.values),
                                    'TagLabel' : field.label,
                                    'id': field.name,
                                    'isEditable': false
                                },function(comp){
                                    var op = component.find("detailView");
                                    var body = op.get('v.body');
                                    body.push(comp);
                                    op.set('v.body',body);
                                });
                            }
                        }
                    }
                }
            }
        });
        $A.enqueueAction(action);
        $A.enqueueAction(action1);
    },
    /* Initialize the modal for Edit View */
    initializeModalEdit : function(component, event){
        var body = component.find('detailView');
        body.set('v.body', '');
        
        $A.createComponent('c:FieldSetEditView',{
            'FieldSet': component.get("v.FieldSet"),
            'ObjectName': component.get("v.ObjectName"),
            'sObjectId': component.get("v.recordId")
        } , function(editModal){
           var op = component.find("editModal");
           var body = op.get('v.body'); 
           body.push(editModal);
           op.set('v.body', body); 
        });
    }
})