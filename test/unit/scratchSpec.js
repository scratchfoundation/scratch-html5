/* jasmine specs for Scratch.js go here */

describe('Scratch', function() {
    var scratch;

    beforeEach(function() {
        spyOn(IO.prototype, "loadProject");
        spyOn(Runtime.prototype, "init");
        spyOn(Interpreter.prototype, "initPrims");
        scratch = Scratch;
    });

    describe('Scratch - Load Project', function() {
        beforeEach(function() {
            scratch(project_id);
        });

        it('should call the IO loadProject Method', function() {
            expect(IO.prototype.loadProject).toHaveBeenCalled();
        });

        it('should call the Runtime init method', function() {
            expect(Runtime.prototype.init).toHaveBeenCalled();
        });

        it('should call the Interpreter initPrims method', function() {
            expect(Interpreter.prototype.initPrims).toHaveBeenCalled();
        });
    });

    describe('Scratch - Click Green Flag', function() {
        beforeEach(function() {
            setFixtures('<button id=trigger-green-flag tabindex=2></button><div id="overlay"></div>');
            scratch(project_id);
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
            scratch(project_id);
        });

        it('should not click on the green flag if the project is loading', function() {
            spyOn(runtime, 'stopAll');
            $('#trigger-stop').click();
            expect(runtime.stopAll).toHaveBeenCalled();
        });
    });
});
