Folio.js
============
### The tweezers, toothpick, and corkscrew for Paper.js ###



Folio.js is a library for Paper.js http://paperjs.org/. Folio.js serves as a collection of functions for supporting animations, rudimentary 3D, additional Path items and lastly a structured framework/chain of operations similar to that of Processing, OpenFrameworks, Cinder, et. al.

Not all of the code used in Folio.js was created by me but credit and links are given where credit is due.

Folio.js exists also as a library for use with Scriptographer. See below for more details.

Additional details and explanation can be found at
http://kenfrederick.blogspot.de/2012/12/paperjs-frederickkpaper.html




Folio Template & Framework
-------------

The Folio template takes advantage of injecting Paper.js directly into the DOM http://Paper.js.org/tutorials/getting-started/using-javascript-directly/. This enables the possibility of sharing JavaScript variables created in the HTML directly with Paper.js and visa versa.

Within `/FolioTemplate` are a number of files to be found `/FolioTemplate.html` (and `/FolioWebappTemplate.html`). In addition to the HTML files is a script template file `/scripts/scripts/FolioTemplate.js` This includes all of the chain of operations methods `Setup()`, `Update()`, and `Draw()` as well as hooks for Mouse and Keyboard interactions.

The template makes getting Paper.js up and running quicker. When using the template and/or renaming it be sure to uppdate all corresponding filenames.

I recommend a file structure as such:

	/root/ FolioTemplate.html
	└── scripts/FolioTemplate.js
		└── // any additional Paper.js scripts
	└── js/
		└── // additional JavaScript libraries JQuery, Angular, etc.


Examples
-------------

http://kennethfrederick.de/folio.js/

All of these examples can be found in the above `/examples` directory. More Examples of Folio to be added as time permits.



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

See documentation `/distribution/docs` for API specifics.





Building
-------------

Folio.js uses [Grunt](http://gruntjs.com/) 0.4.1 to build the library. If you don't have Grunt installed you'll have to do so, and I recommend installing it globally. You might need to use `sudo npm`, depending on your configuration.

```shell
npm install -g grunt-cli
```

Using terminal, enter into the folio.js directory.

```shell
cd folio.js
```

Then you'll have to install dependencies with npm

```shell
npm install
```

Once you've installed all of the dependencies, to build the library for both Paper.js and Scriptographer simply enter:

```shell
grunt
```
The results will be built into the `distribution/` folder

Alternatively type `grunt watch` to have the build run automatically when you make changes to source files.



Documentation
-------------

A (not yet) comprehensive documentation of folio.js functions can be found in the `documentation/` folder. You can build documentation by following the build steps above, once inside the folio.js directy simply enter:

```shell
grunt doc
```



Scriptographer Bonus
-------------

As I mentioned Folio.js is also available for use in Scriptographer as.

The feature set is "slightly" different, you can find the script, within the distribution folder.

	/distribution/scriptographer.folio.js

	/distribution/scriptographer.folio.min.js

Simply drop it in to the same folder as your other Scriptographer scripts and add the following lines any script you want to use the library in:

```javascript
include('../libraries/folio.js/scriptographer.folio.js');

// load frederickkScript
var f = folio;
```

As ridiculous as it seems, I've ported over support for animations within Scriptographer. The reason is two fold:

- why not have animated clocks or physics simulations (https://vimeo.com/27951113) in illustrator

- prototyping an idea for Paper.js can sometimes be faster using Scriptographer.

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

To only build the scriptographer version of Folio:

```shell
grunt scriptographer
```


