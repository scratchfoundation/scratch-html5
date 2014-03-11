'use strict';

var interpreterMock = function() {
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
    'targetSprite' : function() { return getArgs('targetSprite'); },
    'arg': function(block, index) { return getArgs('arg');},
    'activeThread': new threadMock(),
    'targetStage': function() { var rtMock = new runtimeMock(); return rtMock.stage}
  }
};
