'use strict';

var spriteMock = function() {
  var args = createArgs(arguments);

  function getArgs(argKey) {
    return ((argKey in args) ? args[argKey] : null);
  }

  function createArgs(methodArgs) {
    var args = {};
    if (methodArgs.length) {
      _.each(methodArgs, function(newObject) {
        _.each(newObject, function(value, key) {
          args[key] = value;
        });
      });
    }
    return args;
  }

  return {
    'hideBubble' : function() { return getArgs('hideBubble'); },
    'hideAsk': function() { return getArgs('hideAsk');},
    'resetFilters': function() { return getArgs('resetFilters');}
  }
};
