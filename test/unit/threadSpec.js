/* jasmine specs for Interpreter.js -> Thread go here */

describe('Thread', function() {
    var thread;

    beforeEach(function() {
        thread = Thread;
    });

    describe('Initialized variables', function() {
        var initThread;
        beforeEach(function() {
            initThread = new thread('block', 'target');
        });

        describe('Thread Variables', function() {
            it('should have a nextBlock variable', function() {
                expect(initThread.nextBlock).toBe('block');
            });

            it('should have a firstBlock variable', function() {
                expect(initThread.firstBlock).toBe('block');
            });

            it('should have a stack variable', function() {
                expect(initThread.stack).toEqual([]);
            });

            it('should have a target variable', function() {
                expect(initThread.target).toBe('target');
            });

            it('should have a tmp variable', function() {
                expect(initThread.tmp).toBe(null);
            });

            it('should have a tmpObj variable', function() {
                expect(initThread.tmpObj).toEqual([]);
            });

            it('should have a firstTime variable', function() {
                expect(initThread.firstTime).toBe(true);
            });

            it('should have a paused variable', function() {
                expect(initThread.paused).toBe(false);
            });
        });
    });
});
