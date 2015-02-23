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
  var markers = [];
  var layers;
  var mapStyle;
  var route;
  var serviceRoute;
  var geocoder;
	
  //Initial function, dont matter the order of parameters, dmaps use the data type to classify them
  var api = function() {
    self.markers = []
    initializeStyles();
    for (var i in arguments) {

      switch (typeof arguments[i]){
        case 'string' :
          self.container = arguments[i];
          break;
        case 'number' : 
          if (!self.latitude ){
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

    if (!self.latitude||!self.longitude ){
      self.latitude = 25.670708;
      self.longitude = -100.308172;
      }

    if (!self.container){
      self.container = 'map-canvas';
    }

    
  	window.initialize = self.initialize;
  	
    	
    loadMap();    
  }
    
  //Initialize the map
  initialize =  function  () {

    if(!self.mapOptions){
      self.mapOptions = {
        center: new google.maps.LatLng(self.latitude, self.longitude),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      }
    }else{
        configureMap(self.mapOptions);
    }

  	self.map = new google.maps.Map(
      document.getElementById(self.container),
  		self.mapOptions
    );

    setPrototypesMarker();

    if (typeof self.callBack === 'function'){
      self.callBack();
    }  
  }

  //Load map asyncronusly and add a callback if it is defined
  function loadMap () {
  	var script = document.createElement('script');
  	script.type = 'text/javascript';
   
    var protocol = (location.protocol === "https:") ? "https:" : "http:";
  	script.src = protocol+'//maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places';
    if (self.callBack){
      script.src += '&callback=initialize';
    }
    
  	document.body.appendChild(script);
  }

  api.prototype.addMarker = function() {
    var configuration = configureMarker(arguments);
    var marker = new google.maps.Marker(configuration.options);
    self.markers.push(marker);
    return marker;
  }

  api.prototype.removeMarkers = function() {
    
    for (i in self.markers) {
      self.markers[i].setMap(null);
    }
    self.markers.length = 0;
  
  }

  api.prototype.addInfo = function(marker, container) {
    var infowindow = new google.maps.InfoWindow({
      content: container
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(self.map,marker);
    });
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
          if (!lat){
            lat = data[i];
          } else { 
            lng = data[i];
            markerOptions.position =  new google.maps.LatLng(lat, lng);
          }
          break;
        case 'function':
          click = data[i];
          break;
        case 'object':
          if (data[i] instanceof google.maps.LatLng) {
            markerOptions.position = data[i];
          }
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

  api.prototype.getMap = function (){
    return self.map;
  }
  
  function initializeStyles () {
    self.mapStyle = {};
    self.mapStyle["PALE"] = [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}];
    self.mapStyle["BLUE"] = [{"featureType":"water","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"landscape","stylers":[{"color":"#f2f2f2"}]},{"featureType":"road","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]}];
    self.mapStyle["MIDNIGHT"] = [{"featureType":"water","stylers":[{"color":"#021019"}]},{"featureType":"landscape","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"transit","stylers":[{"color":"#146474"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]}];
    self.mapStyle["MONOCHROME"] = [{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]}];
    self.mapStyle["PAPER"] = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#5f94ff"},{"lightness":26},{"gamma":5.86}]},{},{"featureType":"road.highway","stylers":[{"weight":0.6},{"saturation":-85},{"lightness":61}]},{"featureType":"road"},{},{"featureType":"landscape","stylers":[{"hue":"#0066ff"},{"saturation":74},{"lightness":100}]}];
    self.mapStyle["APPLE"] = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]}];
    self.mapStyle["FLAT"] = [{"stylers":[{"visibility":"off"}]},{"featureType":"road","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"road.arterial","stylers":[{"visibility":"on"},{"color":"#fee379"}]},{"featureType":"road.highway","stylers":[{"visibility":"on"},{"color":"#fee379"}]},{"featureType":"landscape","stylers":[{"visibility":"on"},{"color":"#f3f4f4"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#7fc8ed"}]},{},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#83cead"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"weight":0.9},{"visibility":"off"}]}];
    self.mapStyle["SUBTLE"] = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]; 
    self.mapStyle["RETRO"] = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}];
  }

  api.prototype.addStreetView = function (){
    var lat;
    var lng;
    var position;
    for (var i in arguments) {

      switch (typeof arguments[i]){
        case 'number' : 
          if (!lat){
            lat = arguments[i];
          } else { 
            lng = arguments[i];
            position =  new google.maps.LatLng(lat, lng);
          }
          break;
        case 'object':
          if (arguments[i] instanceof google.maps.LatLng) {
            position = arguments[i];
          }else{
            if (arguments[i] instanceof google.maps.Marker) {
              position = arguments[i].getPosition();
            }
          }
        default:
          break;
      }


    }

    if (position) {
      var panoramaOptions = {
      position: position,
      visible: true 
    };

    var panorama = self.map.getStreetView();
    panorama.setOptions(panoramaOptions);
    }
    
  }

  api.prototype.addSearchBox = function() {
    var element = "";
    var callBackSearch = undefined;
    for (var i in arguments) {

      switch (typeof arguments[i]){
        case 'string' :
          element = arguments[i];
          break;
        case 'function':
          callBackSearch = arguments[i];
          break;
        default:
          break;
      }
    }

    if (element === "") {
      return;
    }

    var searchInput = (document.getElementById(element));

    self.autocomplete = new google.maps.places.Autocomplete(searchInput);
    self.autocomplete.bindTo('bounds', self.map);

    api.prototype.searchBox = self.autocomplete;

    if (!callBackSearch) {
      return;
    }
    google.maps.event.addListener(self.autocomplete, 'place_changed', callBackSearch); 
  }

  api.prototype.geolocate = function(callback,error) {

  	if (typeof callback !== "function") {
  		callback = function (position) {
  			console.log(position);
  		};
  	}

  	if (typeof error !== "function") {
  		error = function () {
  			console.log("error");
  		};
  	}

  	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    } else {
       error();
    }	
  }


  api.prototype.removeControls = function() {
  	var optionsMap = {};
  	if (arguments.length == 0) {
  		optionsMap["disableDefaultUI"] = true;
  	}else{
  		var optionsForMap = [];
  		if (arguments[0] instanceof Array) {
  			optionsForMap = arguments[0];
  		}else{
  			if (typeof arguments[0] === "string") {
  				optionsForMap.push(arguments[0]);
  			}	
  		} 

  		for (var option in optionsForMap){
  			optionsMap[optionsForMap[option]] = false;
  		}

  	}
  	self.map.setOptions(optionsMap);
  }

  api.prototype.addControls = function() {
  	var optionsMap = {};
  	if (arguments.length == 0) {
  		optionsMap["disableDefaultUI"] = false;
  		optionsMap["mapTypeControl"] = true;	
  		optionsMap["overviewMapControl"] = true;
  		optionsMap["panControl"] = true;
  		optionsMap["rotateControl"] = true;	
  		optionsMap["scaleControl"] = true;	
  		optionsMap["scrollwheel"] = true;
  		optionsMap["streetViewControl"] = true;
  		optionsMap["zoomControl"] = true;
  		optionsMap["overviewMapControlOptions"] = {opened : true};
  	}else{
  		var optionsForMap = [];
  		if (arguments[0] instanceof Array) {
  			optionsForMap = arguments[0];
  		}else{
  			if (typeof arguments[0] === "string") {
  				optionsForMap.push(arguments[0]);
  			}	
  		} 

  		for (var option in optionsForMap){
  			optionsMap[optionsForMap[option]] = true;
  		}

  	}
  	self.map.setOptions(optionsMap);
  }

  api.prototype.getRoute = function() {
    if (!self.route) {
      self.route = new google.maps.DirectionsRenderer({suppressMarkers:true});
      self.serviceRoute = new google.maps.DirectionsService();
    }

    self.route.setMap(self.map);
    
    var beginPoint;
    var endPoint;
    var wayPoints = [];
    var typeRoute;
    var callback;
    for (var i in arguments) {
      switch (typeof arguments[i]){
        case 'string' : 
          typeRoute = arguments[i];
          break;
        case 'object':
          if (arguments[i] instanceof google.maps.LatLng) {
            if (!beginPoint) {
              beginPoint = arguments[i];
            } else{
              if (!endPoint) {
                endPoint = arguments[i];
              } else{
                wayPoints.push(arguments[i]);
              }
            }
          }
          break;
        case 'function':
          callback = arguments[i];
          break;
        default:
          break;
      }
    }

    if (beginPoint && endPoint ) {
      if (!typeRoute) {
        typeRoute = 'DRIVING';
      }
      if (!callback) {
        callback = function(result,status) {
          if (status === google.maps.DirectionsStatus.OK) {
            self.route.setDirections(result);
          } else{
            console.log("Bad Request");
          }
        }
      }

      request = {
        origin : beginPoint,
        destination : endPoint,
        waypoints : wayPoints,
        optimizeWayPoints : true,
        travelMode : google.maps.TravelMode[typeRoute],
        unitSystem : google.maps.UnitSystem.METRIC
      }

      self.serviceRoute.route(request,callback);
    }else{
      console.log("Faltan parametros :(");
    }
  }

  api.prototype.clearRoute = function() {
    if (self.route) {
      self.route.setMap(null);
    }
  }

  api.prototype.geocode = function() {
    if (!self.geocoder) {
      self.geocoder = new google.maps.Geocoder();
    }
    var lat;
    var callback;
    var geocoderRequest = {};
    for (var i in arguments) {
      switch (typeof arguments[i]){
        case 'string' : 
          if (typeof geocoderRequest.address === 'undefined') {
            geocoderRequest.address = arguments[i];
          } else{
            geocoderRequest.region = arguments[i];
          }
          break;
        case 'number':
          if (!lat) {
            lat = arguments[i];
          } else{
            geocoderRequest.latLng = new google.maps.LatLng(lat,arguments[i]);
          }
          break;
        case 'object':
          if (arguments[i] instanceof google.maps.LatLng) {
            geocoderRequest.latLng = arguments[i];
          }else{
            if (arguments[i] instanceof google.maps.LatLngBounds) {
              geocoderRequest.bounds = arguments[i];
            }
          }
          break;
        case 'function':
          callback = arguments[i];
          break;
        default:
          break;
      }
    }

    if (typeof geocoderRequest.address !== 'undefined' || typeof geocoderRequest.latLng !== 'undefined'  ) {
      if (!callback) {
        callback = function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            console.log(results);
          } else {
            console.log('Geocoder failed request ' + status);
          }
        };
      }
    } else{
      console.log("Faltan argumentos");
    }

    self.geocoder.geocode(geocoderRequest,callback);
  }

  function setPrototypesMarker () {

    google.maps.Marker.prototype.addEvent = function (eventName,functionEvent){
      google.maps.event.addListener(this, eventName, functionEvent);
    };

    google.maps.Marker.prototype.addInfo = function(container) {
      var infowindow = new google.maps.InfoWindow({
        content: container
      });

      this.addEvent( 'click', function() {
        infowindow.open(self.map,this);
      });
    };
  }

  return api;
})();