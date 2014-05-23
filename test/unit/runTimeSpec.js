/* jasmine specs for Runtime.js go here */

var Interpreter = require('../../js/Interpreter'),
    Runtime = require('../../js/Runtime'),
    SoundPrims = require('../../js/primitives/SoundPrims'),
    Stage = require('../../js/Stage'),
    Sprite = require('../../js/Sprite'),
    IO = require('../../js/IO');

describe('Runtime', function() {

    beforeEach(function() {
        global.io = new IO();
        global.interp = new Interpreter();
        global.runtime = new Runtime();
    });

    describe('Initialized variables', function() {

        it('should have a scene variable', function() {
            expect(runtime.scene).toBe(null);
        });

        it('should have a sprites array', function() {
            expect(runtime.sprites).toEqual([]);
        });

        it('should have a reporters array', function() {
            expect(runtime.reporters).toEqual([]);
        });

        it('should have a keysDown array', function() {
            expect(runtime.keysDown).toEqual([]);
        });

        it('should have a mouseDown variable', function() {
            expect(runtime.mouseDown).toBe(false);
        });

        it('should have a mousePos array', function() {
            expect(runtime.mousePos).toEqual([0,0]);
        });

        it('should have an audioContext variable', function() {
            expect(runtime.audioContext).toBe(null);
        });

        it('should have an audoGain variable', function() {
            expect(runtime.audioGain).toBe(null);
        });

        it('should have an audioPlaying array', function() {
            expect(runtime.audioPlaying).toEqual([]);
        });

        it('should have a notesPlaying array', function() {
            expect(runtime.notesPlaying).toEqual([]);
        });

        it('should have a projectLoaded variable', function() {
            expect(runtime.projectLoaded).toBe(false);
        });
    });

    describe('Stop All', function() {

        beforeEach(function() {
            runtime.stage = {
                resetFilters: function() {}
            };
            runtime.sprites = [new Sprite({})];

            spyOn(SoundPrims, "stopAllSounds");
            spyOn(runtime.sprites[0], "hideBubble").andReturn();
            spyOn(runtime.sprites[0], "resetFilters").andReturn();
            spyOn(runtime.sprites[0], "hideAsk").andReturn();
            spyOn(runtime.stage, "resetFilters");
        });

        it('should call a new Thread Object', function() {
            runtime.stopAll();
            expect(interp.activeThread).toEqual(new Interpreter.Thread(null));
        });

        it('should intitialize an empty threads array', function() {
            runtime.stopAll();
            expect(interp.threads).toEqual([]);
        });

        it('should call stopAllSounds', function() {
            runtime.stopAll();
            expect(SoundPrims.stopAllSounds).toHaveBeenCalled();
        });

        it('should call sprites.hideBubble', function() {
            runtime.stopAll();
            expect(runtime.sprites[0].hideBubble).toHaveBeenCalled();
        });

        it('should call sprites.resetFilters', function() {
            runtime.stopAll();
            expect(runtime.sprites[0].resetFilters).toHaveBeenCalled();
        });

        it('should call sprites.hideAsk', function() {
            runtime.stopAll();
            expect(runtime.sprites[0].hideAsk).toHaveBeenCalled();
        });

        it('should call stage.resetFilters', function() {
            runtime.stopAll();
            expect(runtime.stage.resetFilters).toHaveBeenCalled();
        });

    });

});
