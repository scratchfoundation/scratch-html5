/* jasmine specs for primitives/LooksPrims.js go here */

var LooksPrims = require('../../js/primitives/LooksPrims'),
    Interpreter = require('../../js/Interpreter'),
    IO = require('../../js/IO'),
    Sprite = require('../../js/Sprite');

describe('LooksPrims', function() {

    var looksPrims;
    beforeEach(function() {
        looksPrims = new LooksPrims();
        global.interp = new Interpreter();
        global.io = new IO();
    });

    describe('showBubble', function() {

        var targetSprite, someText;
        beforeEach(function() {
            targetSprite = new Sprite({});
            someText = 'some text';

            spyOn(interp, 'targetSprite').andReturn(targetSprite);
            spyOn(interp, 'arg').andReturn(someText);
            spyOn(targetSprite, 'showBubble');
        });


        it('should call the showBubble method on the targetedSprite for say', function() {
            var sayBlock = {'args': [someText]};

            looksPrims.showBubble("say", sayBlock);

            expect(interp.arg).toHaveBeenCalledWith(sayBlock, 0);
            expect(targetSprite.showBubble).toHaveBeenCalledWith(someText, 'say');
        });

        it('should call the showBubble method on the targetedSprite for think', function() {
            var thinkBlock = {'args': [someText]};

            looksPrims.showBubble("think", thinkBlock);

            expect(interp.arg).toHaveBeenCalledWith(thinkBlock, 0);
            expect(targetSprite.showBubble).toHaveBeenCalledWith(someText, 'think');
        });

        it('should call the showBubble method on the targetedSprite for ask', function() {
            var askBlock = {'args': [someText]};

            looksPrims.showBubble("ask", askBlock);

            expect(interp.arg).toHaveBeenCalledWith(askBlock, 0);
            expect(targetSprite.showBubble).toHaveBeenCalledWith(someText, 'ask');
        });
    });
});
