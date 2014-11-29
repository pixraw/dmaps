/*
 * @author: Joel Humberto Gómez Paredes
 * @description: Library to use Google Maps more easily
 * @version: 0.0.1
 */
var DMaps = (function (name, latitude, longitude, options, callback) {
  var self = this;
	var callback;
  var container;
  var latitude;
  var longitude;
	var map;
	var mapOptions;
  var markers;
  var layers;
  var mapStyle;
	
  //Initial function, dont matter the order of parameters, dmaps use the data type to classify them
  var api = function() {
    initializeStyles();
    for (var i in arguments) {

      switch (typeof arguments[i]){
        case 'string' :
          self.container = arguments[i];
          break;
        case 'number' : 
          if (typeof self.latitude === 'undefined'){
            self.latitude = arguments[i];
          } else { 
            self.longitude = arguments[i];
          }
          break;
        case 'object' :
          self.mapOptions = arguments[i];
          break;
        case 'function':
          self.callBack = arguments[i];
          break;
        default:
          break;
      }
    }

    if (typeof self.latitude === 'undefined' || typeof self.longitude === 'undefined' ){
      self.latitude = 25.670708;
      self.longitude = -100.308172;
      }

    if (typeof self.container === 'undefined'){
      self.container = 'map-canvas';
    }

    
  	window.initialize = self.initialize;
  	
    	
    loadMap();    
  }
    
  //Initialize the map
  initialize =  function  () {

    if(typeof self.mapOptions === 'undefined'){
      self.mapOptions = {
        center: new google.maps.LatLng(self.latitude, self.longitude),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
    }else{
        configureMap(self.mapOptions);
    }

  	self.map = new google.maps.Map(
      document.getElementById(self.container),
  		self.mapOptions
    );

    if (typeof self.callBack === 'function'){
      self.callBack();
    }
  }

  //Load map asyncronusly and add a callback if it is defined
  function loadMap () {
  	var script = document.createElement('script');
  	script.type = 'text/javascript';
  	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp';
    if (self.callBack !== 'undefined'){
      script.src += '&callback=initialize';
    }
    
  	document.body.appendChild(script);
  }

  api.prototype.addMarker = function(lat,lng,text) {
    var configuration = configureMarker(arguments);
    var marker = new google.maps.Marker(configuration.options);
  }


  //Configure data to marker
  function configureMarker () {
    var markerOptions = {};
    var markerFunction;
    var lat;
    var lng;
    var click;
    var data = arguments[0];
    for (var i in arguments[0]) {

      switch (typeof data[i]){
        case 'string' :
          if (typeof markerOptions.title === 'undefined'){
            markerOptions.title = data[i];
          } else { 
            markerOptions.icon = data[i];
          }
          break;
        case 'number' : 
          if (typeof lat === 'undefined'){
            lat = data[i];
          } else { 
            lng = data[i];
            markerOptions.position =  new google.maps.LatLng(lat, lng);
          }
          break;
        case 'function':
          click = data[i];
          break;
        default:
          break;
      }

    }
    markerOptions.map = self.map;

    return {options: markerOptions, functions: markerFunction};
  }
    

  api.prototype.setMapStyle = function (style) {
    if (typeof style === 'string') {
        if (typeof self.mapStyle[style] !== 'undefined'){
           self.map.setOptions({styles : self.mapStyle[style]});
        } 
      }
    }
  
    function initializeStyles () {
      self.mapStyle = {};
      self.mapStyle["GREY"] = [
              {
                  "featureType": "landscape",
                  "stylers": [
                      {
                          "saturation": -100
                      },
                      {
                          "lightness": 65
                      },
                      {
                          "visibility": "on"
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "stylers": [
                      {
                          "saturation": -100
                      },
                      {
                          "lightness": 51
                      },
                      {
                          "visibility": "simplified"
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "stylers": [
                      {
                          "saturation": -100
                      },
                      {
                          "visibility": "simplified"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "stylers": [
                      {
                          "saturation": -100
                      },
                      {
                          "lightness": 30
                      },
                      {
                          "visibility": "on"
                      }
                  ]
              },
              {
                  "featureType": "road.local",
                  "stylers": [
                      {
                          "saturation": -100
                      },
                      {
                          "lightness": 40
                      },
                      {
                          "visibility": "on"
                      }
                  ]
              },
              {
                  "featureType": "transit",
                  "stylers": [
                      {
                          "saturation": -100
                      },
                      {
                          "visibility": "simplified"
                      }
                  ]
              },
              {
                  "featureType": "administrative.province",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "water",
                  "elementType": "labels",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "lightness": -25
                      },
                      {
                          "saturation": -100
                      }
                  ]
              },
              {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "hue": "#ffff00"
                      },
                      {
                          "lightness": -25
                      },
                      {
                          "saturation": -97
                      }
                  ]
              }
        ];

      self.mapStyle["RETRO"] = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}];
    }
    

    return api;
})();