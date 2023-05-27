// Activated Map function
initMap()

var map;
var searchBox;
var markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.4280, lng: -110.5885}, // Set the initial map center
    zoom: 12 // Set the initial zoom level
  });

  // Create the search box and link it to the UI element
  var input = document.getElementById('search-bar');
  searchBox = new google.maps.places.SearchBox(input);

  // Bias the search box results towards the current map's viewport
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  // Listen for the event fired when the user selects a prediction from the dropdown
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear the previous markers
    clearMarkers();

    // For each place, add a marker and zoom to it
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      var marker = new google.maps.Marker({
        map: map,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(bounds);
  });
}

// Function to clear the markers from the map
function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

// Function to handle search when the user presses the "Enter" key
function handleSearch(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchMap();
  }
}

// Add event listener to the search bar
document.getElementById('search-bar').addEventListener('keydown', handleSearch);

// Function to search the map
function searchMap() {
  var query = document.getElementById('search-bar').value;
  var request = {
    query: query,
    fields: ['name', 'geometry']
  };

  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Clear the previous markers
      clearMarkers();

      // Get the first result and extract its location
      var place = results[0];
      var location = place.geometry.location;

      // Center the map on the searched location
      map.setCenter(location);

      // Add a marker to the searched location
      var marker = new google.maps.Marker({
        map: map,
        title: place.name,
        position: location
      });

      markers.push(marker);
    }
  });
}

