Folio.js
============
### The missing tweezers, toothpick, and corkscrew for Paper.js ###



Folio.js is a library for Paper.js http://paperjs.org/. Folio.js serves as a collection of functions for supporting animations, rudimentary 3D, additional Path items and lastly a structured framework/chain of operations similar to that of Processing, OpenFrameworks, Cinder, et. al. 

Not all of the code used in Folio.js was created by me but credit and links are given where credit is due.

Folio.js exists also as a library for use with Scriptographer. See below for more details.

Additional details and explanation can be found at 
http://kenfrederick.blogspot.de/2012/12/paperjs-frederickkpaper.html




Folio Template & Framework
-------------

The Folio template takes advantage of injecting Paper.js directly into the DOM http://Paper.js.org/tutorials/getting-started/using-javascript-directly/. This enables the possibility of sharing JavaScript variables created in the HTML directly with Paper.js and visa versa. 

Within ```/FolioTemplate``` are a number of files to be found ```/FolioTemplate.html``` (and ```/FolioWebappTemplate.html```). In addition to the HTML files is a script template file ```/scripts/scripts/FolioTemplate.js``` This includes all of the chain of operations methods ```Setup()```, ```Update()```, and ```Draw()``` as well as hooks for Mouse and Keyboard interactions.

The template makes getting Paper.js up and running quicker. When using the template and/or renaming it be sure to uppdate all corresponding filenames.

I recommend a file structure as such:


```scripts/```

	*** holder for all Paper.js scripts ***

	FolioTemplate.js (rename as desired)

```js/```

	*** additional JavaScript libraries ***


FolioTemplate.html (rename as desired)



Examples
-------------

http://kennethfrederick.de/folio.js/

All of these examples can be found in the above ```/examples``` directory. More Examples of Folio to be added as time permits.



Usage
-------------


```javascript
// create a shortcut to the namespace if you wish
var f = folio;

// to access other features quickly
// you can use additional shortcuts for namespaces
var f3d = f.F3D;
var fio = f.FIO;
var ftime = f.FTime;
```

See documentation ```/distribution/docs``` for API specifics.


Scriptographer Bonus
-------------

As I mentioned Folio.js is also available for use in Scriptographer as.

The feature set is "slightly" different, this sou can find the script, within the distribution folder.

```/distribution/scriptographer.folio.js```

```/distribution/scriptographer.folio.min.js```

Simply drop it in to the same folder as your other Scriptographer scripts and add the following lines any script you want to use the library in:

```javascript
include('../libraries/folio.js/scriptographer.folio.js');

// load frederickkScript
var f = folio;
```

As ridiculous as it seems, I've ported over support for animations within Scriptographer. The reason is two fold; 1/ why not have animated clocks or physics simulations (https://vimeo.com/27951113) in illustrator 2/ prototyping an idea for Paper.js can sometimes be faster using Scriptographer.

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
$ cd build/
$ ./build.sh
```


Compiled files appear in the distribution folder in two flavors


```paper.folio.js```

```paper.folio.min.js```


Documentation can also be built

```
$ cd build/
$ ./docs.sh
```

docs are located in ```distribution/docs```




Change Log
--------------

- 9. August 2013
0.5

Renamed to "folio.js" and implemented documentation creating (same as Paper.js)


- 31. July 2013
0.4

Finally pushed most of the core elements of this library into my unsupported fork of Paper.js (https://github.com/frederickk/Paper.js). This is makes the most sense to me, so that this library can be a bit more focused. In the meantime that means that this library **ONLY WORKS** WITH my Paper.js fork


- 29. March 2013
0.35a

Cleaned out lots of unnecessary files, at some point I'm planning on getting rid of the "Core" of this library and adding it directly to my forked version of Paper.js itself. 

Added new examples, Extruder and Lissajous.

Optimized and fixed the JQuery calls when resizing the window, now the canvas and Paper.js get's resized as intended.


- 16. February 2013
0.3a

I've updated the library to work more directly with (and more like) native Paper.js. I've cleaned out some unnecessary namespaces such as FPoint, FColor, and FPath (except for 3D shapes). Once the Folio library is loaded, all of those features that were once include as part of those namespsaces, are now directly injected into Paper.js

Massive TODO is update the 3D aspect, the depth indexing is terrible and the classes themselves are inefficient.


- 25. November 2012
0.2a

Over the past couple of years, I've assembled a library of functions for Scriptographer, and given the recent news, I began porting this rag-tag-collection into a slightly more library for web development. I'm calling this library FrederickkPaper. Mainly because at the moment I'm focusing on Paper.js, in the future I'd like to try and make it more generic for use with other web based creative tools (ProcessingJS, et. al.). In addition to the Scriptographer specfic functions, I've also ported some of the more useful features from my Processing library Frederickk.

For now FrederickkPaper should be seen as very very alpha.

Not all of the code in here was created by me but credit and links are given where credit is due.


