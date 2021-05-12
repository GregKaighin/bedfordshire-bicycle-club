function calcRoute() {
    // Create waypoints variable array and loop and push to route request
    var waypts = [];
    var waypointElmts = document.getElementsByName('waypoints[]');
    for (var i = 0; i < waypointElmts.length; i++) {
        if (waypointElmts[i].value.length > 0) {
            waypts.push({
                location: waypointElmts[i].value,
                stopover: true
            });
        }
    }
    // Create route request
    var request = {
        origin: document.getElementById('from').value,
        destination: document.getElementById('to').value,
        travelMode: google.maps.TravelMode.BICYCLING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        waypoints: waypts,
        // Calculate route in specified order
        optimizeWaypoints: false,
    };
    // Pass request to route method
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            computeTotalDistAndTime(response);
            // Display directions on map
            directionsDisplay.setMap(map);
            //Display directions panel
            directionsDisplay.setPanel(document.getElementById("directions-panel"));
            // Updates route summary panel when directions change
            directionsDisplay.addListener("directions_changed", () => {
                computeTotalDistAndTime(directionsDisplay.getDirections());
            });
        } else {
            var routeSummary = document.querySelector('#route-summary');
            routeSummary.innerHTML = '<div class="alert-danger"><i class="fas fa-exclamation-triangle"></i> Please enter a valid route!</div>';
            // Clear map
            directionsDisplay.setMap();
            // Clear directions panel 
            directionsDisplay.setPanel();
        }
    });
}