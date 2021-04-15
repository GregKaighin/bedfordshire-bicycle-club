// Create Bedforshire variable
const bedfordshire = {
    lat: 52.02973,
    lng: -0.45303
};

// Set the map options
const mapOtions = {
    center: bedfordshire,
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

// Create the map
var map = new google.maps.Map(document.getElementById("googleMap"), mapOtions);

// Add the Bicycle Layer
var bicycleLayer;

// Define a function to enable disable the bicycle layer
function toggleBicycleLayer() {
    if (bicycleLayer.getMap() == null) {
        //traffic layer is disabled.. enable it
        bicycleLayer.setMap(map);
    } else {
        //traffic layer is enabled.. disable it
        bicycleLayer.setMap(null);
    }
}

function init() {
    bicycleLayer = new google.maps.BicyclingLayer();
    google.maps.event.addDomListener(document.getElementById('bicycleLayerToggle'), 'click', toggleBicycleLayer);
}

google.maps.event.addDomListener(window, 'load', init);

//Create a DirectionsService object to use the route method and get a result for the request
var directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

// Bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

// Define the calcRoute function
function calcRoute() {
    // Create a request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.BICYCLING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }
    // Pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            // Get the route distance and time and pass to the #output div
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Cycling distance <i class='fas fa-biking'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-stopwatch'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

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
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> This route is not possible on a bicycle!</div>";
        }
    });
}

// Create searchBox1 object for the starting place
var input1 = document.getElementById("from");
var searchBox1 = new google.maps.places.SearchBox(input1);

// Bias the SearchBox1 results towards current map's viewport
map.addListener("bounds_changed", () => {
    searchBox1.setBounds(map.getBounds());
});

// Create searchBox2 object for the destination
var input2 = document.getElementById("to");
var searchBox2 = new google.maps.places.SearchBox(input2);

// Bias the SearchBox2 results towards current map's viewport
map.addListener("bounds_changed", () => {
    searchBox2.setBounds(map.getBounds());
});

// Load the bikeshops GeoJSON onto the map
function toggleBikeShops() {
    map.data.loadGeoJson('assets/js/bikeshops.json', {
        idPropertyName: 'storeid'
    });
}

// Define the bikeshop icon and put on the map at correct size
map.data.setStyle((feature) => {
    return {
        icon: {
            url: `assets/img/icons/icon_${feature.getProperty('category')}.png`,
            scaledSize: new google.maps.Size(36, 36),
        },
    };
});

// Show the information for a bikeshop when its icon is clicked
const infoWindow = new google.maps.InfoWindow();
map.data.addListener('click', (event) => {
    const name = event.feature.getProperty('name');
    const description = event.feature.getProperty('description');
    const hours = event.feature.getProperty('hours');
    const phone = event.feature.getProperty('phone');
    const position = event.feature.getGeometry().get();
    const content = `
      <h2>${name}</h2><p>${description}</p>
      <p><b>Open:</b> ${hours}<br/><b>Phone:</b> ${phone}</p>
    `;

    infoWindow.setContent(content);
    infoWindow.setPosition(position);
    infoWindow.setOptions({
        pixelOffset: new google.maps.Size(0, -30)
    });
    infoWindow.open(map);
});