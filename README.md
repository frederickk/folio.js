FrederickkJS
============

A collection of methods/functions that I find useful, as of now specifically created for application within PaperJS (http://paperjs.org/) most of which are based on my Frederickk library for Processing (http://github.com/frederickk/frederickk)


At some point I plan to broaden this library to be used in combination with other JavaScript creative coding environments, such as ProcessingJS, etc.


This library should be seen as very very alhpa.


Not all of the code in here was created by me but credit and links are given where credit is due.



Building
-------------

```
$cd build/
$ant -buildfile build.xml
```


Compiled files appear in the distribution folder in two flavors


- FrederickkPaper.js
- FrederickkPaper-min.js



Usage
-------------


```javascript
// create a shortcut to the namespace if you wish
var f = Frederickk;

// to access other features quickly
// you can use additional shortcuts for namespaces
var f3d = frederickk.F3D;
var fio = frederickk.FIO;
```


Features
-------------


Here's an incomplete overview of what some of these classes in FrederickkPaper are. A more complete API will follow as time and interest allows. At some point, I'll compile this into real documentation until then...


### Frederickk (core) ###
A collection math, String, and Array operations, similar to those found in Processing


Math functions


```javascript
Frederickk.random(minr, maxr);
Frederickk.randomBias(minr, maxr, bias);
Frederickk.clamp(val,min,max);
Frederickk.norm(val,start,stop);
Frederickk.map(value, istart, istop, ostart, ostop);
Frederickk.roundDecimal(orig, deci);
Frederickk.snap(value, gridSize, roundFunction);
Frederickk.lerp(start, stop, amt);
Frederickk.degrees(val);
Frederickk.radians(val);
Frederickk.boolToInt(val);
Frederickk.getType(object);
```

String functions


```javascript
String.trimToFit(textObj);
String.rtrim(str);
String.trim(str);
```

Array functions


```javascript
Frederickk.merge(arr1, arr2);
Frederickk.alphabetical(a, b); // sorting
Array.max();
Array.min();
Array.shuffle();
```


### FConversions ###
A collection of helpful conversion ratios


```javascript
var conversions = new Frederickk.FConversions();

Frederickk.FConversions.ptToMm;
Frederickk.FConversions.mmToPt;

Frederickk.FConversions.ptToCm;
Frederickk.FConversions.CmToPt;

Frederickk.FConversions.ptToIn;
Frederickk.FConversions.inToPt;

Frederickk.FConversions.ptToPi;
Frederickk.FConversions.piToPt;
```


### FColor ###
Expands paper.Color some of these may be redundant to the paperjs api, that's due to the legacy of the library's initially creation for use in Scriptographer.


```javascript
var fcolor = new Frederickk.FColor();

Frederickk.FColor.lerpCMYKColor(c1,c2, amt);
Frederickk.FColor.lerpRGBColor(c1,c2, amt);
Frederickk.FColor.random();
Frederickk.FColor.randomRGBColor();
Frederickk.FColor.randomCMYKColor();
Frederickk.FColor.randomGrayColor();
Frederickk.FColor.ColorToInt(col);
Frederickk.FColor.IntToColor(RGBint);
Frederickk.FColor.ColorToHex(col);
Frederickk.FColor.HexToColor(hex);
Frederickk.FColor.HSVtoColor(h, s, v);

paper.Color.darken(pct);
paper.Color.lighten(pct);
```


### FFade ###
A helper class for fading/animating elements



### FPoint ###
Expands paper.Point some of these may be redundant to the paperjs api, that's due to the legacy of the library's initially creation for use in Scriptographer.

```javascript
var fpoint = new Frederickk.FPoint();

Frederickk.FPoint.norm(startPt, stopPt);
Frederickk.FPoint.random();
Frederickk.FPoint.heading();

Frederickk.FPoint.interpolateTo(v2, f);
Frederickk.FPoint.limit(lim);
Frederickk.FPoint.magSq();

Frederickk.FPoint.snapGrid(spacing);
Frederickk.FPoint.snapIso(scale);
```



### FIO ###
A collection of tools for handling files/cookies


```javascript
var fio = Frederickk.FIO;

Frederickk.FIO.saveCookie(name, value, days);
Frederickk.FIO.openCookie(name);
Frederickk.FIO.deleteCookie(name);
```


### FTime ###
A collection of methods for handling time

```javascript
var ftime = new Frederickk.FTime();

Frederickk.FTime.hour();
Frederickk.FTime.minute();
Frederickk.FTime.second();
Frederickk.FTime.now(format);
Frederickk.FTime.nowMilliseconds();
Frederickk.FTime.add(_d, _h, _m, _s);
Frederickk.FTime.sub(_d, _h, _m, _s);
Frederickk.FTime.set(_d, _h, _m, _s);
Frederickk.FTime.get(ms, format);
Frederickk.FTime.toMillsecond(_h, _m, _s);
Frederickk.FTime.toArray(strHMS);
```


### F3D ###
A barebones collection of classes for primitive 3D rendering

```javascript
var fpoint3 = new Frederickk.F3D.FPoint3(_x, _y, _z);
var fpath3 = new Frederickk.F3D.FPath3();
var fscene3d = new Frederickk.F3D.FScene3D();
```



FPaperExamples
============

F3D Example — 2 halbierte Würfel
- shows the early stage of drawing simple 3D primitives

https://dl.dropbox.com/u/7038255/frederickkjs/F3DExample.html


FTime Example
- shows the features of FTime, which is partly a wrapper for the native JavaScript Date() object

https://dl.dropbox.com/u/7038255/frederickkjs/FTimeExample.html


FFade Example
- shows how FFade can be used for timed transitions

https://dl.dropbox.com/u/7038255/frederickkjs/FFadeExample.html


FColor Example
- shows FColor features such as color lerping

https://dl.dropbox.com/u/7038255/frederickkjs/FColorExample.html


All of these examples can be found in the above 'examples' directory. More Examples of FrederickkJS to be added as time permits.




FPaperTemplate
============

This template was created to mimic the structure of other popular programming tools for artists/designers such as http://processing.org and http://www.openframeworks.cc/

The idea is to make getting PaperJS up and running quicker with a simple template which is contextually similar to other tools.

By using the accompanying FPaperTemplate.html you can simply code everything within this file and all of the necessary callbacks are already implemented in the HTML

This template takes advantage of PaperJS directly connected to the DOM http://paperjs.org/tutorials/getting-started/using-javascript-directly/, so that JavaScript variables created in the HTML can be accessed here and visa versa. I've already done the "hard work" for you within the HTML so that you can focus on creating

Feel free to rename the script file and HTML template file, but be sure to uppdate corresponding names in FPaperTemplate.html

I recommend a file structure as such:


/scripts/

	*** holder for all PaperJS scripts ***

	FPaperTemplate.js (rename as desired)

/js/

	*** additional JavaScript libraries ***


FPaperTemplate.html (rename as desired)

