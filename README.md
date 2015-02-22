# [DMaps](https://github.com/IcaliaLabs/dmaps)

##Description

**DMaps** is a library to use Google Maps, is easy and fancy. DMaps load Google Maps asyncronously, assign callbacks, put markers and change Google Maps style with only one line. It's over construction but that features will be added. With DMaps the order don't matter, DMaps use the data type to classify the parameters.

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

You can add or not this values, remember the order doesn't matter and all parameters are optionals

    var latitude = 25.670708;
    var longitude = -100.308172;

    //Div map's name
    var nameDiv = "map-canvas";

    //Called when the map is loaded
    var callback = function(){...}

    //Init map
    var myMap = new DMaps(lat,long,nameDiv,callback);


## Map Methods


Add Marker

The parameter tooltip is an optional string and return a google.maps.Marker
    
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

Geolocate

	var callback = function (position){...};
	
	var error = function(){..}
	
    myMap.geolocate(callback, error);

Obtain map
	
	//Return the reference of map element google.maps.Map
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


## Marker Methods

Add Events

Add Information

Show Street View
