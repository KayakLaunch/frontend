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
          mapTypeControl: false,
          mapTypeId: 'terrain'
        };
        var mapIseltwald = new google.maps.Map(document.getElementById("map-canvas-iseltwald"),
            mapOptions);

        var mapData = 'https://raw.githubusercontent.com/binghamchris/kayaklaun.ch/dev-v2.0/map/iseltwald.kml';
        var kmlLayerRoute = new google.maps.KmlLayer(mapData, {
          suppressInfoWindows: false,
          preserveViewport: false,
          map: mapIseltwald
        });
      }
      function initialize() {
        initializeMap();
      }
      google.maps.event.addDomListener(window, 'load', initializeMap);

	}); // end of document ready
})(jQuery); // end of jQuery name space