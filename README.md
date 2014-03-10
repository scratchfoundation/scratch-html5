# Scratch HTML5 Player

This project aims to create a Scratch Player in HTML5.  Scratch is currently implemented with Actionscript 3 and requires the Flash Player version 10.2.  Since Flash does not run on iOS (iPads, iPods, etc) and newer Android devices, we would like to have an HTML5 version to display (but not edit) projects on mobile devices. Scratch projects played in the HTML5 player should look and behave as closely as possible to the way they look and behave when played by the Flash player.  We will not be accepting pull requests for new features that don't already exist in the Flash based Scratch project player.

There are a few github issues created that represent some of the missing features.  At this point, the HTML5 player is about 40% complete and can run some simple projects.

Unimplementable Features on iOS: Image effects for whirl, fisheye, mosaic, and pixelate.  Sound and video input for loudness, video motion, and touching colors from the video.

More documentation will be added as time permits. Thanks for contributing, and Scratch On!

## Contributions

Thank you for your interest in helping out with the Scratch HTML5 Player.  [@sclements](https://github.com/sclements/) is the maintainer of the project and reviews all code before pull requests are approved.  Though we appreciate all attempts to contribute, there are some contraints that must be met before pull requests can be approved.  Here are our top concerns for contributions: matching the behavior and interface of the Flash player, code cleanliness and organization, and robust well tested logic.  CSS goes into player.css (not in the html or javascript).  Please use [compare.html](https://github.com/LLK/scratch-html5/blob/master/compare.html) to compare your work with the production Flash player.


## Installation

Running the HTML5 player on your own website, or locally, you will need to have
PHP so that the `proxy.php` file can be used to load assets from the same domain.  This is done to be compatible with Javascript security models in today's browsers.  To test the HTML5 player against the Flash player you can use the compare.html web page.

See the file `TESTING.md` for more details.


Unit Tests
----------
The tests are written using Karma and there should be a 100% passing rate in order to commit any code to the project.

The expectation is to add a unit test for any code that you contribute to the project.


Install Node (NPM) (https://npmjs.org/)
---------------------------------------
 
Brew:
```
$ brew install npm
```
 
Mac Ports:
```
$ port install npm
```

In your local scratch directory

```
$ npm install
```

Local copy of jQuery and mock-ajax
----------------------------------

```
$ cd test/lib
$ curl http://code.jquery.com/jquery-1.11.0.min.js > jquery-1.11.0.min.js
$ curl http://cloud.github.com/downloads/pivotal/jasmine-ajax/mock-ajax.js > mock-ajax.js
```

To Run the tests
----------------

```
$ ./scripts/test.sh
```


To configure the unit tests
---------------------------
The karam.conf.js file is location in the config directory
