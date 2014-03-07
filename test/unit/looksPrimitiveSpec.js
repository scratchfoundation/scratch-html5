/* jasmine specs for primitives/LooksPrims.js go here */

describe ('LooksPrims', function() {
  var looksPrims;
  beforeEach(function() {
    looksPrims = LooksPrims;
  });

  describe('showBubble', function(){
    var sayBlock, targetSpriteMock;
    beforeEach(function() {
      sayBlock = {'args': ['what to say']};
      targetSpriteMock = targetMock();
      interp = interpreterMock({'targetSprite': targetSpriteMock }, {'arg': sayBlock});

    });
    it('should return do something', function() {
      spyOn(targetSpriteMock, "showBubble");
      showBubble(sayBlock, "say");
      expect(targetSpriteMock.showBubble).toHaveBeenCalled;
    });
  });
});
