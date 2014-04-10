/* jasmine specs for primitives/SensingPrims.js go here */

describe('SensingPrims', function() {
    var sensingPrims;
    beforeEach(function() {
        sensingPrims = SensingPrims;
        realDate = Date;
    });

    afterEach(function() {
        Date = realDate;
    });

    describe('primTimestamp', function() {
        beforeEach(function() {
            /* MonkeyPatching the built-in Javascript Date */
            var epochDate = new Date(2000, 0, 1);
            var nowDate = new Date(2014, 5, 16);
            Date = function() {
                return (arguments.length ? epochDate : nowDate);
            };
        });

        it('should return the days since 2000', function() {
            expect(sensingPrims.prototype.primTimestamp()).toBeCloseTo(5280);
        });
    });

    describe('primTimeDate', function() {
        beforeEach(function() {
            /* MonkeyPatching the built-in Javascript Date */
            Date = function() {
                return {
                    'getFullYear': function() { return 2014;},
                    'getMonth': function() { return 4;},
                    'getDate': function() { return 16;},
                    'getDay': function() { return 4;},
                    'getHours': function() { return 9;},
                    'getMinutes': function() { return 18;},
                    'getSeconds': function() { return 36;},
                    'getTime': function() {}
                };
            };
        });

        it('should return the year', function() {
            var block = {'args': ['year']};
            expect(sensingPrims.prototype.primTimeDate(block)).toEqual(2014);
        });

        it('should return the month of the year', function() {
            var block = {'args': ['month']};
            expect(sensingPrims.prototype.primTimeDate(block)).toEqual(5);
        });

        it('should return the day of the week', function() {
            var block = {'args': ['day of week']};
            expect(sensingPrims.prototype.primTimeDate(block)).toEqual(5);
        });

        it('should return the hour of the day', function() {
            var block = {'args': ['hour']};
            expect(sensingPrims.prototype.primTimeDate(block)).toEqual(9);
        });

        it('should return the minute of the hour', function() {
            var block = {'args': ['minute']};
            expect(sensingPrims.prototype.primTimeDate(block)).toEqual(18);
        });

        it('should return the second of the minute', function() {
            var block = {'args': ['second']};
            expect(sensingPrims.prototype.primTimeDate(block)).toEqual(36);
        });

        it('should return the 0 on year', function() {
            var block = {'args': ['anythingElse']};
            expect(sensingPrims.prototype.primTimeDate(block)).toEqual(0);
        });
    });

    describe('primAnswer', function() {
        beforeEach(function() {
            interp = interpreterMock({'targetSprite': new targetMock()});
        });

        it('should return the answer variable from the targetedSprite', function() {
            expect(sensingPrims.prototype.primAnswer()).toBe(12);
        });
    });

    describe('primDoAsk', function() {
        var askBlock, targetSpriteMock;
        beforeEach(function() {
            targetSpriteMock = targetMock();
            askBlock = {'args': 'what to ask'};
            interp = interpreterMock({'targetSprite': targetSpriteMock}, {'arg': askBlock});
        });

        it('should call the showBubble method on the targetedSprite', function() {
            spyOn(window, "showBubble");
            spyOn(targetSpriteMock, "showAsk");
            sensingPrims.prototype.primDoAsk(askBlock);
            expect(window.showBubble).toHaveBeenCalledWith({args:'what to ask'}, 'doAsk');
            expect(targetSpriteMock.showAsk).toHaveBeenCalled;
            expect(interp.activeThread.paused).toBe(true);
        });
    });
});
