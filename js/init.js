/*
 * Made by WebDesignCrowd
 * http://webdesigncrowd.com
 *
 */
 
(function($){
	$(function(){
	  
    var navbarHeight = 80;

    // Slide in Functionality 
    $(window).scroll(function() {
      var top = $(window).scrollTop();
      $(".slide-in").each(function () {
        var thisTop = $(this).offset().top;
        var height = $(this).height();
        if ((top > (thisTop - (height * 1.5))) && !$(this).hasClass("slid")) {
          $(this).addClass("slid");
        }
      });   
      $('body').scrollspy({ offset: navbarHeight+10, target: '#navbar' });
    });

	  // Home
	  $('.carousel').carousel({
        pause: false,
        interval: 8000
    });

    // Navbar Affix
    $('#navbar').affix({
      offset: {
        top: function () {
          return (this.top = $(window).height() - navbarHeight)
        }
      }
    })
    

    // Parallax Scripts
    function updateParallax() {
      if ($(window).width() > 768) {
        $(".parallax").each(function () {
          var bottom = $(this).offset().top + $(this).height();
          var top = $(this).offset().top;
          var windowHeight = $(window).height();
          var scrollTop = $(window).scrollTop() + windowHeight;
          var fromTop = 0;
          var isHome = true;
          if (top === 0) { 
            fromTop = $(window).scrollTop() - top; 
            isHome = true;
          }
          else { 
            fromTop = $(window).scrollTop() - top + windowHeight; 
            isHome = false;
          }
          if ((bottom > $(window).scrollTop()) && (top < scrollTop)) {   
            var parallax = -1 * (fromTop / 3);
            var revParallax = parallax;
            var percent = 1 - 1.3 *($(window).scrollTop() / $(window).height());
            if (isHome) { 
              revParallax += navbarHeight; 
              $("#home .logo").css('marginTop', parallax + "px");
              $("#home .logo, #home .welcome, #home .call-to-action, #home .macbook-preview").css('opacity', percent);
            }
            $(this).children("img").first().css('bottom', revParallax + "px");
          }
        });
      }
    }
    updateParallax();
    
    $(window).scroll(function() {
      updateParallax();
      // if ($(window).height() > $(window).scrollTop()) {   
      //   var parallax = -1 * ($(window).scrollTop() / 3);
      //   var revParallax = navbarHeight + parallax;
      //   var percent = 1 - 1.5 *($(window).scrollTop() / $(window).height());
      //   $(".bg img").css('bottom', revParallax + "px");
      //   $("#home .logo").css('marginTop', parallax + "px");
      //   $("#home .logo, #home .welcome, #home .call-to-action").css('opacity', percent);
      // }
    });
    
      
    // Contact Form Icon
    $("form .form-control").focus(function() {
      $(this).siblings("label").first().children("i").first().css({"color": "#aaa", "left": 0});
    });
    $("form .form-control").blur(function() {
      $(this).siblings("label").first().children("i").first().css({"color": "transparent", "left": "-20px"});
    });
	  
    // Blog Masonry
    var $container = $('.masonry-grid');
    
    $container.imagesLoaded(function(){
      new AnimOnScroll( document.getElementById( 'grid' ), {
        minDuration : 0.4,
        maxDuration : 0.7,
        viewportFactor : 0.2
      } );

      // Smooth Scrolling
      $("a.scroll").click(function(e) {
        e.preventDefault();
        var offset = $(this.hash).offset().top - (navbarHeight/2);
        $('html, body').animate({ scrollTop: offset }, 600);
      });
    });


    // Accordion Active Toggling 
    $("a[data-toggle='collapse']").click(function() {
      if ($(this).parent().parent(".panel-heading").hasClass("active")) {
        $(this).parent().parent().parent().parent().find('.panel-heading').removeClass("active");
      }
      else {
        $(this).parent().parent().parent().parent().find('.panel-heading').removeClass("active");  
        $(this).parent().parent(".panel-heading").addClass("active");
      }
    });



    // Map

      function initializeMap() {
        var myLatLong = new google.maps.LatLng(0.0,0.0);
        var mapOptions = {
          center: myLatLong,
          scrollwheel: true,
          zoom: 3
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);

        var mapData = 'https://github.com/binghamchris/kayaklaunch/blob/gh-pages/map/kayaklaunch-network.kmz?raw=true';
        var kmlLayer = new google.maps.KmlLayer(mapData, {
          suppressInfoWindows: false,
          preserveViewport: false,
          map: map
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });



      }
      function initialize() {
        initializeMap();
      }
      google.maps.event.addDomListener(window, 'load', initializeMap);

	}); // end of document ready
})(jQuery); // end of jQuery name space