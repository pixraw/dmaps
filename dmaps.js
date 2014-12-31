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
    self.markers = []
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

    setPrototypesMarker();

    if (typeof self.callBack === 'function'){
      self.callBack();
    }  
  }

  //Load map asyncronusly and add a callback if it is defined
  function loadMap () {
  	var script = document.createElement('script');
  	script.type = 'text/javascript';
   

  	script.src = location.protocol+'//maps.googleapis.com/maps/api/js?v=3.exp';
    if (self.callBack !== 'undefined'){
      script.src += '&callback=initialize';
    }
    
  	document.body.appendChild(script);
  }

  api.prototype.addMarker = function(lat,lng,text) {
    var configuration = configureMarker(arguments);
    var marker = new google.maps.Marker(configuration.options);
    self.markers.push(marker);
    return marker;
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

  api.prototype.addStreetView = function (marker){
    var panoramaOptions = {
      position: marker.getPosition(),
      visible: true 
    };

    var panorama = self.map.getStreetView();
    panorama.setOptions(panoramaOptions);
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

    google.maps.Marker.prototype.addStreetView = function (){
      var panoramaOptions = {
        position: this.getPosition(),
        visible: true 
      };
      var panorama = self.map.getStreetView();
      panorama.setOptions(panoramaOptions);
    }


  }

  return api;
})();