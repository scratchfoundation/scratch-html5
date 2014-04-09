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

var VarListPrims = function() {}

VarListPrims.prototype.addPrimsTo = function(primTable) {
    // Variable primitives
    primTable['readVariable']        = this.primReadVar;
    primTable['setVar:to:']          = this.primSetVar;
    primTable['changeVar:by:']       = this.primChangeVar;
    primTable['hideVariable:']       = this.primHideVar;
    primTable['showVariable:']       = this.primShowVar;

    // List primitives
    primTable['contentsOfList:']      = this.primReadList;
    primTable['append:toList:']      = this.primListAppend;
    primTable['deleteLine:ofList:']  = this.primListDeleteLine;
    primTable['insert:at:ofList:']   = this.primListInsertAt;
    primTable['setLine:ofList:to:']  = this.primListSetLine;
    primTable['lineCountOfList:']    = this.primListLength;
    primTable['getLine:ofList:']     = this.primListGetLine;
    primTable['list:contains:']      = this.primListContains;
    primTable['hideList:']       = this.primHideList;
    primTable['showList:']       = this.primShowList;
};

// Variable primitive implementations

VarListPrims.prototype.primReadVar = function(b) {
    var s = interp.targetSprite();
    if (s == null) return;
    var targetVar = interp.arg(b, 0);
    if (targetVar in s.variables) {
        return s.variables[targetVar];
    } else if (targetVar in runtime.stage.variables) {
        return runtime.stage.variables[targetVar];
    }
};

VarListPrims.prototype.primSetVar = function(b) {
    var s = interp.targetSprite();
    if (s == null) return;
    var targetVar = interp.arg(b, 0);
    if (targetVar in s.variables) {
        s.variables[targetVar] = interp.arg(b, 1);
    } else if (targetVar in runtime.stage.variables) {
        runtime.stage.variables[targetVar] = interp.arg(b, 1);
    }
};

VarListPrims.prototype.primChangeVar = function(b) {
    var s = interp.targetSprite();
    if (s == null) return;
    var targetVar = interp.arg(b, 0);
    if (targetVar in s.variables) {
        s.variables[targetVar] = parseFloat(s.variables[targetVar]) + interp.numarg(b, 1);
    } else if (targetVar in runtime.stage.variables) {
        runtime.stage.variables[targetVar] = parseFloat(runtime.stage.variables[targetVar]) + interp.numarg(b, 1);
    }
};

VarListPrims.prototype.primHideVar = function(b) {
    var targetVar = interp.arg(b, 0), targetSprite = interp.targetSprite().objName;
    for (var r = 0; r < runtime.reporters.length; r++) {
        if (runtime.reporters[r].cmd == 'getVar:' && runtime.reporters[r].param == targetVar && (runtime.reporters[r].target == targetSprite || runtime.reporters[r].target == 'Stage')) {
            runtime.reporters[r].visible = false;
            return;
        }
    }
};

VarListPrims.prototype.primShowVar = function(b) {
    var targetVar = interp.arg(b, 0), targetSprite = interp.targetSprite().objName;
    for (var r = 0; r < runtime.reporters.length; r++) {
        if (runtime.reporters[r].cmd == 'getVar:' && runtime.reporters[r].param == targetVar && (runtime.reporters[r].target == targetSprite || runtime.reporters[r].target == 'Stage')) {
            runtime.reporters[r].visible = true;
            return;
        }
    }
};

// List primitive implementations

// Take a list name and target sprite and return the JS list itself
function findList(targetSprite, listName) {
    if (targetSprite == null) targetSprite = runtime.stage;
    if (listName in targetSprite.lists) {
        return targetSprite.lists[listName].contents;
    } else if (listName in runtime.stage.lists) {
        return runtime.stage.lists[listName].contents;
    }
    return null;
}

VarListPrims.prototype.primReadList = function(b) {
    var list = findList(interp.targetSprite(), interp.arg(b, 0));
    if (list) {
        var allOne = list.map(function(val) { return val.length; }).reduce(function(old,val) { return old + val; }, 0) === list.length;
        return list.join(allOne ? '' : ' ');
    }
};

VarListPrims.prototype.primListAppend = function(b) {
    var list = findList(interp.targetSprite(), interp.arg(b, 1));
    if (list) list.push(interp.arg(b, 0));
};

VarListPrims.prototype.primListDeleteLine = function(b) {
    var list = findList(interp.targetSprite(), interp.arg(b, 1));
    if (!list) return;
    var line = interp.arg(b, 0);
    if (line == 'all' || list.length == 0) {
        list.length = 0;
    } else if (line == 'last') {
        list.splice(list.length - 1, 1);
    } else if (parseInt(line, 10) - 1 in list) {
        list.splice(parseInt(line, 10) - 1, 1);
    }
};

VarListPrims.prototype.primListInsertAt = function(b) {
    var list = findList(interp.targetSprite(), interp.arg(b, 2));
    if (!list) return;
    var newItem = interp.arg(b, 0);

    var position = interp.arg(b, 1);
    if (position == 'last') {
        position = list.length;
    } else if (position == 'random') {
        position = Math.round(Math.random() * list.length);
    } else {
        position = parseInt(position, 10) - 1;
    }
    if (position > list.length) return;

    list.splice(position, 0, newItem);
};

VarListPrims.prototype.primListSetLine = function(b) {
    var list = findList(interp.targetSprite(), interp.arg(b, 1));
    if (!list) return;
    var newItem = interp.arg(b, 2);
    var position = interp.arg(b, 0);

    if (position == 'last') {
        position = list.length - 1;
    } else if (position == 'random') {
        position = Math.floor(Math.random() * list.length);
    } else {
        position = parseInt(position, 10) - 1;
    }

    if (position > list.length - 1) return;
    list[position] = newItem;
};

VarListPrims.prototype.primListLength = function(b) {
    var list = findList(interp.targetSprite(), interp.arg(b, 0));
    if (!list) return 0;
    return list.length;
};

VarListPrims.prototype.primListGetLine = function(b) {
    var list = findList(interp.targetSprite(), interp.arg(b, 1));
    if (!list) return 0;
    var line = interp.arg(b, 0);
    if (list.length == 0) return 0;
    if (line == 'random') line = Math.round(Math.random() * list.length);
    else if (line == 'last') line = list.length;
    else if (list.length < line) return 0;
    return list[line - 1];
};

VarListPrims.prototype.primListContains = function(b) {
    var list = findList(interp.targetSprite(), interp.arg(b, 0));
    if (!list) return 0;
    var searchItem = interp.arg(b, 1);
    if (parseFloat(searchItem) == searchItem) searchItem = parseFloat(searchItem);
    return $.inArray(searchItem, list) > -1;
};

VarListPrims.prototype.primHideList = function(b) {
    var targetList = interp.arg(b, 0), targetSprite = interp.targetSprite().objName;
    for (var r = 0; r < runtime.reporters.length; r++) {
        if (runtime.reporters[r] instanceof List && runtime.reporters[r].listName == targetList && (runtime.reporters[r].target == targetSprite || runtime.reporters[r].target == 'Stage')) {
            runtime.reporters[r].visible = false;
            return;
        }
    }
};

VarListPrims.prototype.primShowList = function(b) {
    var targetList = interp.arg(b, 0), targetSprite = interp.targetSprite().objName;
    for (var r = 0; r < runtime.reporters.length; r++) {
        if (runtime.reporters[r] instanceof List && runtime.reporters[r].listName == targetList && (runtime.reporters[r].target == targetSprite || runtime.reporters[r].target == 'Stage')) {
            runtime.reporters[r].visible = true;
            return;
        }
    }
};
