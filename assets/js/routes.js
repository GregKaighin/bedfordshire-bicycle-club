/*
This code was created with the help of the tutorial found here:
Javascript Google Map Directions API & Places API Project - [2021] | Google Map Javascript Tutorial -
https://www.youtube.com/watch?v=BkGtNBrOhKU&t=1837s

Additional features not found in the tutorial include waypoints, custom map styling,
custom map legend, changing the travel mode to bicycling, the bicycle layer, displaying preset routes,
and converting distance and time values.
*/

// Lattitude and longitude for centering the map
const bedfordshire = {
    lat: 52.02973,
    lng: -0.45303
};

// Custom styling for map
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
];

// Set map options
const mapOtions = {
    center: bedfordshire,
    zoom: 10,
    styles: stylesArray,
    // Disable default map UI, enable zoom control
    disableDefaultUI: true,
    zoomControl: true
};

// Create map object and apply it to html element with the map options
const map = new google.maps.Map(document.getElementById("googleMap"), mapOtions);
// Create bicycle layer object and apply to map
const bikeLayer = new google.maps.BicyclingLayer();
bikeLayer.setMap(map);

// Custom map legend icons 
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

// Create map legend and icons
const legend = document.getElementById("legend");
for (const key in icons) {
    const type = icons[key];
    const name = type.name;
    const icon = type.icon;
    const div = document.createElement("div");
    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
}
// Push legend to map
map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

// Create a DirectionsService object to use route method
const directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object to create route
const directionsDisplay = new google.maps.DirectionsRenderer({
    /* Ensure Bicycling Layer is not removed on subsequent route requests,
       this is needed because the bicycle layer is displayed when the map is initially drawn */
    suppressBicyclingLayer: true,
    // Make route markers draggable
    draggable: true
});

// Create an array for waypoints
var waypoints = document.getElementsByName("waypoints[]");
for (var i = 0; i < waypoints.length; i++);

function calcRoute() {
    // Create waypoints array and loop and push to route request
    var waypts = [];
    var waypointElmts = document.getElementsByName("waypoints[]");
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
        origin: document.getElementById("start").value,
        destination: document.getElementById("end").value,
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
            // Update route summary panel when directions are dragged
            directionsDisplay.addListener("directions_changed", () => {
                computeTotalDistAndTime(directionsDisplay.getDirections());
            });
        } else {
            // Error massage for invalid routes
            var routeSummary = document.querySelector('#route-summary');
            routeSummary.innerHTML = '<div class="alert-danger"><i class="fas fa-exclamation-triangle"></i> Please enter a valid route!</div>';
            // Clear map
            directionsDisplay.setMap();
            // Clear directions panel 
            directionsDisplay.setPanel();
        }
    });
}

function computeTotalDistAndTime(result) {
    var totalDist = 0;
    var totalTime = 0;
    var myroute = result.routes[0];
    for (i = 0; i < myroute.legs.length; i++) {
        totalDist += myroute.legs[i].distance.value;
        totalTime += myroute.legs[i].duration.value;
    }
    // Convert total distance from meters to miles
    totalDist = totalDist / (1000 / 0.62137);
    // Convert total time from minutes to hours and minutes
    var hours = Math.floor((totalTime / 60) / 60);
    var minutes = (totalTime / 60) % 60;
    // Pass converted total time and distance to route summary div
    var routeSummary = document.querySelector('#route-summary');
    // Statements to handle 0 hours, 1 hour and >1 hour and display with correct grammar
    if (hours === 0) {
        routeSummary.innerHTML = '<div class="alert-info">Route Summary <br /> Total distance: ' + (totalDist).toFixed(1) + ' miles' + '<br />Total time: About ' + minutes.toFixed(0) + ' minutes' + '</div>';
    } else if (hours === 1) {
        routeSummary.innerHTML = '<div class="alert-info">Route Summary <br /> Total distance: ' + (totalDist).toFixed(1) + ' miles' +
            '<br />Total time: About ' + hours.toFixed(0) + ' hour ' + minutes.toFixed(0) + ' minutes' + '</div>';
    }
    else {
        routeSummary.innerHTML = '<div class="alert-info">Route Summary <br /> Total distance: ' + (totalDist).toFixed(1) + ' miles' +
            '<br />Total time: About ' + hours.toFixed(0) + ' hours ' + minutes.toFixed(0) + ' minutes' + '</div>';
    }
}

// Clear map, summary, directions panel and inputs
function clearRoute() {
    // Clear map
    directionsDisplay.setMap();
    // Clear directions panel
    directionsDisplay.setPanel();
    // Clear summary
    var routeSummary = document.querySelector("#route-summary");
    routeSummary.innerHTML = null;
    // Clear inputs
    inputFrom.value = "";
    inputTo.value = "";
}

// Create inputs and search box objects for 'start' and 'end' and bias results towards map bounds
var inputFrom = document.getElementById("start");
var searchBoxFrom = new google.maps.places.SearchBox(inputFrom);
map.addListener("bounds_changed", () => {
    searchBoxFrom.setBounds(map.getBounds());
});
var inputTo = document.getElementById("end");
var searchBoxTo = new google.maps.places.SearchBox(inputTo);
map.addListener("bounds_changed", () => {
    searchBoxTo.setBounds(map.getBounds());
});
// Create and delete new waypoint fields and search boxes
$(document).ready(function () {
    // Set maximum number of fields
    var maxFields = 9;
    var wrapper = $(".waypoint-input-fields");
    var addButton = $(".add-form-field");
    var x = 1;
    // On add input button click
    $(addButton).click(function (e) {
        e.preventDefault();
        // Maximum input fields allowed
        if (x < maxFields) {
            // Increment fields
            x++;
            // Create input field
            $(wrapper).append('<div><input type="text" placeholder="Waypoint" class="waypoint-inputs mb-2" name="waypoints[]"/><a href="#" class="delete"><i class="fas fa-times waypoint-inputs"></i></a></div>');
            var inputWP = document.getElementsByClassName("waypoint-inputs");
            // Dynamically initialize search box to input elements
            for (var y = 0; y < inputWP.length; y++)
                var searchBoxWP = new google.maps.places.SearchBox(inputWP[y], { bounds: map.getBounds() });
        } else {
            // Warning for trying to exceed maximum number of waypoints
            alert("The maximum number of waypoints allowed is 8!");
        }
    });
    // Delete inputs
    $(wrapper).on("click", ".delete", function (e) {
        e.preventDefault();
        $(this).parent("div").remove();
        x--;
    });
    // Delete all inputs when clear route is clicked
    $(document).ready(function () {
        $("#clear-route").click(clearRoute);
    });
    function clearRoute() {
        $(".waypoint-inputs").remove();
        // Reset the waypoints counter
        x = 1;
    }
});

//Functions for preset club routes
function prioryMarinaSandy() {
    // Scroll the window to place the preset route buttons at top of screen //
    window.location.href = "#preset-routes";
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
    };;
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            computeTotalDistAndTime(response);
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById("directions-panel"));
            directionsDisplay.addListener("directions_changed", () => {
                computeTotalDistAndTime(directionsDisplay.getDirections());
            });
        } else {
            var routeSummary = document.querySelector("#route-summary");
            routeSummary.innerHTML = '<div class="alert-danger"><i class="fas fa-exclamation-triangle"></i> Route unavailable!</div>';
            directionsDisplay.setMap();
            directionsDisplay.setPanel();
        }
    });
}

function southVillagesLoop() {
    window.location.href = "#preset-routes";
    // Route waypoints
    var wp1 = new google.maps.LatLng(51.99840, -0.47735);
    var wp2 = new google.maps.LatLng(51.98286, -0.49563);
    var request = {
        origin: {
            lat: 52.00332,
            lng: -0.49511
        },
        destination: {
            lat: 52.00332,
            lng: -0.49511
        },
        waypoints: [{ location: wp1, stopover: true }, { location: wp2, stopover: true }],
        optimizeWaypoints: false,
        travelMode: google.maps.TravelMode.BICYCLING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            computeTotalDistAndTime(response);
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById("directions-panel"));
            directionsDisplay.addListener("directions_changed", () => {
                computeTotalDistAndTime(directionsDisplay.getDirections());
            });
        } else {
            var routeSummary = document.querySelector("#route-summary");
            routeSummary.innerHTML = '<div class="alert-danger"><i class="fas fa-exclamation-triangle"></i> Route unavailable!</div>';
            directionsDisplay.setMap();
            directionsDisplay.setPanel();
        }
    });
}

function northBedfordLoop() {
    window.location.href = "#preset-routes";
    var wp1 = new google.maps.LatLng(52.16544, -0.44906);
    var wp2 = new google.maps.LatLng(52.17691, -0.42571);
    var wp3 = new google.maps.LatLng(52.18438, -0.40065);
    var wp4 = new google.maps.LatLng(52.15890, -0.39155);
    var wp5 = new google.maps.LatLng(52.13475, -0.45009);
    var request = {
        origin: {
            lat: 52.14718,
            lng: -0.46519
        },
        destination: {
            lat: 52.14671,
            lng: -0.46459
        },
        waypoints: [{ location: wp1, stopover: true }, { location: wp2, stopover: true },
        { location: wp3, stopover: true }, { location: wp4, stopover: true }, { location: wp5, stopover: true }],
        optimizeWaypoints: false,
        travelMode: google.maps.TravelMode.BICYCLING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            computeTotalDistAndTime(response);
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById("directions-panel"));
            directionsDisplay.addListener("directions_changed", () => {
                computeTotalDistAndTime(directionsDisplay.getDirections());
            });
        } else {
            var routeSummary = document.querySelector("#route-summary");
            routeSummary.innerHTML = '<div class="alert-danger"><i class="fas fa-exclamation-triangle"></i> Route unavailable!</div>';
            directionsDisplay.setMap();
            directionsDisplay.setPanel();
        }
    });
}