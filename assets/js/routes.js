// Create Bedforshire variable
const bedfordshire = {
    lat: 52.02973,
    lng: -0.45303
};

// Custom map styling
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
// Create the legend and place the icons
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


// Create a DirectionsService object to use the route method and get a result for the request
var directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object to create the route
var directionsDisplay = new google.maps.DirectionsRenderer({
    suppressBicyclingLayer: true
});

// Display the directions on the map
directionsDisplay.setMap(map);


// Define the calcRoute function
function calcRoute() {
    // Create a route request
    var request = {
        origin: document.getElementById('from').value,
        destination: document.getElementById('to').value,
        travelMode: google.maps.TravelMode.BICYCLING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    // Pass the request to the .route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            // Get the route distance and time and pass to the #output div
            const output = document.querySelector('#output');
            output.innerHTML = '<div class="alert-info">From: ' + document.getElementById('from').value + '.<br />To: ' + document.getElementById('to').value + '.<br /> Cycling distance <i class="fas fa-biking"></i> : ' + result.routes[0].legs[0].distance.text + '.<br />Duration <i class="fas fa-stopwatch"></i> : ' + result.routes[0].legs[0].duration.text + '.</div>';

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
    // Pass the request to the .route method
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