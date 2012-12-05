FrederickkPaper
============

A collection of methods/functions that I find useful, as of now specifically created for application within PaperJS (http://PaperJS.org/) most of which are based on my Frederickk library for Processing (http://github.com/frederickk/frederickk)


At some point I plan to broaden this library to be used in combination with other JavaScript creative coding environments, such as ProcessingJS, etc.


This library should be seen as very very alpha.


Not all of the code in here was created by me but credit and links are given where credit is due.


Examples
-------------

###F3D Example — 2 halbierte Würfel###
shows how to draw simple 3D primitives (very rudimentary)

https://dl.dropbox.com/u/7038255/frederickkjs/F3DExample.html


###FTime Example — clocks###
shows the features of FTime, which is partly a wrapper for the native JavaScript Date() object

https://dl.dropbox.com/u/7038255/frederickkjs/FTimeExample.html


###FFade Example###
shows how FFade can be used for timed transitions

https://dl.dropbox.com/u/7038255/frederickkjs/FFadeExample.html


###FColor Example###
shows FColor features such as color lerping

https://dl.dropbox.com/u/7038255/frederickkjs/FColorExample.html


All of these examples can be found in the above 'examples' directory. More Examples of FrederickkJS to be added as time permits.




FrederickPaper Template
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
var fpaper = FrederickkPaper;

// to access other features quickly
// you can use additional shortcuts for namespaces
var f3d = fpaper.F3D;
var fio = fpaper.FIO;
var fshape = fpaper.FShape;
var ftime = fpaper.FTime;
```


Features
-------------


Here's an incomplete overview of what some of these classes in FrederickkPaper are. A more complete API will follow as time and interest allows. At some point, I'll compile this into real documentation until then...


### Frederickk (core) ###
A collection math, String, and Array operations, similar to those found in Processing


Math functions


```javascript
FrederickkPaper.random(minr, maxr);
FrederickkPaper.randomBias(minr, maxr, bias);
FrederickkPaper.clamp(val,min,max);
FrederickkPaper.norm(val,start,stop);
FrederickkPaper.map(value, istart, istop, ostart, ostop);
FrederickkPaper.roundDecimal(orig, deci);
FrederickkPaper.snap(value, gridSize, roundFunction);
FrederickkPaper.lerp(start, stop, amt);
FrederickkPaper.degrees(val);
FrederickkPaper.radians(val);
FrederickkPaper.getAngle(point);
FrederickkPaper.sq(num);
FrederickkPaper.boolToInt(val);
FrederickkPaper.getType(object);
FrederickkPaper.findByName(items, name);
```

String functions


```javascript
FrederickkPaper.trimToFit(textObj);
FrederickkPaper.rtrim(str);
FrederickkPaper.trim(str);
FrederickkPaper.strToBoll(str);
```

Array functions


```javascript
FrederickkPaper.merge(arr1, arr2);
FrederickkPaper.alphabetical(a, b); // sorting
Array.max();
Array.min();
Array.shuffle();
```

paper.Item extensions


```javascript
paper.Item.snapGrid(spacing);
paper.Item.snapIso(scale);
```

paper.Size extensions

```javascript
paper.Size.area();
```



### FConversions ###
A collection of helpful conversion ratios


```javascript
var conversions = new FrederickkPaper.FConversions();

FrederickkPaper.FConversions.ptToMm;
FrederickkPaper.FConversions.mmToPt;

FrederickkPaper.FConversions.ptToCm;
FrederickkPaper.FConversions.CmToPt;

FrederickkPaper.FConversions.ptToIn;
FrederickkPaper.FConversions.inToPt;

FrederickkPaper.FConversions.ptToPi;
FrederickkPaper.FConversions.piToPt;
```


### FColor ###
Expands paper.Color some of these may be redundant to the PaperJS api, that's due to the legacy of the library's initial creation for use in Scriptographer.


```javascript
var fcolor = new FrederickkPaper.FColor();

FrederickkPaper.FColor.lerpCMYKColor(c1,c2, amt);
FrederickkPaper.FColor.lerpRGBColor(c1,c2, amt);
FrederickkPaper.FColor.random();
FrederickkPaper.FColor.randomRGBColor();
FrederickkPaper.FColor.randomCMYKColor();
FrederickkPaper.FColor.randomGrayColor();
FrederickkPaper.FColor.ColorToInt(col);
FrederickkPaper.FColor.IntToColor(RGBint);
FrederickkPaper.FColor.ColorToHex(col);
FrederickkPaper.FColor.HexToColor(hex);
```

paper.Color extensions


```javascript
paper.Color.darken(pct);
paper.Color.lighten(pct);
```



### FPoint ###
Expands paper.Point some of these may be redundant to the PaperJS api, that's due to the legacy of the library's initial creation for use in Scriptographer.

```javascript
var fpoint = new FrederickkPaper.FPoint();

FrederickkPaper.FPoint.norm(startPt, stopPt);
FrederickkPaper.FPoint.random();
FrederickkPaper.FPoint.heading();

FrederickkPaper.FPoint.interpolateTo(v2, f);
FrederickkPaper.FPoint.limit(lim);
FrederickkPaper.FPoint.magSq();

FrederickkPaper.FPoint.snapGrid(spacing);
FrederickkPaper.FPoint.snapIso(scale);
```



### FIO ###
A collection of tools for handling files/cookies


```javascript
var fio = FrederickkPaper.FIO;

FrederickkPaper.FIO.saveCookie(name, value, days);
FrederickkPaper.FIO.openCookie(name);
FrederickkPaper.FIO.deleteCookie(name);
```


### FTime ###
A collection of methods for handling time oriented tasks

```javascript
var fdate = new FrederickkPaper.FTime.FDate();
var fstopwatch = new FrederickkPaper.FTime.FStopwatch();
var ftransition = new FrederickkPaper.FTime.FTransition();
```


####FDate####

```javascript
var ftime = new FrederickkPaper.FTime.FDate();

FrederickkPaper.FTime.FDate.year();
FrederickkPaper.FTime.FDate.month();
FrederickkPaper.FTime.FDate.day();
FrederickkPaper.FTime.FDate.hour();
FrederickkPaper.FTime.FDate.minute();
FrederickkPaper.FTime.FDate.second();
FrederickkPaper.FTime.FDate.now(format);
FrederickkPaper.FTime.FDate.nowMilliseconds();
FrederickkPaper.FTime.FDate.add(_d, _h, _m, _s);
FrederickkPaper.FTime.FDate.sub(_d, _h, _m, _s);
FrederickkPaper.FTime.FDate.set(_d, _h, _m, _s);
FrederickkPaper.FTime.FDate.get(ms, format);
FrederickkPaper.FTime.FDate.toMillsecond(_h, _m, _s);
FrederickkPaper.FTime.FDate.toArray(strHMS);
```

####FStopwatch####


```javascript
var fstopwatch = new FrederickkPaper.FTime.FStopwatch();
```

####FTransition####


```javascript
var ftransition = new FrederickkPaper.FTime.FTransition();
```


### F3D ###
A barebones collection of classes for primitive 3D rendering

```javascript
var fpoint3 = new FrederickkPaper.F3D.FPoint3(_x, _y, _z);
var fpath3 = new FrederickkPaper.F3D.FPath3();
var fscene3d = new FrederickkPaper.F3D.FScene3D();
```



Building
-------------

```
$cd build/
$ant -buildfile build.xml
```


Compiled files appear in the distribution folder in two flavors


- FrederickkPaper.js
- FrederickkPaper-min.js



