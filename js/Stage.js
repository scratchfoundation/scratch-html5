// Copyright (C) 2013 Massachusetts Institute of Technology
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 2,
// as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

// Scratch HTML5 Player
// Stage.js
// Tim Mickel, July 2011 - March 2012

// Provides the basic logic for the Stage, a special kind of Sprite.

'use strict';

var Stage = function(data) {
    // Place the background layer in the very back.
    // The pen layer is right above the stage background,
    // and all sprites are above that.
    this.z = -2;

    // Pen layer and canvas cache.
    this.penLayerLoaded = false;
    this.lineCanvas = document.createElement('canvas');
    this.lineCanvas.width = 480;
    this.lineCanvas.height = 360;
    this.lineCache = this.lineCanvas.getContext('2d');
    this.isStage = true;
    this.askAnswer = ""; //this is a private variable and should be blank

    Sprite.call(this, data);
};

Stage.prototype = Object.create(Sprite.prototype);
Stage.prototype.constructor = Stage;

Stage.prototype.attachPenLayer = function(scene) {
    if (this.penLayerLoaded) return;
    this.penLayerLoaded = true;
    $(this.lineCanvas).css('position', 'absolute');
    $(this.lineCanvas).css('z-index', '-1');
    scene.append(this.lineCanvas);
};

Stage.prototype.isLoaded = function() {
    return this.penLayerLoaded && this.costumesLoaded == this.costumes.length && this.soundsLoaded == Object.keys(this.sounds).length;
};

// Pen functions
Stage.prototype.clearPenStrokes = function() {
    this.lineCache.clearRect(0, 0, 480, 360);
};

Stage.prototype.stroke = function(from, to, width, color) {
    this.lineCache.lineWidth = width;
    this.lineCache.lineCap = 'round';
    this.lineCache.beginPath();
    // Use .5 offsets for canvas rigid pixel drawing
    this.lineCache.moveTo(from[0] + 240.5, 180.5 - from[1]);
    this.lineCache.lineTo(to[0] + 240.5, 180.5 - to[1]);
    this.lineCache.strokeStyle = 'rgb(' + (color >>> 16 & 255) + ',' + (color >>> 8 & 255) + ',' + (color >>> 0 & 255) + ')';
    this.lineCache.stroke();
};
