### Deprecated
#### This project is no longer actively maintained by the Scratch Team. For a list of active open source projects please visit: https://scratch.mit.edu/developers

---

# Scratch HTML5 Player

This project aims to create a Scratch Player in HTML5.  Scratch is currently implemented with Actionscript 3 and requires the Flash Player version 10.2.  Since Flash does not run on iOS (iPads, iPods, etc) and newer Android devices, we would like to have an HTML5 version to display (but not edit) projects on mobile devices. Scratch projects played in the HTML5 player should look and behave as closely as possible to the way they look and behave when played by the Flash player.  We will not be accepting pull requests for new features that don't already exist in the Flash based Scratch project player.

This source code is made available under the GNU General Public License version 2. Modified versions of this source code may be licensed under the GNU GPL v2 or later versions of the GNU General Public License.

The [Flash version is now open source](https://github.com/LLK/scratch-flash) and will be a great help in understanding how features are currently implemented in the version on http://scratch.mit.edu/.

There are a few github issues created that represent some of the missing features.  At this point, the HTML5 player is about 40% complete and can run some simple projects.

Unimplementable Features on iOS: Image effects for whirl, fisheye, mosaic, and pixelate.  Sound and video input for loudness, video motion, and touching colors from the video.

More documentation will be added as time permits. Thanks for contributing, and Scratch On!

## Contributions

Thank you for your interest in helping out with the Scratch HTML5 Player.  [@sclements](https://github.com/sclements/) is the maintainer of the project and reviews all code before pull requests are approved.  Though we appreciate all attempts to contribute, there are some contraints that must be met before pull requests can be approved.  Here are our top concerns for contributions: matching the behavior and interface of the Flash player, code cleanliness and organization, and robust well tested logic.  CSS goes into player.css (not in the html or javascript).  Please use [compare.html](https://github.com/LLK/scratch-html5/blob/master/compare.html) to compare your work with the production Flash player.


## Installation

Special headers are sent on the Scratch asset servers to allow for cross-origin image manipulation.  A proxy is no longer needed provided you are using projects hosted on the Scratch website.  However, the project must either run locally with "Disabled Local File Restrictions" (Safari) or the `--disable-web-security` parameter (Google Chrome/Chromium) or you can always use a development server like [http-server](https://www.npmjs.org/package/http-server).  This is compatible with Javascript security models in today's browsers.  See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image) for more information.  To test the HTML5 player against the Flash player you can use the compare.html web page.

See the file `TESTING.md` for more details.


Unit Tests
----------
The tests are written using Karma and there should be a 100% passing rate in order to commit any code to the project.

The expectation is to add a unit test for any code that you contribute to the project.


Install Node
---------------------------------------

To install [Node.js](http://nodejs.org) and [NPM](http://npmjs.org) simply go to [http://nodejs.org](http://nodejs.org/), download the package for your operating system and install. Once installed, navigate to your local scratch directory and run:

```bash
npm install
```

To Run the tests
----------------

```bash
npm test
```
