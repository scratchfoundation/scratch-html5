/* jasmine specs for Interpreter.js -> Thread go here */

var Interpreter = require('../../js/Interpreter');

describe('Thread', function() {

    describe('Initialized variables', function() {
        var thread;
        beforeEach(function() {
            thread = new Interpreter.Thread('block', 'target');
        });

        describe('Thread Variables', function() {
            it('should have a nextBlock variable', function() {
                expect(thread.nextBlock).toBe('block');
            });

            it('should have a firstBlock variable', function() {
                expect(thread.firstBlock).toBe('block');
            });

            it('should have a stack variable', function() {
                expect(thread.stack).toEqual([]);
            });

            it('should have a target variable', function() {
                expect(thread.target).toBe('target');
            });

            it('should have a tmp variable', function() {
                expect(thread.tmp).toBe(null);
            });

            it('should have a tmpObj variable', function() {
                expect(thread.tmpObj).toEqual([]);
            });

            it('should have a firstTime variable', function() {
                expect(thread.firstTime).toBe(true);
            });

            it('should have a paused variable', function() {
                expect(thread.paused).toBe(false);
            });
        });
    });
});
