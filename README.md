# [DMaps](https://github.com/IcaliaLabs/dmaps)

##Description

**DMaps** is a library to use Google Maps, it's easy and fancy. DMaps loads Google Maps asynchronously, assigns callbacks, puts markers and changes Google Maps' style with only one line of code. It's under construction but this features will be added. With DMaps the order doesn't matter, DMaps uses the data type to classify the parameters.

## Contents
- [Set Up](#set-up)
- [Map Methods](#map-methods)
- [Marker Methods](#documentation)



## Set up

**Add dmaps in your html5 document**

    
    <!-- Size of map div -->
    <style>
    	#map-canvas {
    		height: 95%;
    		margin: 0px;
    		padding: 0px;
    	}
    </style>    

    <!-- Map div -->

    <div id="map-canvas"></div>

    <!-- DMaps script -->
    <script type="text/javascript" src="dmaps.js"></script>


Create a DMaps Object
    
    
    //The simplest constructor
    var myMap = new DMaps(); 
    

You can add or not this values, remember the order doesn't matter and all parameters are optional

    var latitude = 25.670708;
    var longitude = -100.308172;

    //Div map's name
    var nameDiv = "map-canvas";

    //Called when the map is loaded
    var callback = function(){...}

    //Init map
    var myMap = new DMaps(latitude,longitude,nameDiv,callback);


## Map Methods


Add Marker

The parameter tooltip is an optional string and returns a google.maps.Marker
    
    myMap.addMarker(lat,long, tooltip)


Add Controls

    //Add all controls in the map
    myMap.addControls();
    
    //Add one control in the map
    myMap.addControl('scaleControl');
    
    //Add an array of controls
    myMap.addControl(['scaleControl','zoomControl']);

Add SearchBox

    //id div element
    var idBoxSearch = 'searchBar';
    
    //this function is called when a place is founded
    var callBack = function(){...}
    
    //Create the element searchbox
    myMap.addSearchBox('searchBar',callBack);
    
    //To access to the place selected just call and return google.maps.LatLng
    myMap.searchBox.getPlace();
    
Clear Route
   
    myMap.clearRoute();

Geolocate

    var callback = function (position){...};
  
    var error = function(){..}
  
    myMap.geolocate(callback, error);
    
Geocode
    
    var locationPosition = new google.maps.LatLng(25.664044, -100.419288);
    
    var locationText = "Nuevo León";
    
    //Defaul value
    var callback = function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            console.log(results);
          } else {
            console.log('Geocoder failed request ' + status);
          }
     };
     
     
     myMap.geocode(25.664044, -100.419288);
     
     myMap.geocode(locationText);
     
     myMap.geocode(locationPosition, callback);


     
    
GetRoute

    var beginPoint = new google.maps.LatLng(25.664044, -100.419288);
    
    var endPoint = new google.maps.LatLng(25.670318, -100.307679);
    
    //With this fuction the route is drawed in the map
    var callback = function(result,status) {//Default function
          if (status === google.maps.DirectionsStatus.OK) {
            route.setDirections(result);
          } else{
            console.log("Bad Request");
          }
        }
    /*valid values
    
    DRIVING //Default Value
    BICYCLING
    TRANSIT
    WALKING
    */ 
    var travelMode = 'WALKING';
    
    mayMap.getRoute(beginPoint, endPoint);
    
        
     mayMap.getRoute(beginPoint, endPoint, travelMode);
     
     
     mayMap.getRoute(beginPoint, endPoint, travelMode, callback);
    

Obtain map
  
    //Returns the reference of map element google.maps.Map
    myMap.getMap();

Remove Controls
   
     //Remove all controls in the map
     myMap.removeControls();
    
    //Add one control in the map
    myMap.removeControl('scaleControl');
    
    //Add an array of controls
    myMap.removeControl(['scaleControl','zoomControl']);

    
Set Style To Your Map


    /*
    Styles availables
     - PALE
     - BLUE
     - MIDNIGHT
     - MONOCHROME
     - PAPER
     - APPLE
     - FLAT
     - SUBTLE
     - RETRO
    */

    myMap.setMapStyle('FLAT');

Show Street View and return google.maps.StreetViewPanorama 

    var lat = 25.670708;
    
    var lng = -100.308172
    
    var point = new google.maps.LatLng(lat, lng);
    
    myMap.addStreetView(lat, lng);
    
    myMap.addStreetView(point);
    
    myMap.addStreetView(marker);
    
    //You can define your own simple street view (one image) Alpha
    
    var urlImage = "http://www.mydomain.com/images/street.jpg";
    
    myMap.addStreetView(urlImage);
    
     //You can define your own simple street view with tiles (one image) Alpha
    
    //Only use the root name
    var urlImage = "http://www.mydomain.com/images/street";
    
    myMap.addStreetView(urlImage,true);
    


## Marker Methods


Add Events

    var event = 'click';
    
    var callback = function (){...};
    
    marker.addEvent(event, callback);

Add Information

    var info = '<h1>My first infoWindow with DMaps</h1>';
    
    marker.addInfo(info);



<script src="http://yandex.st/highlightjs/7.3/highlight.min.js"></script>
<link rel="stylesheet" href="http://yandex.st/highlightjs/7.3/styles/github.min.css">
<script>
  hljs.initHighlightingOnLoad();
</script>