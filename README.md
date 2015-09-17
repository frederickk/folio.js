Folio.js
============
### The tweezers, toothpick, and corkscrew for [Paper.js](http://paperjs.org/) ###


[Folio.js](http://kennethfrederick.de/foliojs/) is a library for [Paper.js](http://paperjs.org/). [Folio.js](http://kennethfrederick.de/foliojs/) is a collection of functions for supporting animations, rudimentary 3D, additional Path items and lastly a structured framework/chain of operations similar to that of Processing, OpenFrameworks, Cinder, et. al.

Not all of the code used in [Folio.js](http://kennethfrederick.de/foliojs/) was created by me but credit and links are given where credit is due.

Additional details and explanation can be found on my [blog](http://kenfrederick.blogspot.de/2012/12/paperjs-frederickkpaper.html).



Examples
-------------

[http://frederickk.github.io/folio.js/](http://frederickk.github.io/folio.js/)

I've moved the [Folio.js](http://kennethfrederick.de/foliojs/) examples to [gh-pages branch](https://github.com/frederickk/folio.js/tree/gh-pages).

In the near future I will depreciate all support for [Scriptographer](http://scriptographer.org/). Until then, [Scriptographer](http://scriptographer.org/) examples can be found `/examples/scriptographer.folio`.

To run the [Scriptographer](http://scriptographer.org/) examples, simply add the `/examples/scriptographer.folio` as a [repository](http://scriptographer.org/news/2.8.050-is-out-welcome-on-board-cs5/). The examples will then appear in your [Scriptographer](http://scriptographer.org/) palette.



Usage
-------------

A full-size canvas element is created by [Folio.js](http://kennethfrederick.de/foliojs/) upon loading. Otherwise, the first found canvas element is used.

You can find the library for [Paper.js](http://paperjs.org/) within the `distribution/` folder.

```
/distribution/paper.folio.js
/distribution/paper.folio.min.js
```

I recommend a file structure as such:

```
/root/paper.folio.template.html
└── scripts/paper.folio.template.js
	└── // any additional Paper.js scripts
└── js/
	└── // additional JavaScript libraries JQuery, Angular, etc.
```

Load the [Folio.js](http://kennethfrederick.de/foliojs/) namespace.


```javascript
var f = folio;
```

To access other features quickly you can use additional shortcuts for namespaces

```javascript
var f3d = f.F3D;
var fio = f.FIO;
var ftime = f.FTime;
```




Template & Framework
-------------

The [Folio.js](http://kennethfrederick.de/foliojs/) template takes advantage of [injecting Paper.js directly into the DOM](http://Paper.js.org/tutorials/getting-started/using-javascript-directly/). This enables the possibility of sharing JavaScript variables created in the HTML directly with Paper.js and visa versa.

Within `/templates/paper.folio` are a number of files to be found `paper.folio.template.html` (and `paper.folio.webapp.template.html`). In addition to the HTML files is a script template file `/scripts/scripts/paper.folio.template.js` This includes all of the chain of operations methods `Setup()`, `Update()`, and `Draw()` as well as hooks for Mouse and Keyboard interactions.

When using the template and/or renaming it be sure to uppdate all corresponding filenames.



Documentation
-------------

A (not yet) comprehensive documentation of [Folio.js](http://kennethfrederick.de/foliojs/) functions can be found in the `documentation/` folder. You can build documentation by following the build steps below, once inside the [Folio.js](http://kennethfrederick.de/foliojs/) directy simply enter:

```shell
$ grunt doc
```



Building
-------------

[Folio.js](http://kennethfrederick.de/foliojs/) uses [Grunt](http://gruntjs.com/) 0.4.1 to build the library. If you don't have Grunt installed you'll have to do so, and I recommend installing it globally. You might need to use `sudo npm`, depending on your configuration.

```shell
$ npm install -g grunt-cli
```

Using terminal, enter into the [Folio.js](http://kennethfrederick.de/foliojs/) directory.

```shell
$ cd folio.js
```

Then you'll have to install dependencies with npm

```shell
$ npm install
```

Once you've installed all of the dependencies, to build the library for [Paper.js](http://paperjs.org/) simply enter:

```shell
$ grunt
```

To only build for [Paper.js](http://paperjs.org/)

```shell
$ grunt paper
```

Results are built into the `distribution/` folder

Alternatively type `grunt watch` to have the build run automatically when you make changes to source files.

```shell
$ grunt watch
```

**Note** grunt watch doesn't run unit tests.



