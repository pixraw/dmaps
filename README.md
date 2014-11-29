#DMaps

##Description

**DMaps** is a library to use Google Maps, is easy and fancy. DMaps load Google Maps asyncronously, assign callbacks, put markers and change Google Maps style with only one line. It's over construction but that features will be added. With DMaps the order don't matter, DMaps use the data type to classify the parameters.

##Steps to use DMaps

### 1

Add the script

`<script type="text/javascript" src="dmaps.js"></script>`

###2
Create a variable and instace DMaps

var latitude = 25.670708;

var longitude = -100.308172;

var nameDiv = "map-canvas";

var callback = function(){...}

var myVar = new DMaps(lat,long,nameDiv);

**--Or--**

var myVar = new DMaps(nameDiv,lat,long);

**--Or--**

var myVar = new DMaps(nameDiv,lat,long, callback);

###You can add markers

myVar.addMarker(25.670708,-100.308172, "Hello Map World");

**--Or--**

myVar.addMarker(25.670708,-100.308172);

###You can change the map's style

myVar.setMapStyle('GREY');

