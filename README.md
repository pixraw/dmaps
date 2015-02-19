# [DMaps](https://github.com/IcaliaLabs/dmaps)

##Description

**DMaps** is a library to use Google Maps, is easy and fancy. DMaps load Google Maps asyncronously, assign callbacks, put markers and change Google Maps style with only one line. It's over construction but that features will be added. With DMaps the order don't matter, DMaps use the data type to classify the parameters.

## Contents
- [Set Up](#set-up)
- [Map Methods](#map-methods)
- [Marker Methods](#documentation)



## Set up

**Add dmaps in your html5 document**

 ````html      
<!-- Size of map div -->
<style>
#map-canvas {
	height: 95%;
	margin: 0px;
	padding: 0px
}
</style>    

<!-- Map div -->

<div id="map-canvas"></div>

<!-- DMaps script -->
<script type="text/javascript" src="dmaps.js"></script>
````

Create a DMaps Object

````js
//The simplest constructor
var myMap = new DMaps(); 
`````

You can add or not this values, remember the order doesn't matter and all parameters are optionals

````js
var latitude = 25.670708;
var longitude = -100.308172;

//Div map's name
var nameDiv = "map-canvas";

//Called when the map is loaded
var callback = function(){...}

//Init map
var myMap = new DMaps(lat,long,nameDiv,callback);
````

## Map Methods


Add Marker

````js    
//The parameter tooltip is an optional string
myMap.addMarker(lat,long, tooltip);
````

Add Controls

Add SearchBox

Geolocate

Obtain map

Remove Controls
    
Set Style To Your Map

````js
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
// param: 'string'
myMap.setMapStyle('FLAT');
````

## Marker Methods

Add Events

Add Information

Show Street View
