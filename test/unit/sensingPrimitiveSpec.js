/* jasmine specs for primitives/SensingPrims.js go here */

var SensingPrims = require('../../js/primitives/SensingPrims'),
    Interpreter = require('../../js/Interpreter'),
    IO = require('../../js/IO'),
    Timer = require('../../js/util/Timer'),
    Sprite = require('../../js/Sprite'),
    LooksPrims = require('../../js/primitives/LooksPrims');

describe('SensingPrims', function() {

    var sensingPrims;
    beforeEach(function() {
        sensingPrims = new SensingPrims();
        global.interp = new Interpreter();
        global.io = new IO();
    });

    describe('primTimestamp', function() {

        beforeEach(function() {
            spyOn(Timer, 'now').andReturn(new Date(2014, 5, 16));
        });

        it('should return the days since 2000', function() {
            expect(sensingPrims.primTimestamp()).toBeCloseTo(5280);
        });
    });

    describe('primTimeDate', function() {
        beforeEach(function() {
            spyOn(Timer, 'now').andReturn(new Date(2014, 4, 16, 9, 18, 36));
        });

        it('should return the year', function() {
            var block = {'args': ['year']};
            expect(sensingPrims.primTimeDate(block)).toEqual(2014);
        });

        it('should return the month of the year', function() {
            var block = {'args': ['month']};
            expect(sensingPrims.primTimeDate(block)).toEqual(5);
        });

        it('should return the day of the week', function() {
            var block = {'args': ['day of week']};
            expect(sensingPrims.primTimeDate(block)).toEqual(5);
        });

        it('should return the hour of the day', function() {
            var block = {'args': ['hour']};
            expect(sensingPrims.primTimeDate(block)).toEqual(9);
        });

        it('should return the minute of the hour', function() {
            var block = {'args': ['minute']};
            expect(sensingPrims.primTimeDate(block)).toEqual(18);
        });

        it('should return the second of the minute', function() {
            var block = {'args': ['second']};
            expect(sensingPrims.primTimeDate(block)).toEqual(36);
        });

        it('should return the 0 on year', function() {
            var block = {'args': ['anythingElse']};
            expect(sensingPrims.primTimeDate(block)).toEqual(0);
        });
    });

    describe('primAnswer', function() {
        it('should return the answer variable from the targetedSprite', function() {
            spyOn(interp, 'targetStage').andReturn({ askAnswer: 12 });
            expect(sensingPrims.primAnswer()).toBe(12);
        });
    });

    describe('primDoAsk', function() {

        var targetSprite, askBlock;
        beforeEach(function() {
            targetSprite = new Sprite({});
            askBlock = {'args': 'what to ask'};
        });

        it('should call the showBubble method on the targetedSprite', function() {
            spyOn(LooksPrims.prototype, 'showBubble').andReturn();
            spyOn(interp, 'targetSprite').andReturn(targetSprite);
            spyOn(targetSprite, "showAsk").andReturn();

            sensingPrims.primDoAsk(askBlock);

            expect(targetSprite.showAsk).toHaveBeenCalled();
            expect(interp.activeThread.paused).toBe(true);
        });
    });
});
