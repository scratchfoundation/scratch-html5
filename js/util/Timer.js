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

/*
*  Timer for the interpeter and performance testing
*  Tim Mickel, July 2011
*/
var Timer = function() {
    var trials = [];
    var last_trial = 0;
    var start_time = 0;
};

Timer.prototype.time = function() {
    return Date.now();
};

Timer.prototype.start = function() {
    start_time = this.time();
};

Timer.prototype.stop = function() {
    end = this.time();
    last_trial = end - start_time;
    trials.push(last_trial);
};

Timer.prototype.count = function() {
    return trials.length;
};

Timer.prototype.average = function() {
    sum = 0;
    for (i = 0; i < this.count(); i++) {
        sum += trials[i];
    }
    return sum / this.count();
};

Timer.prototype.print = function(element) {
    text = "Trial: " + last_trial + "ms" +
           "<br />\nTrials: " + this.count() + ", Avg: " + this.average() + "ms";
    if (element) {
        $(element).html(text);
    } else {
        console.log(text);
    }
};
