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

var MotionAndPenPrims = function() {};

MotionAndPenPrims.prototype.addPrimsTo = function(primTable) {
    primTable['forward:']           = this.primMove;
    primTable['turnLeft:']          = this.primTurnLeft;
    primTable['turnRight:']         = this.primTurnRight;
    primTable['heading:']           = this.primSetDirection;
    primTable['pointTowards:']      = this.primPointTowards;
    primTable['gotoX:y:']           = this.primGoTo;
    primTable['gotoSpriteOrMouse:']  = this.primGoToSpriteOrMouse;
    primTable['glideSecs:toX:y:elapsed:from:'] = this.primGlide;

    primTable['changeXposBy:']      = this.primChangeX;
    primTable['xpos:']              = this.primSetX;
    primTable['changeYposBy:']      = this.primChangeY;
    primTable['ypos:']              = this.primSetY;

    primTable['bounceOffEdge']      = this.primBounceOffEdge;
    primTable['setRotationStyle']   = this.primSetRotationStyle;

    primTable['xpos']               = this.primXPosition;
    primTable['ypos']               = this.primYPosition;
    primTable['heading']            = this.primDirection;

    primTable['clearPenTrails']     = this.primClear;
    primTable['putPenDown']         = this.primPenDown;
    primTable['putPenUp']           = this.primPenUp;
    primTable['penColor:']          = this.primSetPenColor;
    primTable['setPenHueTo:']       = this.primSetPenHue;
    primTable['changePenHueBy:']    = this.primChangePenHue;
    primTable['setPenShadeTo:']     = this.primSetPenShade;
    primTable['changePenShadeBy:']  = this.primChangePenShade;
    primTable['penSize:']           = this.primSetPenSize;
    primTable['changePenSizeBy:']   = this.primChangePenSize;

    primTable['stampCostume']       = this.primStamp;
    primTable['stampTransparent']   = this.primStampTransparent;
};

MotionAndPenPrims.prototype.primMove = function(b) {
    var s = interp.targetSprite();
    var radians = (90 - s.direction) * Math.PI / 180;
    var d = interp.numarg(b, 0);

    moveSpriteTo(s, s.scratchX + d * Math.cos(radians), s.scratchY + d * Math.sin(radians));
    if (s.visible) interp.redraw();
};

MotionAndPenPrims.prototype.primTurnLeft = function(b) {
    var s = interp.targetSprite();
    var d = s.direction - interp.numarg(b, 0);
    s.setDirection(d);
    if (s.visible) interp.redraw();
};

MotionAndPenPrims.prototype.primTurnRight = function(b) {
    var s = interp.targetSprite();
    var d = s.direction + interp.numarg(b, 0);
    s.setDirection(d);
    if (s.visible) interp.redraw();
};

MotionAndPenPrims.prototype.primSetDirection = function(b) {
    var s = interp.targetSprite();
    s.setDirection(interp.numarg(b, 0));
    if (s.visible) interp.redraw();
};

MotionAndPenPrims.prototype.primPointTowards = function(b) {
    var s = interp.targetSprite();
    var p = mouseOrSpritePosition(interp.arg(b, 0));
    if (s == null || p == null) return;
    var dx = p.x - s.scratchX;
    var dy = p.y - s.scratchY;
    var angle = 90 - Math.atan2(dy, dx) * 180 / Math.PI;
    s.setDirection(angle);
    if (s.visible) interp.redraw();
};

MotionAndPenPrims.prototype.primGoTo = function(b) {
    var s = interp.targetSprite();
    if (s != null) moveSpriteTo(s, interp.numarg(b, 0), interp.numarg(b, 1));
};

MotionAndPenPrims.prototype.primGoToSpriteOrMouse = function(b) {
    var s = interp.targetSprite();
    var p = mouseOrSpritePosition(interp.arg(b, 0));
    if (s == null || p == null) return;
    moveSpriteTo(s, p.x, p.y);
};

MotionAndPenPrims.prototype.primGlide = function(b) {
    var s = interp.targetSprite();
    if (s == null) return;
    if (interp.activeThread.firstTime) {
        var secs = interp.numarg(b, 0);
        var destX = interp.numarg(b, 1);
        var destY = interp.numarg(b, 2);
        if (secs <= 0) {
            moveSpriteTo(s, destX, destY);
            return;
        }
        // record state: [0]start msecs, [1]duration, [2]startX, [3]startY, [4]endX, [5]endY
        interp.activeThread.tmpObj = [interp.currentMSecs, 1000 * secs, s.scratchX, s.scratchY, destX, destY];
        interp.startTimer(secs);
    } else {
        var state = interp.activeThread.tmpObj;
        if (!interp.checkTimer()) {
            // in progress: move to intermediate position along path
            var frac = (interp.currentMSecs - state[0]) / state[1];
            var newX = state[2] + frac * (state[4] - state[2]);
            var newY = state[3] + frac * (state[5] - state[3]);
            moveSpriteTo(s, newX, newY);
        } else {
            // finished: move to final position and clear state
            moveSpriteTo(s, state[4], state[5]);
            interp.activeThread.tmpObj = null;
        }
    }
};

MotionAndPenPrims.prototype.primChangeX = function(b) {
    var s = interp.targetSprite();
    if (s != null) moveSpriteTo(s, s.scratchX + interp.numarg(b, 0), s.scratchY);
};

MotionAndPenPrims.prototype.primSetX = function(b) {
    var s = interp.targetSprite();
    if (s != null) moveSpriteTo(s, interp.numarg(b, 0), s.scratchY);
};

MotionAndPenPrims.prototype.primChangeY = function(b) {
    var s = interp.targetSprite();
    if (s != null) moveSpriteTo(s, s.scratchX, s.scratchY + interp.numarg(b, 0));
};

MotionAndPenPrims.prototype.primSetY = function(b) {
    var s = interp.targetSprite();
    if (s != null) moveSpriteTo(s, s.scratchX, interp.numarg(b, 0));
};

MotionAndPenPrims.prototype.primBounceOffEdge = function(b) {
    var s = interp.targetSprite();
    if (s == null) return;
    if (!turnAwayFromEdge(s)) return;
    ensureOnStageOnBounce(s);
    if (s.visible) interp.redraw();
};

MotionAndPenPrims.prototype.primSetRotationStyle = function(b) {
    var s = interp.targetSprite();
    if (s == null) return;
    var request = interp.arg(b, 0);
    var rotationStyle = 'normal';
    if (request == 'all around') rotationStyle = 'normal';
    else if (request == 'left-right') rotationStyle = 'leftRight';
    else if (request == 'none') rotationStyle = 'none';
    s.setRotationStyle(rotationStyle);
};

MotionAndPenPrims.prototype.primXPosition = function(b) {
    var s = interp.targetSprite();
    return s != null ? s.scratchX : 0;
};

MotionAndPenPrims.prototype.primYPosition = function(b) {
    var s = interp.targetSprite();
    return s != null ? s.scratchY : 0;
};

MotionAndPenPrims.prototype.primDirection = function(b) {
    var s = interp.targetSprite();
    return s != null ? s.direction : 0;
};

MotionAndPenPrims.prototype.primClear = function(b) {
    runtime.stage.clearPenStrokes();
    interp.redraw();
};

MotionAndPenPrims.prototype.primPenDown = function(b) {
    var s = interp.targetSprite();
    if (s != null) s.penIsDown = true;
    stroke(s, s.scratchX, s.scratchY, s.scratchX + 0.2, s.scratchY + 0.2);
    interp.redraw();
};

MotionAndPenPrims.prototype.primPenUp = function(b) {
    var s = interp.targetSprite();
    if (s != null) s.penIsDown = false;
};

MotionAndPenPrims.prototype.primSetPenColor = function(b) {
    var s = interp.targetSprite();
    if (s != null) s.setPenColor(interp.numarg(b, 0));
};

MotionAndPenPrims.prototype.primSetPenHue = function(b) {
    var s = interp.targetSprite();
    if (s != null) s.setPenHue(interp.numarg(b, 0));
};

MotionAndPenPrims.prototype.primChangePenHue = function(b) {
    var s = interp.targetSprite();
    if (s != null) s.setPenHue(s.penHue + interp.numarg(b, 0));
};

MotionAndPenPrims.prototype.primSetPenShade = function(b) {
    var s = interp.targetSprite();
    if (s != null) s.setPenShade(interp.numarg(b, 0));
};

MotionAndPenPrims.prototype.primChangePenShade = function(b) {
    var s = interp.targetSprite();
    if (s != null) s.setPenShade(s.penShade + interp.numarg(b, 0));
};

MotionAndPenPrims.prototype.primSetPenSize = function(b) {
    var s = interp.targetSprite();
    var w = Math.max(0, Math.min(interp.numarg(b, 0), 100));
    if (s != null) s.penWidth = w;
};

MotionAndPenPrims.prototype.primChangePenSize = function(b) {
    var s = interp.targetSprite();
    var w = Math.max(0, Math.min(s.penWidth + interp.numarg(b, 0), 100));
    if (s != null) s.penWidth = w;
};

MotionAndPenPrims.prototype.primStamp = function(b) {
    var s = interp.targetSprite();
    s.stamp(runtime.stage.lineCache, 100);
};

MotionAndPenPrims.prototype.primStampTransparent = function(b) {
    var s = interp.targetSprite();
    var transparency = Math.max(0, Math.min(interp.numarg(b, 0), 100));
    var alpha = 100 - transparency;
    s.stamp(runtime.stage.lineCache, alpha);
};

// Helpers
var stroke = function(s, oldX, oldY, newX, newY) {
    runtime.stage.stroke([oldX, oldY], [newX, newY], s.penWidth, s.penColorCache);
    interp.redraw();
};

var mouseOrSpritePosition = function(arg) {
    if (arg == '_mouse_') {
        var w = runtime.stage;
        return new Point(runtime.mousePos[0], runtime.mousePos[1]);
    } else {
        var s = runtime.spriteNamed(arg);
        if (s == null) return null;
        return new Point(s.scratchX, s.scratchY);
    }
    return null;
};

var moveSpriteTo = function(s, newX, newY) {
    var oldX = s.scratchX;
    var oldY = s.scratchY;
    s.setXY(newX, newY);
    s.keepOnStage();
    if (s.penIsDown) stroke(s, oldX, oldY, s.scratchX, s.scratchY);
    if (s.penIsDown || s.visible) interp.redraw();
};

var turnAwayFromEdge = function(s) {
    // turn away from the nearest edge if it's close enough; otherwise do nothing
    // Note: comparisions are in the stage coordinates, with origin (0, 0)
    // use bounding rect of the sprite to account for costume rotation and scale
    var r = s.getRect();
    // measure distance to edges
    var d1 = Math.max(0, r.left);
    var d2 = Math.max(0, r.top);
    var d3 = Math.max(0, 480 - r.right);
    var d4 = Math.max(0, 360 - r.bottom);
    // find the nearest edge
    var e = 0, minDist = 100000;
    if (d1 < minDist) { minDist = d1; e = 1; }
    if (d2 < minDist) { minDist = d2; e = 2; }
    if (d3 < minDist) { minDist = d3; e = 3; }
    if (d4 < minDist) { minDist = d4; e = 4; }
    if (minDist > 0) return false;  // not touching to any edge
    // point away from nearest edge
    var radians = (90 - s.direction) * Math.PI / 180;
    var dx = Math.cos(radians);
    var dy = -Math.sin(radians);
    if (e == 1) { dx = Math.max(0.2, Math.abs(dx)); }
    if (e == 2) { dy = Math.max(0.2, Math.abs(dy)); }
    if (e == 3) { dx = 0 - Math.max(0.2, Math.abs(dx)); }
    if (e == 4) { dy = 0 - Math.max(0.2, Math.abs(dy)); }
    var newDir = Math.atan2(dy, dx) * 180 / Math.PI + 90;
    s.direction = newDir;
    return true;
};

var ensureOnStageOnBounce = function(s) {
    var r = s.getRect();
    if (r.left < 0) moveSpriteTo(s, s.scratchX - r.left, s.scratchY);
    if (r.top < 0) moveSpriteTo(s, s.scratchX, s.scratchY + r.top);
    if (r.right > 480) {
        moveSpriteTo(s, s.scratchX - (r.right - 480), s.scratchY);
    }
    if (r.bottom > 360) {
        moveSpriteTo(s, s.scratchX, s.scratchY + (r.bottom - 360));
    }
};
