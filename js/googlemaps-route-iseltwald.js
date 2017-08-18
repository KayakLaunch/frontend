(function($){
  $(function(){
    // Map

      function initializeMap() {
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
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);

        var mapData = 'https://github.com/binghamchris/kayaklaunch/blob/gh-pages/map/kayaklaunch-network.kmz?raw=true';
        var kmlLayerLaunching = new google.maps.KmlLayer(mapData, {
          suppressInfoWindows: false,
          preserveViewport: false,
          map: map
        });

        var mapData = 'https://raw.githubusercontent.com/binghamchris/kayaklaun.ch/dev-v2.0/map/iseltwald.kml';
        var kmlLayerRoute = new google.maps.KmlLayer(mapData, {
          suppressInfoWindows: false,
          preserveViewport: false,
          map: map
        });
      }
      function initialize() {
        initializeMap();
      }
      google.maps.event.addDomListener(window, 'load', initializeMap);

  }); // end of document ready
})(jQuery); // end of jQuery name space