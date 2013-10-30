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

var Reporter = function(data) {
    this.cmd = data.cmd;
    this.color = data.color;
    this.isDiscrete = data.isDiscrete;
    this.label = data.label;
    this.mode = data.mode;
    this.param = data.param;
    this.sliderMin = data.sliderMin;
    this.sliderMax = data.sliderMax;
    this.target = data.target;
    this.visible = data.visible;
    this.x = data.x;
    this.y = data.y;
    this.z = io.getCount();

    this.el = null; // jQuery Element for the outer box
    this.valueEl = null; // jQ element containing the reporter value
    this.slider = null; // slider jQ element
}

Reporter.prototype.attach = function(scene) {
    switch (this.mode) {
        case 1: // Normal
        case 3: // Slider
            this.el = $('<div class="reporter-normal">' + this.label + '</div>');
            this.valueEl = $('<div class="reporter-inset">null</div>');
            this.el.append(this.valueEl);
            if (this.mode == 3) {
                // Slider-specific
                // Temporarily, set the value to sliderMin until an update
                this.slider = $('<input type="range" min="' + this.sliderMin +
                                '" max="' + this.sliderMax + '" step="1" value="' +
                                this.sliderMin + '" data-target="' + this.target + 
                                '" data-var="' + this.param + '">');
                this.slider.change(this.changeSlider);
                this.el.append('<br>');
                this.el.append(this.slider);
            }
            break;
        case 2: // Large
            this.el = $('<div class="reporter-large">null</div>');
            this.valueEl = this.el;
            break;
    }
    this.el.css('left', this.x);
    this.el.css('top', this.y);
    this.el.css('z-index', this.z);
    var cR = (this.color >> 16);
    var cG = (this.color >> 8 & 255);
    var cB = (this.color & 255);
    this.valueEl.css('background-color', 'rgb(' + cR + ',' + cG + ',' + cB + ')');
    this.el.css('display', this.visible ? 'inline-block' : 'none');
    scene.append(this.el);
}

Reporter.prototype.update = function() {
    this.el.css('display', this.visible ? 'inline-block' : 'none');
    if (!this.visible) return;
     
    var newValue ='';
    var target = runtime.spriteNamed(this.target);
    switch (this.cmd) {
        case 'getVar:':
            newValue = target.variables[this.param];
            if (typeof(newValue) == 'number' && this.mode != 3) newValue = newValue.toFixed(3);
            break;
        case 'xpos':
            newValue = target.scratchX.toFixed(3);
            break;
        case 'ypos':
            newValue = target.scratchY.toFixed(3);
            break;
        case 'heading':
            newValue = target.direction;
            break;
        case 'scale':
            newValue = target.getSize();
            break;
        case 'sceneName':
            newValue = runtime.stage.costumes[runtime.stage.currentCostumeIndex].costumeName;
            break;
        case 'costumeIndex':
            newValue = target.currentCostumeIndex + 1;
            break;
        case 'timer':
            newValue = interp.primitiveTable.timer().toFixed(3);
            break;
    }
    this.valueEl.html(newValue);
    if (this.mode == 3)
        this.slider.val(parseInt(newValue));
}

Reporter.prototype.updateLayer = function() {
    this.el.css('z-index', this.z);
}

Reporter.prototype.changeSlider = function() {
    var newValue = parseInt($(this).val());
    var target = runtime.spriteNamed($(this).attr('data-target'));
    var variable = $(this).attr('data-var');
    target.variables[variable] = newValue;
}

var List = function(data) {
    this.contents = data.contents;
    this.listName = data.listName;

    this.height = data.height;
    this.width = data.width;
    this.x = data.x;
    this.y = data.y;
    this.z = io.getCount();
    this.visible = data.visible;

//    this.isPersistent = data.isPersistent;

    this.el = null; // jQuery element for list
    this.containerEl = null;
};

List.prototype.attach = function(scene) {
    this.el = $('<div class="list">');
    this.el.append('<div class="list-title">'+this.listName);
    this.containerEl = $('<div style="width:99%;overflow:auto">').appendTo(this.el);
    this.el.append('<div class="list-add">+');
    this.el.append('<div class="list-length">length: '+this.contents.length);
    scene.append(this.el);
    this.update();
    this.el.css('left', this.x);
    this.el.css('top', this.y);
    this.el.width(this.width);
    this.el.height(this.height);
    this.el.css('z-index', this.z);
    this.el.css('display', this.visible ? 'inline-block' : 'none');
}

List.prototype.update = function(){
    this.el.css('display', this.visible ? 'inline-block' : 'none');
    if (!this.visible) return;

    var c = this.containerEl.html(''); // so that it can be used inside the forEach
    this.contents.forEach(function(val,i){
        $('<div style="clear:both">').appendTo(c).append('<div class="list-index">'+(i+1),'<div class="list-item">'+val);
    });
    c.height(this.height-26);
    this.el.find('.list-length').text('length: '+this.contents.length);
};

List.prototype.updateLayer = function() {
    this.el.css('z-index', this.z);
}
