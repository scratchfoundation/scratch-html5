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

'use strict';

var SensingPrims = function() {};

SensingPrims.prototype.addPrimsTo = function(primTable) {
    primTable['touching:']      = this.primTouching;
    primTable['touchingColor:'] = this.primTouchingColor;
    primTable['color:sees:']    = this.primColorTouchingColor;

    primTable['doAsk']              = this.primDoAsk;
    primTable['answer']             = this.primAnswer;

    primTable['keyPressed:']  = this.primKeyPressed;
    primTable['mousePressed'] = function(b) { return runtime.mouseDown; };
    primTable['mouseX']       = function(b) { return runtime.mousePos[0]; };
    primTable['mouseY']       = function(b) { return runtime.mousePos[1]; };
    primTable['distanceTo:']  = this.primDistanceTo;
    primTable['soundLevel']  = function(b) { return runtime.soundLevel(); };
    primTable['isLoud'] = function(b) { return runtime.isLoud(); };

    primTable['getAttribute:of:'] = this.primGetAttribute;

    primTable['timeAndDate']  = function(b) { return runtime.getTimeString(interp.arg(b, 0)); };
    primTable['timestamp'] = this.primTimestamp;
};

SensingPrims.prototype.primTouching = function(b) {
    var s = interp.targetSprite();
    if (s == null || !s.visible) return false;

    var arg = interp.arg(b, 0);
    if (arg == '_edge_') {
        return false; // TODO
    }

    if (arg == '_mouse_') {
        return false; // TODO
    }

    var s2 = runtime.spriteNamed(arg);
    if (s2 == null || !s2.visible) return false;

    return spriteHitTest(s, s2);
};

SensingPrims.prototype.primTouchingColor = function(b) {
    var s = interp.targetSprite();
    if (s == null || !s.visible) return false;

    var color = interp.arg(b, 0);

    return stageColorHitTest(s, color);
};

SensingPrims.prototype.primColorTouchingColor = function(b) {
    var s = interp.targetSprite();
    if (s == null || !s.visible) return false;

    var myColor = interp.arg(b, 0);
    var stageColor = interp.arg(b, 1);

    return stageColorByColorHitTest(s, myColor, stageColor);
};

var spriteHitTest = function(a, b) {
    var hitCanvas = document.createElement('canvas');
    hitCanvas.width = 480;
    hitCanvas.height = 360;
    var hitTester = hitCanvas.getContext('2d');
    hitTester.globalCompositeOperation = 'source-over';
    a.stamp(hitTester, 100);
    hitTester.globalCompositeOperation = 'source-in';
    b.stamp(hitTester, 100);

    var aData = hitTester.getImageData(0, 0, 480, 360).data;

    var pxCount = aData.length;
    for (var i = 0; i < pxCount; i += 4) {
        if (aData[i+3] > 0) {
            return true;
        }
    }
    return false;
};

var stageColorHitTest = function(target, color) {
    var r, g, b;
    r = (color >> 16);
    g = (color >> 8 & 255);
    b = (color & 255);

    var targetCanvas = document.createElement('canvas');
    targetCanvas.width = 480;
    targetCanvas.height = 360;
    var targetTester = targetCanvas.getContext('2d');
    target.stamp(targetTester, 100);

    var stageCanvas = document.createElement('canvas');
    stageCanvas.width = 480;
    stageCanvas.height = 360;
    var stageContext = stageCanvas.getContext('2d');

    $.each(runtime.sprites, function(i, sprite) {
        if (sprite != target)
            sprite.stamp(stageContext, 100);
    });

    var hitData = stageContext.getImageData(0, 0, stageCanvas.width, stageCanvas.height).data;
    var meshData = targetTester.getImageData(0, 0, targetCanvas.width, targetCanvas.height).data;
    var pxCount = meshData.length;
    for (var i = 0; i < pxCount; i += 4) {
        if (meshData[i+3] > 0 && hitData[i] == r && hitData[i+1] == g && hitData[i+2] == b)
            return true;
    }
    return false;
};

var stageColorByColorHitTest = function(target, myColor, otherColor) {
    var threshold_acceptable = function(a, b, c, x, y, z) {
        var diff_a = Math.abs(a-x);
        var diff_b = Math.abs(b-y);
        var diff_c = Math.abs(c-z);
        if (diff_a + diff_b + diff_c < 100) {
            return true;
        }
        return false;
    };
    var targetCanvas = document.createElement('canvas');
    targetCanvas.width = 480;
    targetCanvas.height = 360;
    var targetTester = targetCanvas.getContext('2d');
    target.stamp(targetTester, 100);
    var targetData = targetTester.getImageData(0, 0, targetCanvas.width, targetCanvas.height).data;

    // Calculate RGB values of the colors - TODO thresholding
    //myColor = Math.abs(myColor);
    //otherColor = Math.abs(otherColor);
    var mr, mg, mb, or, og, ob;
    mr = (myColor >> 16);
    mg = (myColor >> 8 & 255);
    mb = (myColor & 255);
    or = (otherColor >> 16);
    og = (otherColor >> 8 & 255);
    ob = (otherColor & 255);

    // Create the hit canvas for comparison
    var hitCanvas = document.createElement('canvas');
    hitCanvas.width = 480;
    hitCanvas.height = 360;
    var hitCtx = hitCanvas.getContext('2d');
    $.each(runtime.sprites, function(i, sprite) {
        if (sprite != target) {
            sprite.stamp(hitCtx, 100);
        }
    });

    var hitData = hitCtx.getImageData(0, 0, hitCanvas.width, hitCanvas.height).data;
    var pxCount = targetData.length;
    for (var i = 0; i < pxCount; i += 4) {
        if (threshold_acceptable(targetData[i], targetData[i+1], targetData[i+2], mr, mg, mb) && threshold_acceptable(hitData[i], hitData[i+1], hitData[i+2], or, og, ob)) {
            return true;
        }
    }
    return false;
};

SensingPrims.prototype.primDoAsk= function(b) {
    showBubble(b, "doAsk");
    var s = interp.targetSprite();
    if (s !== null) {
        interp.activeThread.paused = true;
        s.showAsk();
    }
};

SensingPrims.prototype.primAnswer = function(b) {
    var s = interp.targetStage();
    return (s !== null ? s.askAnswer : undefined);
};


SensingPrims.prototype.primKeyPressed = function(b) {
    var key = interp.arg(b, 0);
    var ch = key.charCodeAt(0);
    if (ch > 127) return false;
    if (key == "left arrow") ch = 37;
    if (key == "right arrow") ch = 39;
    if (key == "up arrow") ch = 38;
    if (key == "down arrow") ch = 40;
    if (key == "space") ch = 32;
    return (typeof(runtime.keysDown[ch]) != 'undefined');
};

SensingPrims.prototype.primDistanceTo = function(b) {
    var s = interp.targetSprite();
    var p = mouseOrSpritePosition(interp.arg(b, 0));
    if (s == null || p == null) return 0;
    var dx = p.x - s.scratchX;
    var dy = p.y - s.scratchY;
    return Math.sqrt((dx * dx) + (dy * dy));
};

SensingPrims.prototype.primGetAttribute = function(b) {
    var attr = interp.arg(b, 0);
    var targetSprite = runtime.spriteNamed(interp.arg(b, 1));
    if (targetSprite == null) return 0;
    if (attr == 'x position') return targetSprite.scratchX;
    if (attr == 'y position') return targetSprite.scratchY;
    if (attr == 'direction') return targetSprite.direction;
    if (attr == 'costume #') return targetSprite.currentCostumeIndex + 1;
    if (attr == 'costume name') return targetSprite.costumes[targetSprite.currentCostumeIndex]['costumeName'];
    if (attr == 'size') return targetSprite.getSize();
    if (attr == 'volume') return targetSprite.volume;
    return 0;
};

SensingPrims.prototype.primTimeDate = function(b) {
    var dt = interp.arg(b, 0);
    var now = new Date();
    if (dt == 'year') return now.getFullYear();
    if (dt == 'month') return now.getMonth()+1;
    if (dt == 'date') return now.getDate();
    if (dt == 'day of week') return now.getDay()+1;
    if (dt == 'hour') return now.getHours();
    if (dt == 'minute') return now.getMinutes();
    if (dt == 'second') return now.getSeconds();
    return 0;
};

SensingPrims.prototype.primTimestamp = function(b) {
    var now = new Date();
    var epoch = new Date(2000, 0, 1);
    var dst = now.getTimezoneOffset() - epoch.getTimezoneOffset();
    var msSince = now.getTime() - epoch.getTime();
    msSince -= dst * 60000;
    return msSince / 86400000;
};

// Helpers
SensingPrims.prototype.mouseOrSpritePosition = function(arg) {
    if (arg == "_mouse_") {
        var w = runtime.stage;
        return new Point(runtime.mousePos[0], runtime.mousePos[1]);
    } else {
        var s = runtime.spriteNamed(arg);
        if (s == null) return null;
        return new Point(s.scratchX, s.scratchY);
    }
    return null;
};
