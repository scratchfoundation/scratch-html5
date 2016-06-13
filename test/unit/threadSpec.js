/* jasmine specs for Interpreter.js -> Thread go here */

describe('Thread', function() {
    var thread;

    beforeEach(function() {
        thread = Thread;
        io = new ioMock();
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

    describe('Test execution of threads', function() {
        var initInterp, task;

        beforeEach(function() {
            interp = new Interpreter();
            interp.initPrims();
        });

        it('One thread gets executed eventually', function() {
            var isThreadExecuted = false;
            interp.primitiveTable['mocktask'] = function() {
                isThreadExecuted = true;
            };
            var runblock = new Block(['mocktask'], null);

            interp.startThread(runblock, new Sprite({}));
            interp.stepThreads();

            expect(isThreadExecuted).toBe(true);
        });

        it('Every thread gets executed eventually', function() {
            var isThread1Executed = false;
            var isThread2Executed = false;
            interp.primitiveTable['mocktask1'] = function() {
                isThread1Executed = true;
            };
            interp.primitiveTable['mocktask2'] = function() {
                isThread2Executed = true;
            };
            var runblock1 = new Block(['mocktask1'], null);
            var runblock2 = new Block(['mocktask2'], null);
            interp.startThread(runblock1, new Sprite({}));
            interp.startThread(runblock2, new Sprite({}));

            interp.stepThreads();

            expect(isThread1Executed).toBe(true);
            expect(isThread2Executed).toBe(true);
        });

        it('stepActiveThread should execute only the active thread', function() {
            var isThread1Executed = false;
            var isThread2Executed = false;
            interp.primitiveTable['mocktask1'] = function() {
                isThread1Executed = true;
            };
            interp.primitiveTable['mocktask2'] = function() {
                isThread2Executed = true;
            };
            var runblock1 = new Block(['mocktask1'], null);
            var runblock2 = new Block(['mocktask2'], null);
            interp.startThread(runblock1, new Sprite({}));
            interp.startThread(runblock2, new Sprite({}));

            interp.stepActiveThread();

            expect(isThread1Executed).toBe(false);
            expect(isThread2Executed).toBe(true);
        });
    });
});
