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
// Color.js
// Based on the original by John Maloney

Color = function() {};

Color.fromHSV = function(h, s, v) {
    var r, g, b;
    h = h % 360;
    if (h < 0) h += 360;
    s = Math.max(0, Math.min(s, 1));
    v = Math.max(0, Math.min(v, 1));

    var i = Math.floor(h / 60);
    var f = (h / 60) - i;
    var p = v * (1 - s);
    var q = v * (1 - s * f);
    var t = v * (1 - s * (1 - f));
    if (i == 0) { r = v; g = t; b = p; }
    else if (i == 1) { r = q; g = v; b = p; }
    else if (i == 2) { r = p; g = v; b = t; }
    else if (i == 3) { r = p; g = q; b = v; }
    else if (i == 4) { r = t; g = p; b = v; }
    else if (i == 5) { r = v; g = p; b = q; }
    r = Math.floor(r * 255);
    g = Math.floor(g * 255);
    b = Math.floor(b * 255);
    return (r << 16) | (g << 8) | b;
};

Color.rgb2hsv = function(rgb) {
    var h, s, v, x, f, i;
    var r = ((rgb >> 16) & 255) / 255;
    var g = ((rgb >> 8) & 255) / 255;
    var b = (rgb & 255) / 255;
    x = Math.min(Math.min(r, g), b);
    v = Math.max(Math.max(r, g), b);
    if (x == v) return [0, 0, v]; // gray; hue arbitrarily reported as zero
    f = r == x ? g - b : g == x ? b - r : r - g;
    i = r == x ? 3 : g == x ? 5 : 1;
    h = ((i - f / (v - x)) * 60) % 360;
    s = (v - x) / v;
    return [h, s, v];
};

Color.scaleBrightness = function(rgb, scale) {
    var hsv = Color.rgb2hsv(rgb);
    scale = Math.max(0, Math.min(scale, 1));
    return Color.fromHSV(hsv[0], hsv[1], scale * hsv[2]);
};

Color.mixRGB = function(rgb1, rgb2, fraction) {
    // Mix rgb1 with rgb2. 0 gives all rgb1, 1 gives rbg2, .5 mixes them 50/50.
    if (fraction <= 0) return rgb1;
    if (fraction >= 1) return rgb2;
    var r1 = (rgb1 >> 16) & 255;
    var g1 = (rgb1 >> 8) & 255;
    var b1 = rgb1 & 255
    var r2 = (rgb2 >> 16) & 255;
    var g2 = (rgb2 >> 8) & 255;
    var b2 = rgb2 & 255
    var r = ((fraction * r2) + ((1.0 - fraction) * r1)) & 255;
    var g = ((fraction * g2) + ((1.0 - fraction) * g1)) & 255;
    var b = ((fraction * b2) + ((1.0 - fraction) * b1)) & 255;
    return (r << 16) | (g << 8) | b;
};

Color.random = function() {
    // return a random color
    var h = 360 * Math.random();
    var s = 0.7 + (0.3 * Math.random());
    var v = 0.6 + (0.4 * Math.random());
    return Color.fromHSV(h, s, v);
};
