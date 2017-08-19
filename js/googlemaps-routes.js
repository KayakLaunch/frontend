// Generalised function for displaying route maps

function initializeMap(mapDiv, kmlUrl, showLaunchingMap) {

  // Set Google Maps options
  // These are kept identical across all route maps on the site
  var myLatLong = new google.maps.LatLng(0.0,0.0);
  var mapOptions = {
    center: myLatLong,
    scrollwheel: true,
    zoom: 3,
    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT
    },
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DEFAULT,
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    mapTypeId: 'terrain'
  };

  // Bind the map to the targeted div
  var map = new google.maps.Map(document.getElementById(mapDiv), mapOptions);

  // If requested, add the launching spots mapping data to the map
  if (showLaunchingMap) {
	  var mapData = 'https://github.com/binghamchris/kayaklaunch/blob/gh-pages/map/kayaklaunch-network.kmz?raw=true';
	  var kmlLayerLaunching = new google.maps.KmlLayer(mapData, {
	    suppressInfoWindows: false,
	    preserveViewport: false,
	    map: map
	  });
	}

  // Add the route's mapping data to the map
  var mapData =  kmlUrl;
  var kmlLayerRoute = new google.maps.KmlLayer(mapData, {
    suppressInfoWindows: false,
    preserveViewport: false,
    map: map
  });
}