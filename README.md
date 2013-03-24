frederickkPaper
============

http://kenfrederick.blogspot.de/2012/12/paperjs-frederickkpaper.html *updated*


- 16. February 2013
0.3a

I've updated the library to work more directly with (and more like) native paper.js. I've cleaned out some unnecessary namespaces such as FPoint, FColor, and FShape (except for 3D shapes). Once the frederickkPaper library is loaded, all of those features that were once include as part of those namespsaces, are now directly injected into paper.js

Massive TODO is update the 3D aspect, the depth indexing is terrible and the classes themselves are inefficient.


- 25. November 2012
0.2a

Over the past couple of years, I've assembled a library of functions for Scriptographer, and given the recent news, I began porting this rag-tag-collection into a slightly more library for web development. I'm calling this library FrederickkPaper. Mainly because at the moment I'm focusing on paperjs, in the future I'd like to try and make it more generic for use with other web based creative tools (ProcessingJS, et. al.). In addition to the Scriptographer specfic functions, I've also ported some of the more useful features from my Processing library Frederickk.

For now FrederickkPaper should be seen as very very alpha.

Not all of the code in here was created by me but credit and links are given where credit is due.



Examples
-------------

All of the examples can be viewed full screen here

https://dl.dropbox.com/u/7038255/frederickkPaper/index.html


###F3D Examples###

3 halbierte Würfel

shows how to draw simple 3D primitives (very rudimentary)

https://dl.dropbox.com/u/7038255/frederickkPaper/3halbiertewuerfel.html


Field

https://dl.dropbox.com/u/7038255/frederickkPaper/F3DExample.html


Sphere

https://dl.dropbox.com/u/7038255/frederickkPaper/FSphereExample.html



###FTime Examples###

Clocks

shows the features of FTime, which is partly a wrapper for the native JavaScript Date() object

https://dl.dropbox.com/u/7038255/frederickkPaper/clocks.html




###FStepper Examples###

The Debate

shows how FStepper can be used for timed transitions (pseudo keyframing)

https://dl.dropbox.com/u/7038255/frederickkPaper/thedebate.html


Sunrise/Sunset

https://dl.dropbox.com/u/7038255/frederickkPaper/FStepperExample.html



###FColor Examples###

FColor Example (new)

shows added Color features such as color lerping

https://dl.dropbox.com/u/7038255/frederickkPaper/FColorExample.html


Chain-Chain-Chain

the connected travelling salesman

https://dl.dropbox.com/u/7038255/frederickkPaper/chain-chain-chain.html


10 PRINT CHR$(205.5+RND(1));

https://dl.dropbox.com/u/7038255/frederickkPaper/10print.html



###FShape Examples###

FArrow Example

draw arrows

https://dl.dropbox.com/u/7038255/frederickkPaper/FArrowExample.html


FDrop Example (new)

draw (tear)drops

https://dl.dropbox.com/u/7038255/frederickkPaper/FDropExample.html


FTriangle Example (new)

draw triangles (and get their various center points - incomplete)

https://dl.dropbox.com/u/7038255/frederickkPaper/FTriangle.html


All of these examples can be found in the above 'examples' directory. More Examples of frederickkPaper to be added as time permits.





FrederickPaper Template/Framework
-------------

This template was created to mimic the structure of other popular programming tools for artists/designers such as http://processing.org, http://www.openframeworks.cc/, http://libcinder.org/

The idea is to make getting PaperJS up and running quicker with a simple template which is contextually similar to these other tools.

By using the accompanying FPaperTemplate.html you can simply code everything within this file and all of the necessary (most common) callbacks are already implemented within the HTML

This template takes advantage of PaperJS directly connected to the DOM http://PaperJS.org/tutorials/getting-started/using-javascript-directly/, so that JavaScript variables created in the HTML can be accessed here and visa versa. I've already done the "hard work" for you within the HTML so that you can focus on editing and creating the script file /scrips/FPaperTemplate.js

When using the template and/or renaming it be sure to uppdate corresponding names in FPaperTemplate.html

I recommend a file structure as such:


/scripts/

	*** holder for all PaperJS scripts ***

	FPaperTemplate.js (rename as desired)

/js/

	*** additional JavaScript libraries ***


FPaperTemplate.html (rename as desired)



Usage
-------------


```javascript
// create a shortcut to the namespace if you wish
var fpaper = frederickkPaper;

// to access other features quickly
// you can use additional shortcuts for namespaces
var f3d = fpaper.F3D;
var fio = fpaper.FIO;
var ftime = fpaper.FTime;
```


Scriptogrpaher Bonus
-------------

As I mentioned this library started out as a rag-tag collection of code snippets for use in Scriptograher, so I've put a bit of effort into and cleaned up frederickkPaper for user in Scriptographer as frederickkScript. 

The feature set is "slightly" different, but main ones are there. you can find the script, within the distribution folder.

- distribution/frederickkScript.js
- distribution/frederickkScript.min.js

Simply drop it in to the same folder as your other Scriptographer scripts and add the following lines any script you want to use the library in:

```javascript
include('../libraries/frederickkScript/frederickkScript.js');

// load frederickkScript
var f = frederickkScript;
```

Also, as ridiculous as it seems, I've made the animation ability in Scriptographer much more like paper.js. The reason is two fold; 1/ why not have animated clocks or physics simulations (https://vimeo.com/27951113) in illustrator 2/ sometimes prototyping an idea for paper.js is faster using Scriptographer. To take advantage of this, include the frederickkScript library (as indicated above) and this:

```javascript
function Update(event) {
	// add whatever you want to be animated
};

// add this to the very bottom of your script
var frameRate = 12; // default frameRate is 12 FPS
// 
Animate(
	true, // true if you want to animate the Update() function
	frameRate // the framerate
);
```




Building
-------------

```
$cd build/
$ant -buildfile build.xml
```


Compiled files appear in the distribution folder in two flavors


- frederickkPaper.js
- frederickkPaper-min.js



Features
-------------

Documenting javascript isn't as easy as I had hoped (if anyone has suggestions please share) so I've updated the comments and added examples in the code, much in the same manner as paper.js itself

Here's an incomplete overview of what some of these classes in frederickkPaper are. A more complete API will follow as time and interest allows.


### Frederickk (core) ###
A collection math, String, and Array operations, similar to those found in Processing


Math functions

```javascript
frederickkPaper.random(minr, maxr);
frederickkPaper.randomBias(minr, maxr, bias);
frederickkPaper.clamp(val,min,max);
frederickkPaper.norm(val,start,stop);
frederickkPaper.map(value, istart, istop, ostart, ostop);
frederickkPaper.roundDecimal(orig, deci);
frederickkPaper.snap(value, gridSize, roundFunction);
frederickkPaper.lerp(start, stop, amt);
frederickkPaper.degrees(val);
frederickkPaper.radians(val);
frederickkPaper.getAngle(point);
frederickkPaper.sq(num);
frederickkPaper.boolToInt(val);
frederickkPaper.getType(object);
frederickkPaper.findByName(items, name);

paper.EPSILON;
```


String functions

```javascript
frederickkPaper.trimToFit(textObj);
frederickkPaper.rtrim(str);
frederickkPaper.trim(str);
frederickkPaper.strToBoll(str);
```


Array functions

```javascript
frederickkPaper.merge(arr1, arr2);
frederickkPaper.alphabetical(a, b); // sorting
Array.max();
Array.min();
Array.shuffle();
```


paper.Point extensions

```javascript
paper.Point.norm(startPt, stopPt);
paper.Point.random();
paper.Point.heading();

paper.Point.interpolateTo(v2, f);
paper.Point.lerp( startPt, endPt, amt );
paper.Point.limit(lim);
paper.Point.magSq();

paper.Point.snapGrid(spacing);
paper.Point.snapIso(scale);

paper.Point.getAngle();
```



paper.Size extensions

```javascript
paper.Size.random();
paper.Size.area();
paper.Size.radius();
```



paper.Color extensions

Expands paper.Color some of these may be redundant to the PaperJS api, that's due to the legacy of the library's initial creation for use in Scriptographer.


```javascript
paper.Color.darken(pct);
paper.Color.lighten(pct);

paper.Color.lerp(c1,c2, amt);
paper.GrayColor.random();
paper.RgbColor.random();
paper.HslColor.random();
paper.HsbColor.random();
paper.Color.colorToInt(col);
paper.Color.integer(RGBint);
paper.Color.colorToHex(col);
paper.Color.hex(hex);
paper.Color.bytes(r255, g255, b255, a255);
```



paper.Item extensions

```javascript
paper.Item.distanceToCenter();

paper.Item.snapGrid(spacing);
paper.Item.snapIso(scale);
```



paper.Path.extensions

```javascript
paper.Path.FArrow();
paper.Path.FBubble();
paper.Path.FChain();
paper.Path.FCross();
paper.Path.FDrop();

paper.Path.FTriangle();
paper.Path.FTriangle.getCircumCircle();
paper.Path.FTriangle.getCentroid();
```



### FConversions ###
A collection of helpful conversion ratios

```javascript
var conversions = new frederickkPaper.FConversions();

frederickkPaper.FConversions.ptToMm;
frederickkPaper.FConversions.mmToPt;

frederickkPaper.FConversions.ptToCm;
frederickkPaper.FConversions.CmToPt;

frederickkPaper.FConversions.ptToIn;
frederickkPaper.FConversions.inToPt;

frederickkPaper.FConversions.ptToPi;
frederickkPaper.FConversions.piToPt;
```



### FIO ###
A collection of tools for handling files/cookies

```javascript
var fio = frederickkPaper.FIO;

frederickkPaper.FIO.saveLocal(name, value);
frederickkPaper.FIO.getLocal(name);
frederickkPaper.FIO.getLocalInt(name);
frederickkPaper.FIO.getLocalFloat(name);
frederickkPaper.FIO.getAllLocal();
frederickkPaper.FIO.deleteLocal(name);

frederickkPaper.FIO.saveSession(name, value);
frederickkPaper.FIO.getSession(name);
frederickkPaper.FIO.getSessionInt(name);
frederickkPaper.FIO.getSessionFloat(name);
frederickkPaper.FIO.getAllSession();
frederickkPaper.FIO.deleteSession();

frederickkPaper.FIO.saveCookie(name, value, days);
frederickkPaper.FIO.openCookie(name);
frederickkPaper.FIO.deleteCookie(name);
```



### FTime ###
A collection of methods for handling time oriented tasks

```javascript
var fdate = new frederickkPaper.FTime.FDate();
var fstopwatch = new frederickkPaper.FTime.FStopwatch();
var ftransition = new frederickkPaper.FTime.FStepper();
```


####FDate####

```javascript
var ftime = new frederickkPaper.FTime.FDate();

frederickkPaper.FTime.FDate().year();
frederickkPaper.FTime.FDate().month();
frederickkPaper.FTime.FDate().day();
frederickkPaper.FTime.FDate().hour();
frederickkPaper.FTime.FDate().minute();
frederickkPaper.FTime.FDate().second();
frederickkPaper.FTime.FDate().now(format);
frederickkPaper.FTime.FDate().nowMilliseconds();
frederickkPaper.FTime.FDate().add(_d, _h, _m, _s);
frederickkPaper.FTime.FDate().sub(_d, _h, _m, _s);
frederickkPaper.FTime.FDate().set(_d, _h, _m, _s);
frederickkPaper.FTime.FDate().get(ms, format);
frederickkPaper.FTime.FDate().toMillsecond(_h, _m, _s);
frederickkPaper.FTime.FDate().toArray(strHMS);
```


####FStopwatch####

```javascript
var fstopwatch = new frederickkPaper.FTime.FStopwatch();

frederickkPaper.FTime.FStopwatch().toggle();
frederickkPaper.FTime.FStopwatch().start();
frederickkPaper.FTime.FStopwatch().pause();
frederickkPaper.FTime.FStopwatch().reset();
frederickkPaper.FTime.FStopwatch().set(ms, run);
frederickkPaper.FTime.FStopwatch().get();
```


####FStepper####

```javascript
var ftransition = new frederickkPaper.FTime.FStepper();

frederickkPaper.FTime.FStepper().toggle();
frederickkPaper.FTime.FStepper().update(currentTime); // required 
frederickkPaper.FTime.FStepper().stepIn();
frederickkPaper.FTime.FStepper().stepOut();
frederickkPaper.FTime.FStepper().isIn();
frederickkPaper.FTime.FStepper().isOut();
frederickkPaper.FTime.FStepper().isDone();
frederickkPaper.FTime.FStepper().stop();
frederickkPaper.FTime.FStepper().setSeconds(_seconds);
frederickkPaper.FTime.FStepper().setMillis(_millis);
```


### F3D ###
A barebones collection of classes for primitive 3D rendering, very much a work in progress


####FPoint3####

```javascript
var fpoint3 = new frederickkPaper.F3D.FPoint3(_x, _y, _z);
```


####FPath3####

```javascript
var fpath3 = new frederickkPaper.F3D.FPath3();
```


####FScene3####

```javascript
var fscene3d = new frederickkPaper.F3D.FScene3D();
```

