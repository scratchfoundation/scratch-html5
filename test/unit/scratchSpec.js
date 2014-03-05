/* jasmine specs for Scratch.js go here */

describe ('Scratch', function() {
    describe('Scratch - Load Project', function(){
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

    describe('Scratch - Click Green Flag', function(){
      beforeEach(function() {
        setFixtures('<button id=trigger-green-flag tabindex=2></button><div id="overlay"></div>');
        scratch = Scratch;
        scratch(project_id);
      });

      it('should not click on the green flag if the project is loading', function() {
        runtime.projectLoaded = false;
        spyOn(runtime, 'greenFlag');
        $('#trigger-green-flag').click();
        expect(runtime.greenFlag).not.toHaveBeenCalled();
        expect($('#overlay').css('display')).toBe('block');
      });

      it('should click on the green flag if the project is loaded', function() {
        runtime.projectLoaded = true;
        spyOn(runtime, 'greenFlag');
        $('#trigger-green-flag').click();
        expect(runtime.greenFlag).toHaveBeenCalled();
        expect($('#overlay').css('display')).toBe('none');
      });
    });

    describe('Scratch - Click Stop', function(){
      beforeEach(function() {
        setFixtures('<button id=trigger-stop tabindex=3></button>');
        scratch = Scratch;
        scratch(project_id);
      });

      it('should not click on the green flag if the project is loading', function() {
        spyOn(runtime, 'stopAll');
        $('#trigger-stop').click();
        expect(runtime.stopAll).toHaveBeenCalled();
      });
    });
});
