let bedfordshire;
let map;
let bounds;
let infoWindow;
let currentInfoWindow;
let service;

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

function initMap() {
    // Initialize variables
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow;
    currentInfoWindow = infoWindow;
    let bedfordshire = {
        lat: 52.02973,
        lng: -0.45303
    };
    // Create the map, centered on Bedfordshire
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: bedfordshire,
        zoom: 10,
        styles: stylesArray,
        // Disable the default map UI, enable the zoom control
        disableDefaultUI: true,
        zoomControl: true
    });
    bounds.extend(bedfordshire);
    map.setCenter(bedfordshire);
    // Call Places Nearby Search
    getNearbyPlaces(bedfordshire);
}

// Perform a Places Nearby Search Request
function getNearbyPlaces(position) {
    let request = {
        location: position,
        rankBy: google.maps.places.RankBy.DISTANCE,
        keyword: 'bicycle shop'
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}
// Handle the results of the Nearby Search
function nearbyCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results);
    }
}

// Set markers at the location of each place result
function createMarkers(places) {
    places.forEach(place => {
        let marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name
        });
        // Add click listener to each marker
        google.maps.event.addListener(marker, 'click', () => {
            let request = {
                placeId: place.place_id,
                fields: [
                    'name', 'formatted_address', 'formatted_phone_number', 'geometry', 'rating',
                    'website'
                ]

            };
            // Fetch the details of a place when the user clicks on a marker.
            service.getDetails(request, (placeResult, status) => {
                showDetails(placeResult, marker, status)
            });
        });
        // Adjust the map bounds to include the location of this marker
        bounds.extend(place.geometry.location);
    });
    /* When all the markers have been placed, adjust the bounds of the map to
     * show all the markers within the visible area. */
    map.fitBounds(bounds);
}

// Build an InfoWindow to display details above the marker
function showDetails(placeResult, marker, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        let placeInfowindow = new google.maps.InfoWindow();
        // Initialize the variables for the Info Window results
        let rating = 'Rating not available';
        if (placeResult.rating) rating = placeResult.rating;
        let formatted_address = 'Address not available';
        if (placeResult.formatted_address) formatted_address = placeResult.formatted_address;
        let formatted_phone_number = 'Phone number not available';
        if (placeResult.formatted_phone_number) formatted_phone_number = placeResult.formatted_phone_number;
        let website = 'Website not available';
        if (placeResult.website) website = placeResult.website;
        // Send the search results to the Info Window
        placeInfowindow.setContent(`<div><strong>${placeResult.name}</strong><br>Rating: ${rating}<br>Address: ${formatted_address}<br>Phone: ${formatted_phone_number} <div style='border-top: 1px solid rgb(204, 204, 204); margin-top: 9px; padding: 6px; font-size: 13px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; font-family: Roboto, Arial;'>
<a href='${website}' target='_blank' rel='noopener' style='cursor: pointer; color: rgb(66, 127, 237); text-decoration: none;'> ${website} </a></div></div>`);
        placeInfowindow.open(marker.map, marker);
        currentInfoWindow.close();
        currentInfoWindow = placeInfowindow;
    } else {
        console.log('showDetails failed: ' + status);
    }
}