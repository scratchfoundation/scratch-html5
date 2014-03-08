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
      expect(targetSpriteMock.showBubble).toHaveBeenCalled;
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
      expect(targetSpriteMock.showBubble).toHaveBeenCalled;
    });
  });


  describe('showBubble for Ask', function(){
    var askBlock;
    beforeEach(function() {
      askBlock = {'args': 'what to ask'};
      interp = interpreterMock({'targetSprite': targetSpriteMock }, {'arg': askBlock});

    });

    it('should call the showBubble method on the targetedSprite', function() {
      spyOn(targetSpriteMock, "showBubble");
      spyOn(targetSpriteMock, "showAsk");
      looksPrims.prototype.primDoAsk(askBlock);
      expect(targetSpriteMock.showBubble).toHaveBeenCalled;
      expect(targetSpriteMock.showAsk).toHaveBeenCalled;
    });
  });

  describe('primAnswer', function(){
    beforeEach(function() {
      interp = interpreterMock({'targetSprite': targetSpriteMock });
    });

    it('should return the answer variable from the targetedSprite', function() {
      expect(looksPrims.prototype.primAnswer()).toBe(22);
    });
  });
});
