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
    this.mode = data.mode;
    this.param = data.param;
    this.sliderMin = data.sliderMin;
    this.sliderMax = data.sliderMax;
    this.target = data.target;
    this.visible = data.visible;
    this.x = data.x;
    this.y = data.y;
    this.z = io.getCount();

    //Set the label after hydrating the cmd and param variables
    this.label = this.determineReporterLabel();

    this.el = null; // jQuery Element for the outer box
    this.valueEl = null; // jQ element containing the reporter value
    this.slider = null; // slider jQ element
};

Reporter.prototype.determineReporterLabel = function() {
    if (this.target === 'Stage' && this.cmd === "getVar:") return this.param;
    if (this.target === 'Stage' && this.param === null) return this.cmd;
    return this.target + ': ' + this.param;
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
};

Reporter.prototype.update = function() {
    this.el.css('display', this.visible ? 'inline-block' : 'none');
    if (!this.visible) return;

    var newValue = '';
    var target = runtime.spriteNamed(this.target);
    switch (this.cmd) {
        case 'answer':
            newValue = target.askAnswer;
            break;
        case 'getVar:':
            newValue = target.variables[this.param];
            break;
        case 'xpos':
            newValue = target.scratchX;
            break;
        case 'ypos':
            newValue = target.scratchY;
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
            newValue = '' + Math.round(interp.primitiveTable.timer() * 10) / 10;
            break;
    }
    if (typeof newValue === 'number' && Math.abs(newValue) > 0.001) {
        newValue = Math.round(newValue * 1000) / 1000;
    }
    newValue = '' + newValue;
    this.valueEl.html(newValue);
    if (this.mode == 3) {
        this.slider.val(Number(newValue));
    }
};

Reporter.prototype.updateLayer = function() {
    this.el.css('z-index', this.z);
};

Reporter.prototype.changeSlider = function() {
    var newValue = Number($(this).val());
    var target = runtime.spriteNamed($(this).attr('data-target'));
    var variable = $(this).attr('data-var');
    target.variables[variable] = newValue;
};

var List = function(data, sprite) {
    this.contents = data.contents;
    this.listName = data.listName;

    this.height = data.height;
    this.width = data.width;
    this.x = data.x;
    this.y = data.y;
    this.z = io.getCount();
    this.visible = data.visible;

    this.target = sprite;

//    this.isPersistent = data.isPersistent;

    this.el = null; // jQuery element for list
    this.containerEl = null;
    this.scrollbar = null;
};

List.prototype.attach = function(scene) {
    this.el = $('<div class="list">');
    this.el.append('<div class="list-title">'+(this.target==='Stage'?'':this.target+' ')+this.listName);
    var c = this.containerEl = $('<div style="overflow:hidden;float:left;position:relative">').appendTo(this.el).width(this.width-13).height(this.height-34);
    var s = this.scrollbar = $('<div class="list-scrollbar-container"><div class="list-scrollbar">').appendTo(this.el);
    var sb = s.children('.list-scrollbar');
    sb.mousedown(function(e) {
        if (e.which===1) $(this).data({scrolling:true,startY:e.pageY}); // left button
    });
    $('body').mousemove(function(e) {
        if (sb.data('scrolling')) {
            var offset = parseInt(sb.css('top'))+e.pageY-sb.data('startY');
            if (offset < 0) {
                offset = 0;
            }
            if (offset > c.height()-sb.height()) {
                offset = c.height()-sb.height();
            }
            sb.css('top',offset);
            c.scrollTop(c.height()/sb.height()*offset);
        }
    }).mouseup(function() {
        if ($.hasData(sb[0],'scrolling')) sb.removeData(['scrolling','startY']);
    });
//    this.el.append('<div class="list-add">+'); // disabled because it doesn't do anything even in the original
    this.el.append('<div class="list-length">length: '+this.contents.length);
    scene.append(this.el);
    this.update();
    this.el.css('left', this.x);
    this.el.css('top', this.y);
    this.el.width(this.width);
    this.el.height(this.height);
    this.el.css('z-index', this.z);
    this.el.css('display', this.visible ? 'inline-block' : 'none');
};

List.prototype.update = function() {
    this.contents = findList(runtime.spriteNamed(this.target),this.listName);

    this.el.css('display', this.visible ? 'inline-block' : 'none');
    if (!this.visible) return;

    var c = this.containerEl.html(''); // so that it can be used inside the forEach
    this.contents.forEach(function(val,i) {
        $('<div style="clear:both">').appendTo(c).append('<div class="list-index">'+(i+1),'<div class="list-item">'+val);
    });
    c.find('.list-index').width(c.find('.list-index').last().width());
    c.find('.list-item').width(c.width()-c.find('.list-index').width()-15);
    var s = this.scrollbar.height(c.height());
    s.children('.list-scrollbar').height(s.height()/c[0].scrollHeight*s.height()).css('display', s.children('.list-scrollbar').height()===c.height() ? 'none' : 'inline-block');
    this.el.find('.list-length').text('length: '+this.contents.length);
};

List.prototype.updateLayer = function() {
    this.el.css('z-index', this.z);
};

