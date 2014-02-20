'use strict';

/* jasmine specs for Scratch.js go here */

describe('Scratch', function(){
  var getScript, request, scratch;
  var uri = "http://getScript.example.com";
  var callBack = jasmine.createSpy('onSuccess');
  var testResponseText = 'This is a script';

  var TestResponses = { status: 200, responseText: returnData};

  beforeEach(function() {
    jasmine.Ajax.useMock();
    scratch = Scratch;
    scratch(project_id);
    request = mostRecentAjaxRequest();
    request.promise(TestResponses, callBack);
  });

  it('should call the internalapi project', function() {
    expect(request.url).toBe("proxy.php?resource=internalapi/project/" + project_id + "/get/");
    expect(callBack).toHaveBeenCalled();
  });
});
