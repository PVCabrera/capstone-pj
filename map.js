function initMap() {
  var location = 
    { lat: 37.865101, lng: -119.538330 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: location
  })
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
};

// Activated Map function
initMap()
