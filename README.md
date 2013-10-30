# Scratch HTML5 Player

This project aims to create a Scratch Player in HTML5.  Scratch is currently implemented with Actionscript 3 and requires the Flash Player version 10.2.  Since Flash does not run on iOS (iPads, iPods, etc) and newer Android devices, we would like to have an HTML5 version to display (but not edit) projects on mobile devices. Scratch projects played in the HTML5 player should look and behave as closely as possible to the way they look and behave when played by the Flash player.  We will not be accepting pull requests for new features that don't already exist in the Flash based Scratch project player.

There are a few github issues created that represent some of the missing features.  At this point, the HTML5 player is about 40% complete and can run some simple projects.

Unimplementable Features on iOS: Image effects for whirl, fisheye, mosaic, and pixelate.  Sound and video input for loudness, video motion, and touching colors from the video.

More documentation will be added as time permits. Thanks for contributing, and Scratch On!

## Installation

Running the HTML5 player on your own website, or locally, you will need to have
PHP so that the `proxy.php` file can be used to load assets from the same domain.  This is done to be compatible with Javascript security models in today's browsers.  To test the HTML5 player against the Flash player you can use the compare.html web page.

See the file `TESTING.md` for more details.
