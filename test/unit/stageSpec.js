/* jasmine specs for Stage.js go here */

var Stage = require('../../js/Stage'),
    Sprite = require('../../js/Sprite');

describe('Stage', function() {

    var stage;
    beforeEach(function() {
        stage = new Stage({
            "objName": "Stage",
            "variables": [{
                "name": "myAnswer",
                "value": 0,
                "isPersistent": false
            }],
            "costumes": [{
                "costumeName": "backdrop1",
                "baseLayerID": -1,
                "baseLayerMD5": "b61b1077b0ea1931abee9dbbfa7903ff.png",
                "bitmapResolution": 2,
                "rotationCenterX": 480,
                "rotationCenterY": 360
            }],
            "currentCostumeIndex": 0,
            "penLayerMD5": "5c81a336fab8be57adc039a8a2b33ca9.png",
            "tempoBPM": 60,
            "videoAlpha": 0.5,
            "children": [{
                "objName": "Sprite1",
                "variables": [{
                    "name": "myAnswer2",
                    "value": 0,
                    "isPersistent": false
                }, {
                    "name": "answer",
                    "value": 0,
                    "isPersistent": false
                }],
                "scripts": [[42, 40.5, [["whenGreenFlag"], ["doAsk", "What's your name?"]]],
                [44.5, 155.5, [["whenGreenFlag"], ["say:", "Hello!"], ["doIf", ["=", ["timeAndDate", "minute"], "60"], [["say:", ["timestamp"]]]]]]],
                "costumes": [{
                    "costumeName": "costume1",
                    "baseLayerID": -1,
                    "baseLayerMD5": "f9a1c175dbe2e5dee472858dd30d16bb.svg",
                    "bitmapResolution": 1,
                    "rotationCenterX": 47,
                    "rotationCenterY": 55
                }],
                "currentCostumeIndex": 0,
                "scratchX": 0,
                "scratchY": 0,
                "scale": 1,
                "direction": 90,
                "rotationStyle": "normal",
                "isDraggable": false,
                "indexInLibrary": 1,
                "visible": true,
                "spriteInfo": {}
            }],
            "info": {
                "projectID": "18926654",
                "spriteCount": 1,
                "flashVersion": "MAC 12,0,0,70",
                "swfVersion": "v396",
                "userAgent": "Mozilla\/5.0 (Macintosh; Intel Mac OS X 10.9; rv:27.0) Gecko\/20100101 Firefox\/27.0",
                "videoOn": false,
                "scriptCount": 2,
                "hasCloudData": false
            }
        });
    });

    describe('Initialized variables', function() {
        describe('Stage Variables', function() {
            it('should have a z variable', function() {
                expect(stage.z).toBe(-2);
            });

            it('should have a penLayerLoaded variable', function() {
                expect(stage.penLayerLoaded).toBe(false);
            });

            it('should have a lineCanvas element', function() {
                expect(stage.lineCanvas).toBeDefined();
            });

            it('should have a lineCanvas width', function() {
                expect(stage.lineCanvas.width).toBe(480);
            });

            it('should have a lineCanvas height', function() {
                expect(stage.lineCanvas.height).toBe(360);
            });

            it('should have a lineCache variable', function() {
                expect(stage.lineCache).toBeDefined();
            });

            it('should have a isStage variable', function() {
                expect(stage.isStage).toBe(true);
            });

            it('should have an askAnswer variable', function() {
                expect(stage.askAnswer).toBe("");
            });

            it('should have called Sprite.call', function() {
                spyOn(Sprite, "call");
                stage = new Stage({});
                expect(Sprite.call).toHaveBeenCalled();
            });
        });
    });
});
