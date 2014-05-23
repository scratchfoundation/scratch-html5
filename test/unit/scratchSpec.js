/* jasmine specs for Scratch.js go here */

var Scratch = require('../../js/Scratch'),
    Interpreter = require('../../js/Interpreter'),
    Runtime = require('../../js/Runtime'),
    IO = require('../../js/IO');

describe('Scratch', function() {

    var project_id = 123456789;
    var scratch;

    describe('Scratch - Load Project', function() {
        // Chicken meet Egg. Egg, Chicken.
        // beforeEach(function() {
        //     spyOn(io, "loadProject");
        //     spyOn(runtime, "init");
        //     spyOn(interp, "initPrims");
        // });

        // it('should call the IO loadProject Method', function() {
        //     expect(io.loadProject).toHaveBeenCalled();
        // });

        // it('should call the Runtime init method', function() {
        //     expect(runtime.init).toHaveBeenCalled();
        // });

        // it('should call the Interpreter initPrims method', function() {
        //     expect(interp.initPrims).toHaveBeenCalled();
        // });
    });

    describe('Click Green Flag', function() {
        beforeEach(function() {
            setFixtures('<button id=trigger-green-flag tabindex=2></button><div id="overlay"></div>');
            scratch = new Scratch(project_id);
        });

        it('should not click on the green flag if the project is loading', function() {
            runtime.projectLoaded = false;
            spyOn(runtime, 'greenFlag');
            $('#trigger-green-flag').click();
            expect(runtime.greenFlag).not.toHaveBeenCalled();
            expect($('#overlay').css('display')).toBe('block');
        });

        it('should click on the green flag if the project is loaded', function() {
            runtime.projectLoaded = true;
            spyOn(runtime, 'greenFlag');
            $('#trigger-green-flag').click();
            expect(runtime.greenFlag).toHaveBeenCalled();
            expect($('#overlay').css('display')).toBe('none');
        });
    });

    describe('Scratch - Click Stop', function() {
        beforeEach(function() {
            setFixtures('<button id=trigger-stop tabindex=3></button>');
            scratch = new Scratch(project_id);
        });

        it('should not click on the green flag if the project is loading', function() {
            spyOn(runtime, 'stopAll');
            $('#trigger-stop').click();
            expect(runtime.stopAll).toHaveBeenCalled();
        });
    });
});
