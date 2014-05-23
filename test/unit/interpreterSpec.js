/* jasmine specs for Interpreter.js go here */

var Interpreter = require('../../js/Interpreter'),
    Runtime = require('../../js/Runtime'),
    Timer = require('../../js/util/Timer');

describe('Interpreter', function() {

    var interp;
    beforeEach(function() {
        interp = new Interpreter();
        global.runtime = new Runtime();
    });

    describe('Initialized variables', function() {

        describe('Interpreter Variables', function() {
            it('should have a primitiveTable collection', function() {
                expect(interp.primitiveTable).toEqual({});
            });

            it('should have a variables collection', function() {
                expect(interp.variables).toEqual({});
            });

            it('should have a threads array', function() {
                expect(interp.threads).toEqual([]);
            });

            it('should have an activeThread variable', function() {
                expect(interp.activeThread).toEqual(new Interpreter.Thread(null));
            });

            it('should have a WorkTime variable', function() {
                expect(interp.WorkTime).toBe(30);
            });

            it('should have a currentMSecs variable', function() {
                expect(interp.currentMSecs).toBe(null);
            });

            it('should have a timer variable', function() {
                expect(interp.timer).toEqual(new Timer());
            });

            it('should have a yield variable', function() {
                expect(interp.yield).toBe(false);
            });

            it('should have a doRedraw variable', function() {
                expect(interp.doRedraw).toBe(false);
            });

            it('should have an opCount variable', function() {
                expect(interp.opCount).toBe(0);
            });

            it('should have a debugOps variable', function() {
                expect(interp.debugOps).toBe(false);
            });

            it('should have a debugFunc variable', function() {
                expect(interp.debugFunc).toBe(null);
            });

            it('should have an opCount2 variable', function() {
                expect(interp.opCount2).toBe(0);
            });
        });
    });

    describe('TargetStage', function() {
        it('should return the target.stage object', function() {
            expect(interp.targetStage()).toEqual(runtime.stage);
        });
    });
});
