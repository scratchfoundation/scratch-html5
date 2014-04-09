/* jasmine specs for Stage.js go here */

describe('Stage', function() {
    var stage;

    beforeEach(function() {
        stage = Stage;
    });

    describe('Initialized variables', function() {
        var initStage, lineCanvas;
        beforeEach(function() {
            spyOn(Sprite, "call");
            initStage = new stage(sensingData);
        });

        describe('Stage Variables', function() {
            it('should have a z variable', function() {
                expect(initStage.z).toBe(-2);
            });

            it('should have a penLayerLoaded variable', function() {
                expect(initStage.penLayerLoaded).toBe(false);
            });

            it('should have a lineCanvas element', function() {
                expect(initStage.lineCanvas).toBeDefined();
            });

            it('should have a lineCanvas width', function() {
                expect(initStage.lineCanvas.width).toBe(480);
            });

            it('should have a lineCanvas height', function() {
                expect(initStage.lineCanvas.height).toBe(360);
            });

            it('should have a lineCache variable', function() {
                expect(initStage.lineCache).toBeDefined();
            });

            it('should have a isStage variable', function() {
                expect(initStage.isStage).toBe(true);
            });

            it('should have an askAnswer variable', function() {
                expect(initStage.askAnswer).toBe("");
            });

            it('should have called Sprite.call', function() {
                expect(Sprite.call).toHaveBeenCalled();
            });
        });
    });
});
