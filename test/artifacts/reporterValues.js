'use Strict;'

var ReporterValues = function() {
  return {
    'getStageVariables': function() {
      return {
        'cmd' : "getVar:",
        'color' : 15629590,
        'isDiscrete' :  true,
        'mode' : 1,
        'param' : "myAnswer",
        'sliderMax' : 100,
        'sliderMin' : 0,
        'target' : "Stage",
        'visible' : true,
        'x' : 5,
        'y' : 5,
      };
    }
  }
};
/*
Additional Reporter examples
cmd : "getVar:"
color : 15629590
isDiscrete : true
mode : 1
param : "myAnswer2"
sliderMax : 100
sliderMin : 0
target : "Sprite1"
visible : true
x : 5
y : 32
  
cmd : "getVar:"
color : 15629590
isDiscrete : true
mode : 1
param : "answer"
sliderMax : 100
sliderMin : 0
target : "Sprite1"
visible : true
x : 5
y : 59
*/
