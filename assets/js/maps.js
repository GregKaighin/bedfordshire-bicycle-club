// Set map options

var bedfordshire = {
    lat: 52.02973,
    lng: -0.45303
};
var mapOtions = {
    center: bedfordshire,
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
}

//Create the map with options set
var map = new google.maps.Map(document.getElementById("googleMap"), mapOtions)

//Create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//Create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//Bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

//Define calcRoute function
function calcRoute() {
    //Create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.BICYCLING, //WALKING, BICYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    // Pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            // Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            // Display the route
            directionsDisplay.setDirections(result);
        } else {
            // Delete route from the map
            directionsDisplay.setDirections({
                routes: []
            });
            // Center map on Bedfordshire
            map.setCenter(bedfordshire);

            // Show error message if the route is not possible
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });

}

// Create searchBox objects for all inputs
var input1 = document.getElementById("from");
var searchBox1 = new google.maps.places.SearchBox(input1);
// Bias the SearchBox results towards current map's viewport.
map.addListener("bounds_changed", () => {
    searchBox1.setBounds(map.getBounds());
});
var input2 = document.getElementById("to");
var searchBox2 = new google.maps.places.SearchBox(input2);
// Bias the SearchBox results towards current map's viewport.
map.addListener("bounds_changed", () => {
    searchBox2.setBounds(map.getBounds());
});