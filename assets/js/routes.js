// Create Bedfordshire variable
const bedfordshire = {
    lat: 52.02973,
    lng: -0.45303
};

// Create variables for custom legend icons 
const icons = {
    bikeTrail: {
        name: "Bike trail",
        icon: "assets/img/icons/bike-trail.png",

    },
    bikeLane: {
        name: "Bike lane",
        icon: "assets/img/icons/bike-lane.png",

    },
    bikeFriendlyRoad: {
        name: "Bike-friendly road",
        icon: "assets/img/icons/bike-friendly-road.png",
    },
};

// Custom styling for the map
const stylesArray = [{
    "featureType": "water",
    "stylers": [{
        "visibility": "on"
    },
    {
        "color": "#b5cbe4"
    }]
},
{
    "featureType": "landscape",
    "stylers": [{
        "color": "#efefef"
    }]
},
{
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
        "color": "#83a5b0"
    }]
},
{
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{
        "color": "#bdcdd3"
    }]
},
{
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{
        "color": "lightgreen"
    }]
},
{
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{
        "color": "#e3eed3"
    }]
},
{
    "featureType": "administrative",
    "stylers": [{
        "visibility": "on"
    },
    {
        "lightness": 10
    }]
},
{
    "featureType": "road"
},
{
    "featureType": "poi.park",
    "elementType": "labels",
    "stylers": [{
        "visibility": "on"
    },
    {
        "lightness": 20
    }]
},
{
    "featureType": "road",
    "stylers": [{
        "lightness": 20
    }]
}
]

// Set the map options
const mapOtions = {
    center: bedfordshire,
    zoom: 10,
    styles: stylesArray,
    // Disable the default map UI, enable the zoom control
    disableDefaultUI: true,
    zoomControl: true
};

// Create the map with the bicycle layer enabled
const map = new google.maps.Map(document.getElementById('googleMap'), mapOtions);
const bikeLayer = new google.maps.BicyclingLayer();
bikeLayer.setMap(map);

// Create the map legend and the icons
const legend = document.getElementById("legend");

for (const key in icons) {
    const type = icons[key];
    const name = type.name;
    const icon = type.icon;
    const div = document.createElement("div");
    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
}
// Push the legend to the map
map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

// Create a DirectionsService object to use the route method
const directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object to create the route
const directionsDisplay = new google.maps.DirectionsRenderer({
    // Ensure the Bicycling Layer is not removed on subsequent route requests
    suppressBicyclingLayer: true,
    // Make the route markers draggable
    draggable: true
});

// Create an array for the waypoints
const waypoints = document.getElementsByName("waypoints[]");
for (var i = 0; i < waypoints.length; i++);

// Define the calcRoute function
function calcRoute() {
    // Create waypoints variable array and loop and push to the route request
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
    // Create a route request
    var request = {
        origin: document.getElementById('from').value,
        destination: document.getElementById('to').value,
        travelMode: google.maps.TravelMode.BICYCLING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        waypoints: waypts,
        // Ensure the route is calculated in the order specified
        optimizeWaypoints: false,
    }
    // Pass the request to the route method
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            computeTotalDistAndTime(response);
            // Display the directions on the map
            directionsDisplay.setMap(map);
            //Display the directions panel
            directionsDisplay.setPanel(document.getElementById("directions-panel"));
            // Updates the route summary panel when the directions change
            directionsDisplay.addListener("directions_changed", () => {
                computeTotalDistAndTime(directionsDisplay.getDirections());
            });
            // Get the total route distance and duration
            function computeTotalDistAndTime(result) {
                var totalDist = 0;
                var totalTime = 0;
                var myroute = result.routes[0];
                for (i = 0; i < myroute.legs.length; i++) {
                    totalDist += myroute.legs[i].distance.value;
                    totalTime += myroute.legs[i].duration.value;
                }
                // Convert the total distance from meters to miles
                totalDist = totalDist / (1000 / 0.62137);
                // Convert the total time from minute to hours and minutes
                var hours = Math.floor((totalTime / 60) / 60);
                var minutes = (totalTime / 60) % 60;
                var routeSummary = document.querySelector('#route-summary');
                // Pass the converted total time and distance to the route summary div
                // Statements to handle 0 hours, 1 hour and >1 hours and display with correct grammar
                if (hours === 0) {
                    routeSummary.innerHTML = '<div class="alert-info">Route Summary <br /> Total distance: ' + (totalDist).toFixed(1) + ' miles' + '.<br />Total time: ' + minutes.toFixed(0) + ' mins' + '.</div>';
                } else if (hours === 1) {
                    routeSummary.innerHTML = '<div class="alert-info">Route Summary <br /> Total distance: ' + (totalDist).toFixed(1) + ' miles' +
                        '.<br />Total time: ' + hours.toFixed(0) + ' hour ' + minutes.toFixed(0) + ' mins' + '.</div>';
                }
                else {
                    routeSummary.innerHTML = '<div class="alert-info">Route Summary <br /> Total distance: ' + (totalDist).toFixed(1) + ' miles' +
                        '.<br />Total time: ' + hours.toFixed(0) + ' hours ' + minutes.toFixed(0) + ' mins' + '.</div>';
                }
            }
            // Show an error message for invalid routes
        } else {
            var routeSummary = document.querySelector('#route-summary');
            routeSummary.innerHTML = '<div class="alert-danger"><i class="fas fa-exclamation-triangle"></i> Please enter a valid route!</div>';
            // Clear the map
            directionsDisplay.setMap();
            // Clear the directions panel 
            directionsDisplay.setPanel();
        }
    });
}

// A function to clear the map, summary, directions panel and inputs
function clearRoute() {
    // Clear the map
    directionsDisplay.setMap();
    // Clear the directions panel
    directionsDisplay.setPanel();
    var routeSummary = document.querySelector('#route-summary');
    routeSummary.innerHTML = null;
    input1.value = "";
    input2.value = "";
}

// Create searchBox1 object for the starting place
var input1 = document.getElementById('from');
var searchBox1 = new google.maps.places.SearchBox(input1);


// Bias the SearchBox1 results towards current map's viewport
map.addListener('bounds_changed', () => {
    searchBox1.setBounds(map.getBounds());
});

// Create searchBox2 object for the destination
var input2 = document.getElementById('to');
var searchBox2 = new google.maps.places.SearchBox(input2);

// Bias the SearchBox2 results towards current map's viewport
map.addListener('bounds_changed', () => {
    searchBox2.setBounds(map.getBounds());
});

// Functions to create and delete new waypoint search boxes
$(document).ready(function () {
    // Set the maximum number of waypoint inputs
    var max_fields = 9;
    var wrapper = $(".waypoint-input-fields");
    var add_button = $(".add_form_field");

    var x = 1;
    $(add_button).click(function (e) {
        e.preventDefault();
        if (x < max_fields) {
            x++;
            //Add input box
            $(wrapper).append('<div><input type="text" id="waypoint-inputs" class="form-control" name="waypoints[]"/><a href="#" class="delete"> <i class="fas fa-times"></i></a></div>');
        } if ($(".waypoint").length < max_fields) {
        } else {
            alert('Maximum number of waypoints allowed is 8')
        }
    });
    // Delete input box
    $(wrapper).on("click", ".delete", function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })
});






/*

//Functions for recommended routes
function prioryMarinaSandy() {
    // Create a route request
    var request = {
        origin: {
            lat: 52.131972,
            lng: -0.434981
        },
        destination: {
            lat: 52.1281,
            lng: -0.2868
        },
        travelMode: google.maps.TravelMode.BICYCLING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }
    // Pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            // Get the route distance and time and pass to the #output div
            const routeSummary = document.querySelector('#route-summary');
            routeSummary.innerHTML = '<div class="alert-info">From: Priory Marina.<br/>To: Sandy.<br/> Cycling distance <i class="fas fa-biking"></i> : ' + result.routes[0].legs[0].distance.text + '.<br/>Duration <i class="fas fa-stopwatch"></i> : ' + result.routes[0].legs[0].duration.text + '.</div>';

            // Display the route
            directionsDisplay.setDirections(result);
        }
    });
}

function blueLagoonFlitwick() {
    // Create a route request
    var request = {
        origin: {
            lat: 51.9941,
            lng: -0.2580
        },
        destination: {
            lat: 52.0046,
            lng: -0.4979
        },
        travelMode: google.maps.TravelMode.BICYCLING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }
    // Pass the request to the .route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            // Get the route distance and time and pass to the #output div
            const routeSummary = document.querySelector('#route-summary');
            routeSummary.innerHTML = '<div class="alert-info">From: Blue Lagoon.<br/>To: Flitwick.<br/> Cycling distance <i class="fas fa-biking"></i> : ' + result.routes[0].legs[0].distance.text + '.<br />Duration <i class="fas fa-stopwatch"></i> : ' + result.routes[0].legs[0].duration.text + '.</div>';

            // Display the route
            directionsDisplay.setDirections(result);
        }
    });
}

function bedfordParkRenhold() {
    // Create a route request
    var request = {
        origin: {
            lat: 52.1472,
            lng: -0.4649
        },
        destination: {
            lat: 52.1588,
            lng: -0.3914
        },
        travelMode: google.maps.TravelMode.BICYCLING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }
    // Pass the request to the .route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            // Get the route distance and time and pass to the #output div
            const routeSummary = document.querySelector('#route-summary');
            routeSummary.innerHTML = '<div class="alert-info">From: Bedford Park.<br />To: Renhold.<br /> Cycling distance <i class="fas fa-biking"></i> : ' + result.routes[0].legs[0].distance.text + '.<br />Duration <i class="fas fa-stopwatch"></i> : ' + result.routes[0].legs[0].duration.text + '.</div>';

            // Display the route
            directionsDisplay.setDirections(result);
        }
    });
}

*/