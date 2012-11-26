FrederickkJS
============

A collection of methods/functions that I find useful, as of now specifically created for application within PaperJS (http://paperjs.org/) most of which are based on my Frederickk library for Processing (http://github.com/frederickk/frederickk)

At some point I plan to broaden this library to be used in combination with other JavaScript creative coding environments, such as ProcessingJS, etc.

Not all of the code in here was created by me but credit and links are given where credit is due.

```javascript
// the core of the library
var frederickk = new Frederickk();

// to access other features quickly
// you can use additional variables
var ffade = frederickk.FFade;
var ftime = frederickk.FTime;
var fcolor = frederickk.FColor;
var fpoint = frederickk.FPoint;
```

Here's an incomplete overview of what some of these classes in FrederickkPaper are. A more complete API will follow as time and interest allows.

Frederickk (core)
A collection mathematical operations, similar to those found in Processing


```javascript
random(minr, maxr);
randomBias(minr, maxr, bias);
clamp(val,min,max);
norm(val,start,stop);
map(value, istart, istop, ostart, ostop);
roundDecimal(orig, deci);
snap(value, gridSize, roundFunction);
lerp(start, stop, amt);
degrees(val);
radians(val);
boolToInt(val);
getType(object);
```

String functions


```javascript
trimToFit(textObj);
rtrim(str);trim(str);
```

Array functions


```javascript
merge(arr1, arr2);
alphabetical(a, b); // sorting
Array.max();
Array.min();
Array.shuffle();
```


FColor
Expands paper.Color some of these may be redundant to the paperjs api, that's due to the legacy of the library's initially creation for use in Scriptographer.


```javascript
FColor.lerpCMYKColor(c1,c2, amt);
FColor.lerpRGBColor(c1,c2, amt);
FColor.random();
FColor.randomRGBColor();
FColor.randomCMYKColor();
FColor.randomGrayColor();
FColor.ColorToInt(col);
FColor.IntToColor(RGBint);
FColor.ColorToHex(col);
FColor.HexToColor(hex);
FColor.HSVtoColor(h, s, v);

paper.Color.darken(pct);
paper.Color.lighten(pct);
```


FPaperExamples
============

Examples of FrederickkJS to be added



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

