({
    // Calculate the Haversine Distance between a pair of lat/long co-ordinates.
    // See "What formulae does the Geolocation Distance" at http://salesforce.stackexchange.com/questions/32585/what-formulae-does-the-geolocation-distance-use for more information
    calculateHaversineDistance: function(lat1, lon1, lat2, lon2) {
        // Earth's radius varies from 6356.752 km at the poles to 6378.137 km at the equator
    	var radius = 6371.00;
        var dLat = this.toRadians(lat2 - lat1);
        var dLon = this.toRadians(lon2 - lon1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.asin(Math.sqrt(a));
        var kmToMiles = 0.621371;

        return (radius * c * kmToMiles).toFixed(2);
    },

    // Given a degree, calculate the value in radians
    toRadians: function(degree) {
    	return ((degree * 3.1415926) / 180);
    }
})