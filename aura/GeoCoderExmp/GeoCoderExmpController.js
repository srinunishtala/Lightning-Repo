({
	codeAddress : function(component, event, helper) {
        alert('hiii');
		 geocoder = new google.maps.Geocoder();
    var address = component.find("myAaddress").get("v.value");
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {

      alert("Latitude: "+results[0].geometry.location.lat());
      alert("Longitude: "+results[0].geometry.location.lng());
      } 

      else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
	}
})