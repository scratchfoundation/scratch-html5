/* jasmine specs for Interpreter.js go here */

describe('Interpreter', function() {
    var interp;

    beforeEach(function() {
      interp = Interpreter;
    });

    describe('Initialized variables', function() {
        var initInterp, realThread, realTimer;
        beforeEach(function() {
            realThread = Thread;
            realTimer = Timer;
            Thread = threadMock;
            Timer = function() {};
            initInterp = new interp();
        });

        afterEach(function() {
            Thread = realThread;
            Timer = realTimer;
        });

        describe('Interpreter Variables', function() {
            it('should have a primitiveTable collection', function() {
                expect(initInterp.primitiveTable).toEqual({});
            });

            it('should have a variables collection', function() {
                expect(initInterp.variables).toEqual({});
            });

            it('should have a threads array', function() {
                expect(initInterp.threads).toEqual([]);
            });

            it('should have an activeThread variable', function() {
                expect(initInterp.activeThread).toEqual(threadMock());
            });

            it('should have a WorkTime variable', function() {
                expect(initInterp.WorkTime).toBe(30);
            });

            it('should have a currentMSecs variable', function() {
                expect(initInterp.currentMSecs).toBe(null);
            });

            it('should have a timer variable', function() {
                expect(initInterp.timer).toEqual({});
            });

            it('should have a yield variable', function() {
                expect(initInterp.yield).toBe(false);
            });

            it('should have a doRedraw variable', function() {
                expect(initInterp.doRedraw).toBe(false);
            });

            it('should have an opCount variable', function() {
                expect(initInterp.opCount).toBe(0);
            });

            it('should have a debugOps variable', function() {
                expect(initInterp.debugOps).toBe(false);
            });

            it('should have a debugFunc variable', function() {
                expect(initInterp.debugFunc).toBe(null);
            });

            it('should have an opCount2 variable', function() {
                expect(initInterp.opCount2).toBe(0);
            });
        });
=======

    describe('Interpreter Variables', function() {
      it('should have a primitiveTable collection', function() {
        expect(initInterp.primitiveTable).toEqual({});
      });

      it('should have a variables collection', function() {
        expect(initInterp.variables).toEqual({});
      });

      it('should have a threads array', function() {
        expect(initInterp.threads).toEqual([]);
      });

      it('should have an activeThread variable', function() {
        expect(initInterp.activeThread).toEqual(threadMock());
      });

      it('should have a WorkTime variable', function() {
        expect(initInterp.WorkTime).toBe(30);
      });

      it('should have a currentMSecs variable', function() {
        expect(initInterp.currentMSecs).toBe(null);
      });

      it('should have a timer variable', function() {
        expect(initInterp.timer).toEqual({});
      });

      it('should have a yield variable', function() {
        expect(initInterp.yield).toBe(false);
      });

      it('should have a doRedraw variable', function() {
        expect(initInterp.doRedraw).toBe(false);
      });

      it('should have an opCount variable', function() {
        expect(initInterp.opCount).toBe(0);
      });

      it('should have a debugOps variable', function() {
        expect(initInterp.debugOps).toBe(false);
      });

      it('should have a debugFunc variable', function() {
        expect(initInterp.debugFunc).toBe(null);
      });

      it('should have an opCount2 variable', function() {
        expect(initInterp.opCount2).toBe(0);
      });
    });

    describe('TargetStage', function() {
        it('should return the target.stage object', function() {
            runtime = new runtimeMock();
            expect(interp.prototype.targetStage()).toEqual(runtime.stage);
        });
    });
  });

    describe('Pause and Resume Single Threads', function() {
        var initInterp;

        beforeEach(function() {
            initInterp = new interp();
        });

        it('should pause the current activeThread', function() {
            initInterp.pauseThread();
            expect(initInterp.activeThread.paused).toEqual(true);
        });

        it('should resume the current activeThread', function() {
            initInterp.resumeThread();
            expect(initInterp.activeThread.paused).toEqual(false);
        });
    });

    describe('Pause and Resume All Threads', function() {
        var initInterp;

        beforeEach(function() {
            initInterp = new interp();
            initInterp.threads.push(new threadMock());
            initInterp.threads.push(new threadMock());
        });

        it('should pause the current activeThread', function() {
            initInterp.pauseAllThreads();
            _.each(initInterp.threads, function(thread) {
                expect(thread.paused).toEqual(true);
            });
            expect(initInterp.threads.length).toBe(2);
        });

        it('should resume the current activeThread', function() {
            initInterp.resumeAllThreads();
            _.each(initInterp.threads, function(thread) {
                expect(thread.paused).toEqual(false);
            });
            expect(initInterp.threads.length).toBe(2);
        });
    });
});
