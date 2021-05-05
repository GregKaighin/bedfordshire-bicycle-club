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
var stylesArray = [{
    "featureType": "water",
    "stylers": [{
        "visibility": "on"
    },
    {
        "color": "#b5cbe4"
    }
    ]
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
    }
    ]
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
    }
    ]
},
{},
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
var bikeLayer = new google.maps.BicyclingLayer();
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
var directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object to create the route
var directionsDisplay = new google.maps.DirectionsRenderer({
    // Ensures the Bicycling Layer is not removed on subsequent route requests
    suppressBicyclingLayer: true,
    // Makes the route markers draggable
    draggable: true
});

// Create a variable for the waypoints
var waypoints = document.getElementsByName("waypoints[]");
for (var i = 0; i < waypoints.length; i++) {
}

// Display the directions on the map
directionsDisplay.setMap(map);
// Display the directions panel
directionsDisplay.setPanel(document.getElementById("output"));



// Define the calcRoute function
function calcRoute() {
    // Create waypoints variable and loop 
    var waypts = [];
    var waypointElmts = document.getElementsByName('waypoints[]');
    for (var i = 0; i < waypointElmts.length; i++) {
        if (waypointElmts[i].value.length > 0) {
            // Push the waypoints to the route request
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
        } else {
            // Delete the route
            directionsDisplay.setDirections({
                routes: []
            });
            // Recenter the map on Bedfordshire
            map.setCenter(bedfordshire);
        }
    });
}
// Create searchBox1 object for the starting place
var input1 = document.getElementById('from');
var searchBox1 = new google.maps.places.SearchBox(input1);

// Bias the SearchBox1 results towards current map's viewport
map.addListener('bounds_changed', () => {
    searchBox1.setBounds(map.getBounds());
});

// Create searchBox2 object for the waypoint 1
var input2 = document.getElementById('waypoint1');
var searchBox2 = new google.maps.places.SearchBox(input2);

// Bias the SearchBox2 results towards current map's viewport
map.addListener('bounds_changed', () => {
    searchBox2.setBounds(map.getBounds());
});

// Create searchBox3 object for waypoint 2
var input3 = document.getElementById('waypoint2');
var searchBox3 = new google.maps.places.SearchBox(input3);

// Bias the SearchBox3 results towards current map's viewport
map.addListener('bounds_changed', () => {
    searchBox3.setBounds(map.getBounds());
});

// Create searchBox4 object for waypoint 3
var input4 = document.getElementById('waypoint3');
var searchBox4 = new google.maps.places.SearchBox(input4);

// Bias the SearchBox4 results towards current map's viewport
map.addListener('bounds_changed', () => {
    searchBox4.setBounds(map.getBounds());
});

// Create searchBox5 object for the destination
var input5 = document.getElementById('to');
var searchBox5 = new google.maps.places.SearchBox(input5);

// Bias the SearchBox5 results towards current map's viewport
map.addListener('bounds_changed', () => {
    searchBox5.setBounds(map.getBounds());
});

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
            const output = document.querySelector('#output');
            output.innerHTML = '<div class="alert-info">From: Priory Marina.<br/>To: Sandy.<br/> Cycling distance <i class="fas fa-biking"></i> : ' + result.routes[0].legs[0].distance.text + '.<br/>Duration <i class="fas fa-stopwatch"></i> : ' + result.routes[0].legs[0].duration.text + '.</div>';

            // Display the route
            directionsDisplay.setDirections(result);
        } else {
            // Delete the route
            directionsDisplay.setDirections({
                routes: []
            });
            // Recenter the map on Bedfordshire
            map.setCenter(bedfordshire);

            // Show an error message if the route is not possible
            output.innerHTML = '<div class="alert-danger"><i class="fas fa-exclamation-triangle"></i> This route is not possible on a bicycle!</div>';
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
            const output = document.querySelector('#output');
            output.innerHTML = '<div class="alert-info">From: Blue Lagoon.<br/>To: Flitwick.<br/> Cycling distance <i class="fas fa-biking"></i> : ' + result.routes[0].legs[0].distance.text + '.<br />Duration <i class="fas fa-stopwatch"></i> : ' + result.routes[0].legs[0].duration.text + '.</div>';

            // Display the route
            directionsDisplay.setDirections(result);
        } else {
            // Delete the route
            directionsDisplay.setDirections({
                routes: []
            });
            // Recenter the map on Bedfordshire
            map.setCenter(bedfordshire);

            // Show an error message if the route is not possible
            output.innerHTML = '<div class="alert-danger"><i class="fas fa-exclamation-triangle"></i> This route is not possible on a bicycle!</div>';
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
            const output = document.querySelector('#output');
            output.innerHTML = '<div class="alert-info">From: Bedford Park.<br />To: Renhold.<br /> Cycling distance <i class="fas fa-biking"></i> : ' + result.routes[0].legs[0].distance.text + '.<br />Duration <i class="fas fa-stopwatch"></i> : ' + result.routes[0].legs[0].duration.text + '.</div>';

            // Display the route
            directionsDisplay.setDirections(result);
        } else {
            // Delete the route
            directionsDisplay.setDirections({
                routes: []
            });
            // Recenter the map on Bedfordshire
            map.setCenter(bedfordshire);

            // Show an error message if the route is not possible
            output.innerHTML = '<div class="alert-danger"><i class="fas fa-exclamation-triangle"></i> This route is not possible on a bicycle!</div>';
        }
    });

}