/* jasmine specs for Runtime.js go here */

describe('Runtime', function() {
    var runtimeObj;

    beforeEach(function() {
        runtimeObj = Runtime;
    });

    describe('Initialized variables', function() {
        var initRuntime, lineCanvas;
        beforeEach(function() {
            initRuntime = new runtimeObj();
        });

        describe('Runtime Variables', function() {
            it('should have a scene variable', function() {
                expect(initRuntime.scene).toBe(null);
            });

            it('should have a sprites array', function() {
                expect(initRuntime.sprites).toEqual([]);
            });

            it('should have a reporters array', function() {
                expect(initRuntime.reporters).toEqual([]);
            });

            it('should have a keysDown array', function() {
                expect(initRuntime.keysDown).toEqual([]);
            });

            it('should have a mouseDown variable', function() {
                expect(initRuntime.mouseDown).toBe(false);
            });

            it('should have a mousePos array', function() {
                expect(initRuntime.mousePos).toEqual([0,0]);
            });

            it('should have an audioContext variable', function() {
                expect(initRuntime.audioContext).toBe(null);
            });

            it('should have an audoGain variable', function() {
                expect(initRuntime.audioGain).toBe(null);
            });

            it('should have an audioPlaying array', function() {
                expect(initRuntime.audioPlaying).toEqual([]);
            });

            it('should have a notesPlaying array', function() {
                expect(initRuntime.notesPlaying).toEqual([]);
            });

            it('should have a projectLoaded variable', function() {
                expect(initRuntime.projectLoaded).toBe(false);
            });
        });
    });

    describe('Stop All', function() {
        var realThread;
        beforeEach(function() {
            runtime = new runtimeMock
            spyOn(window, "stopAllSounds");
            spyOn(runtime.stage, "resetFilters");
            spyOn(runtime.sprites[0], "hideBubble");
            spyOn(runtime.sprites[0], "resetFilters");
            spyOn(runtime.sprites[0], "hideAsk");
            realThread = Thread;
            Thread = threadMock;
            interp = new interpreterMock();
        });

        afterEach(function() {
            Thread = realThread;
        });

        it('should call a new Thread Object', function() {
            runtimeObj.prototype.stopAll();
            expect(interp.activeThread).toEqual(new threadMock());
        });

        it('should intitialize an empty threads array', function() {
            runtimeObj.prototype.stopAll();
            expect(interp.threads).toEqual([]);
        });

        it('should call stopAllSounds', function() {
            runtimeObj.prototype.stopAll();
            expect(window.stopAllSounds).toHaveBeenCalled();
        });

        it('should call sprites.hideBubble', function() {
            runtimeObj.prototype.stopAll();
            expect(runtime.sprites[0].hideBubble).toHaveBeenCalled();
        });

        it('should call sprites.resetFilters', function() {
            runtimeObj.prototype.stopAll();
            expect(runtime.sprites[0].resetFilters).toHaveBeenCalled();
        });

        it('should call sprites.hideAsk', function() {
            runtimeObj.prototype.stopAll();
            expect(runtime.sprites[0].hideAsk).toHaveBeenCalled();
        });

    });

});
