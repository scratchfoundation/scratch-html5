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
// Primitives.js
// Tim Mickel, July 2011

// Provides the basic primitives for the interpreter and loads in the more
// complicated primitives, e.g. MotionAndPenPrims.

'use strict';

var Primitives = function() {}

Primitives.prototype.addPrimsTo = function(primTable) {
    // Math primitives
    primTable["+"]        = function(b) { return interp.arg(b, 0) + interp.arg(b, 1) };
    primTable["-"]        = function(b) { return interp.arg(b, 0) - interp.arg(b, 1) };
    primTable["*"]        = function(b) { return interp.arg(b, 0) * interp.arg(b, 1) };
    primTable["/"]        = function(b) { return interp.arg(b, 0) / interp.arg(b, 1) };
    primTable["%"]        = function(b) { return interp.arg(b, 0) % interp.arg(b, 1) };
    primTable["randomFrom:to:"] = this.primRandom;
    primTable["<"]        = function(b) { return (interp.arg(b, 0) < interp.arg(b, 1)) };
    primTable["="]        = function(b) { return (interp.arg(b, 0) == interp.arg(b, 1)) };
    primTable[">"]        = function(b) { return (interp.arg(b, 0) > interp.arg(b, 1)) };
    primTable["&"]        = function(b) { return interp.arg(b, 0) && interp.arg(b, 1) };
    primTable["|"]        = function(b) { return interp.arg(b, 0) || interp.arg(b, 1) };
    primTable["not"]      = function(b) { return !interp.arg(b, 0) };
    primTable["abs"]      = function(b) { return Math.abs(interp.arg(b, 0)) };
    primTable["sqrt"]     = function(b) { return Math.sqrt(interp.arg(b, 0)) };

    primTable["\\\\"]               = this.primModulo;
    primTable["rounded"]            = function(b) { return Math.round(interp.arg(b, 0)) };
    primTable["computeFunction:of:"] = this.primMathFunction;
    
    // String primitives
    primTable["concatenate:with:"]  = function(b) { return "" + interp.arg(b, 0) + interp.arg(b, 1) };
    primTable["letter:of:"]         = this.primLetterOf;
    primTable["stringLength:"]      = function(b) { return interp.arg(b, 0).length };
    
	// procedures
	primTable["procDef"] = this.primProcDef;
	primTable["getParam"] = this.primGetParam;
	primTable["call"] = this.primCall;
	
    new VarListPrims().addPrimsTo(primTable);
    new MotionAndPenPrims().addPrimsTo(primTable);
    new LooksPrims().addPrimsTo(primTable);
    new SensingPrims().addPrimsTo(primTable);
    new SoundPrims().addPrimsTo(primTable);
}
  
Primitives.prototype.primRandom = function(b) {
    var n1 = interp.arg(b, 0);
    var n2 = interp.arg(b, 1);
    var low = (n1 <= n2) ? n1 : n2;
    var hi = (n1 <= n2) ? n2 : n1;
    if(low == hi) return low;
    // if both low and hi are ints, truncate the result to an int
    if ((Math.floor(low) == low) && (Math.floor(hi) == hi)) {
        return low + Math.floor(Math.random() * ((hi + 1) - low));
    }
    return (Math.random() * (hi - low)) + low;
}
  
Primitives.prototype.primLetterOf = function(b) {
    var s = interp.arg(b, 1);
    var i = interp.arg(b, 0) - 1;
    if ((i < 0) || (i >= s.length)) return "";
    return s.charAt(i);
}
  
Primitives.prototype.primModulo = function(b) {
    var modulus = interp.arg(b, 1);
    var n = interp.arg(b, 0) % modulus;
    if (n < 0) n += modulus;
    return n;
}

Primitives.prototype.primMathFunction = function(b) {
    var op = interp.arg(b, 0);
    var n = interp.arg(b, 1);
    switch(op) {
        case "abs": return Math.abs(n);
        case "sqrt": return Math.sqrt(n);
        case "sin": return Math.sin((Math.PI * n) / 180);
        case "cos": return Math.cos((Math.PI * n) / 180);
        case "tan": return Math.tan((Math.PI * n) / 180);
        case "asin": return (Math.asin(n) * 180) / Math.PI;
        case "acos": return (Math.acos(n) * 180) / Math.PI;
        case "atan": return (Math.atan(n) * 180) / Math.PI;
        case "ln": return Math.log(n);
        case "log": return Math.log(n) / Math.LN10; 
        case "e ^": return Math.exp(n);
        case "10 ^": return Math.exp(n * Math.LN10);
    }
    return 0;
}

Primitives.prototype.primProcDef = function(b){
	// no op
};

Primitives.prototype.primGetParam = function(b){
	return interp.activeThread.procedureArgs[b.args[0]];
};

Primitives.prototype.primCall = function(b){
	interp.activeThread.stack.push(interp.activeThread.nextBlock); // flow control
	interp.activeThread.nextBlock = interp.targetSprite().procedures[b.args[0]]; // jump
		
	// push args
	var hat = interp.activeThread.nextBlock;
	var argBlocks = hat.args.slice(1);
	var argKeys = [];
	var i = 0;
	while(i < argBlocks.length){
		if(argBlocks[i].op)
			argKeys.push(argBlocks[i].op);
		++i;
	}
	var argValues = b.args.slice(1);
	
	interp.activeThread.procedureArgs = {}; // clear old data
	i = 0;
	while(i < argKeys.length){
		interp.activeThread.procedureArgs[argKeys[i]] = argValues[i];
		++i;
	}
};

