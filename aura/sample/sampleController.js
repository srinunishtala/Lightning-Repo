({
	getInput : function(cmp, event) {
		var textI = cmp.find("textI");

		// Get the text value
		var textvalue = textI.get("v.value");
		var textO = cmp.find("textO");

		// Set the text value in the ui:outputText component
		textO.set("v.value", textvalue);
	},

	getDate : function(cmp, event) {
		// Set the new date
		var newdate = new Date();
		cmp.set("v.myDate", newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate());
	},

	inspectKeyEvent : function(cmp, event) {
		// Get the keycode value of the pressed key
		var keyCodeValue = event.getParam("keyCode");
		cmp.find("outputValue").set("v.value", keyCodeValue);
	},

	inspectMouseEvent : function(cmp, event) {
		// Get the button value of the pressed button: 0 (left), 1 (middle), or
		// 2 (right)
		// To handle a DOM event, use event.button instead of event.getParam
		var buttonValue = event.getParam("button");
		cmp.find("outputValue").set("v.value", buttonValue);
	}
})