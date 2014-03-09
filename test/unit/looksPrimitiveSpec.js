/* jasmine specs for primitives/LooksPrims.js go here */

describe ('LooksPrims', function() {
  var looksPrims, targetSpriteMock;
  beforeEach(function() {
    looksPrims = LooksPrims;
    targetSpriteMock = targetMock();
  });

  describe('showBubble for Say', function(){
    var sayBlock;
    beforeEach(function() {
      sayBlock = {'args': ['what to say']};
      interp = interpreterMock({'targetSprite': targetSpriteMock }, {'arg': sayBlock});
    });

    it('should call the showBubble method on the targetedSprite', function() {
      spyOn(targetSpriteMock, "showBubble");
      showBubble(sayBlock, "say");
      expect(targetSpriteMock.showBubble).toHaveBeenCalledWith({args:['what to say']}, 'say');
    });
  });

  describe('showBubble for Think', function(){
    var thinkBlock;
    beforeEach(function() {
      thinkBlock = {'args': ['what to think']};
      interp = interpreterMock({'targetSprite': targetSpriteMock }, {'arg': thinkBlock});
    });

    it('should call the showBubble method on the targetedSprite', function() {
      spyOn(targetSpriteMock, "showBubble");
      showBubble(thinkBlock, "think");
      expect(targetSpriteMock.showBubble).toHaveBeenCalledWith({args:['what to think']}, 'think');
    });
  });

  describe('showBubble for Ask', function(){
    var askBlock;
    beforeEach(function() {
      askBlock = {'args': ['what to ask']};
      interp = interpreterMock({'targetSprite': targetSpriteMock }, {'arg': askBlock});
    });

    it('should call the showBubble method on the targetedSprite', function() {
      spyOn(targetSpriteMock, "showBubble");
      showBubble(askBlock, "ask");
      expect(targetSpriteMock.showBubble).toHaveBeenCalledWith({args:['what to ask']}, 'ask');
    });
  });
});
