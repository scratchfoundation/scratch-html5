/* jasmine specs for Sprite.js go here */

var Sprite = require('../../js/Sprite'),
    Interpreter = require('../../js/Interpreter');

describe('Sprite', function() {
    var sprite;

    describe('Initialized variables', function() {

        beforeEach(function() {
            sprite = new Sprite({
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
                "scripts": [
                    [42, 40.5, [["whenGreenFlag"], ["doAsk", "What's your name?"]]],
                    [44.5, 155.5, [["whenGreenFlag"], ["say:", "Hello!"], ["doIf", ["=", ["timeAndDate", "minute"], "60"], [["say:", ["timestamp"]]]]]]
                ],
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
            });
        });

        describe('Sprite Variables', function() {
            it('should have a visible variable', function() {
                expect(sprite.visible).toBe(true);
            });
        });

        describe('Pen Variables', function() {
            it('should have a penIsDown variable', function() {
                expect(sprite.penIsDown).toBe(false);
            });

            it('should have a penWidth variable', function() {
                expect(sprite.penWidth).toBe(1);
            });

            it('should have a penHue variable', function() {
                expect(sprite.penHue).toBe(120);
            });

            it('should have a penShade variable', function() {
                expect(sprite.penShade).toBe(50);
            });

            it('should have a penColorCache variable', function() {
                expect(sprite.penColorCache).toBe(0x0000FF);
            });
        });

        describe('Ask Bubble', function() {
            it('should have an askInput variable', function() {
                expect(sprite.askInput).toBe(null);
            });

            it('should have an askInputBox variable', function() {
                expect(sprite.askInputField).toBe(null);
            });

            it('should have an askInputStyler variable', function() {
                expect(sprite.askInputButton).toBe(null);
            });

            it('should have an askInputOn variable', function() {
                expect(sprite.askInputOn).toBe(false);
            });
        });
    })

    describe('showBubble', function() {
        beforeEach(function() {
            sprite = new Sprite({
                visible: true
            });
            setFixtures('<div class="bubble-container"></div>');
            sprite.talkBubble = $('.bubble-container');
            sprite.talkBubble.css('display', 'none');
            sprite.talkBubbleBox = $('<div class="bubble"></div>');
            sprite.talkBubbleStyler = $('<div class="bubble-say"></div>');
            sprite.talkBubble.append(sprite.talkBubbleBox);
            sprite.talkBubble.append(sprite.talkBubbleStyler);
            spyOn(sprite, "getTalkBubbleXY").andReturn([50,50]);
        });

        describe('Say', function() {
            it('should call the showBubble method on the Sprite', function() {
                var text = "What to say";
                sprite.showBubble(text, "say");
                expect($('.bubble').html()).toBe(text);
                expect($('.bubble-say').hasClass('bubble-say')).toBe(true);
                expect($('.bubble').hasClass('say-think-border')).toBe(true);
                expect($('.bubble-container').css('display')).toBe('inline-block');
            });
        });

        describe('Think', function() {
            it('should call the showBubble method on the Sprite', function() {
                var text = "What to think";
                sprite.showBubble(text, "think");
                expect($('.bubble').html()).toBe(text);
                expect($('.bubble-think').hasClass('bubble-think')).toBe(true);
                expect($('.bubble').hasClass('say-think-border')).toBe(true);
                expect($('.bubble-container').css('display')).toBe('inline-block');
            });
        });

        describe('Ask', function() {
            it('should call the showBubble method on the Sprite', function() {
                var text = "What to Ask";
                sprite.showBubble(text, "doAsk");
                expect($('.bubble').html()).toBe(text);
                expect($('.bubble-ask').hasClass('bubble-ask')).toBe(true);
                expect($('.bubble').hasClass('ask-border')).toBe(true);
                expect($('.bubble-container').css('display')).toBe('inline-block');
            });
        });

        describe('Any Bubble with visible false', function() {
            it('should call the showBubble method on the Sprite and not display it', function() {
                sprite.visible = false;
                var text = "What to Ask";
                sprite.showBubble(text, "doAsk");
                expect($('.bubble').html()).toBe(text);
                expect($('.bubble-ask').hasClass('bubble-ask')).toBe(true);
                expect($('.bubble').hasClass('ask-border')).toBe(true);
                expect($('.bubble-container').css('display')).toBe('none');
            });
        });
    });

    describe('hideBubble', function() {
        var spriteProto;
        beforeEach(function() {
            sprite = new Sprite({});
            setFixtures('<div class="bubble-container"></div>');
            sprite.talkBubble = $('.bubble-container');
            sprite.talkBubble.css('display', 'inline');
        });

        it('should hide the bubble', function() {
            sprite.hideBubble();
            expect($('.bubble-container').css('display')).toBe('none');
            expect(sprite.talkBubbleOn).toBe(false);

        });
    });

    describe('showAsk', function() {
        beforeEach(function() {
            sprite = new Sprite({
                visible: true
            });
            sprite.z = 22;
            setFixtures('<div class="ask-container"></div>');
            sprite.askInput= $('.ask-container');
            sprite.askInput.css('display','none');
            sprite.askInput.css('position','relative');
            sprite.askInputField = $('<div class="ask-input"></div>');
            sprite.askInputTextField = $('<input type="text" class="ask-text-field"></input>');
            sprite.askInputField.append(sprite.askInputTextField);
            sprite.askInputButton = $('<div class="ask-button"></div>');
            sprite.askInput.append(sprite.askInputField);
            sprite.askInput.append(sprite.askInputButton);
        });

        it('should show the ask input if visible is true', function() {
            sprite.showAsk();
            expect($('.ask-container').css('display')).toBe('inline-block');
            expect($('.ask-container').css('z-index')).toBe('22');
            expect($('.ask-container').css('left')).toBe('15px');
            expect($('.ask-container').css('right')).toBe('15px');
            expect($('.ask-container').css('bottom')).toBe('7px');
            expect($('.ask-container').css('height')).toBe('25px');
            expect($('.ask-container').css('height')).toBe('25px');
            expect(
                $('.ask-text-field').is(':focus') ||
                document.activeElement.className.match(/ask-text-field/) !== null
            ).toBe(true);
            expect(sprite.askInputOn).toBe(true);
        });

        it('should not show the ask input if visible is false', function() {
            sprite.visible = false;
            sprite.showAsk();
            expect($('.ask-container').css('display')).toBe('none');
            expect(
                $('.ask-text-field').is(':focus') ||
                document.activeElement.className.match(/ask-text-field/) !== null
            ).toBe(false);
        });
    });

    describe('hideAsk', function() {
        beforeEach(function() {
            sprite = new Sprite({});
            setFixtures('<div class="ask-container"></div>');
            sprite.askInput = $('.ask-container');
            sprite.askInputTextField = $('<input type="text" class="ask-text-field"></input>');
            sprite.askInputTextField.val("Delete Me");
            sprite.askInput.css('display', 'inline');
        });

        it('should hide the ask input', function() {
            sprite.hideAsk();
            expect($('.ask-container').css('display')).toBe('none');
            expect(sprite.askInputOn).toBe(false);
            expect(sprite.askInputTextField.val()).toBe('');
        });
    });

    describe('bindAsk', function() {
        beforeEach(function() {
            global.interp = new Interpreter();
            spyOn(interp, "targetStage").andReturn({});
            sprite = new Sprite({});
            sprite.askInputTextField = $('<input type="text" class="ask-text-field"></input>');
            sprite.askInputButton = $('<div class="ask-button"></div>');
            spyOn(sprite, "hideBubble");
            spyOn(sprite, "hideAsk");
        });

        it('should bind to the askInputButton and handle a click', function() {
            $(sprite.askInputTextField).val('Hellow World');
            sprite.bindDoAskButton();
            $(sprite.askInputButton).click();
            expect(interp.targetStage).toHaveBeenCalled();
        });

        it('should bind to the askInputButton and handle a enter/return', function() {
            sprite.bindDoAskButton();
            var e = $.Event( "keypress", { which: 13 } );
            $(sprite.askInputButton).trigger(e);
            expect(interp.targetStage).toHaveBeenCalled();
        });


        it('should call hideBubble', function() {
            sprite.bindDoAskButton();
            $(sprite.askInputButton).click();
            expect(sprite.hideBubble).toHaveBeenCalled();
            expect(sprite.hideAsk).toHaveBeenCalled();
        });

        it('should call hideAsk', function() {
            sprite.bindDoAskButton();
            $(sprite.askInputButton).click();
            expect(sprite.hideAsk).toHaveBeenCalled();
        });

        it('should have interp.activeThread.paused be false', function() {
            sprite.bindDoAskButton();
            $(sprite.askInputButton).click();
            expect(interp.activeThread.paused).toBe(false);
        });
    });

    describe('updateLayer', function() {
        var sprite;
        beforeEach(function() {
            sprite = new Sprite({});
            setFixtures('<img class="mesh"></img><div class="bubble-container"></div><div class="ask-container"></div>');
            sprite.talkBubble = $('.bubble-container');
            sprite.talkBubble.css('position', 'relative');
            sprite.askInput = $('.ask-container');
            sprite.askInput.css('position', 'relative');
            sprite.mesh = $('.mesh');
            sprite.mesh.css('position', 'relative');
            sprite.z = 22;
        });

        it('should update the mesh z-index', function() {
            expect($('.mesh').css('z-index')).toBe('auto');
            sprite.updateLayer();
            expect($('.mesh').css('z-index')).toBe('22');
        });

        it('should update the talkBubble z-index', function() {
            expect($('.bubble-container').css('z-index')).toBe('auto');
            sprite.updateLayer();
            expect($('.bubble-container').css('z-index')).toBe('22');
        });

        it('should update the askInput z-index', function() {
            expect($('.ask-container').css('z-index')).toBe('auto');
            sprite.updateLayer();
            expect($('.ask-container').css('z-index')).toBe('22');
        });
    });

    describe('updateVisible', function() {
        var sprite;
        beforeEach(function() {
            sprite = new Sprite({});
            setFixtures('<img class="mesh"></img><div class="bubble-container"></div><div class="ask-container"></div>');
            sprite.talkBubble = $('.bubble-container');
            sprite.talkBubble.css('display', 'none');
            sprite.askInput = $('.ask-container');
            sprite.askInput.css('display', 'none');
            sprite.mesh = $('.mesh');
            sprite.mesh.css('display', 'none');
        });

        describe('mesh', function() {
            it('should update the mesh display on false', function() {
                expect($('.mesh').css('display')).toBe('none');
                sprite.visible = false;
                sprite.updateVisible();
                expect($('.mesh').css('display')).toBe('none');
            });

            it('should update the mesh display on true', function() {
                expect($('.mesh').css('display')).toBe('none');
                sprite.visible = true;
                sprite.updateVisible();
                expect($('.mesh').css('display')).toBe('inline');
            });

        });

        describe('talkBubble', function() {
            it('should update the talkBubble on talkBubble true and visible true', function() {
                expect($('.bubble-container').css('display')).toBe('none');
                sprite.talkBubbleOn = true;
                sprite.visible = true;
                sprite.updateVisible();
                expect($('.bubble-container').css('display')).toBe('inline-block');
            });

            it('should update the talkBubble on talkBubble false and visible true', function() {
                expect($('.bubble-container').css('display')).toBe('none');
                sprite.talkBubbleOn = false;
                sprite.visible = true;
                sprite.updateVisible();
                expect($('.bubble-container').css('display')).toBe('none');
            });

            it('should update the talkBubble on talkBubble true and visible false', function() {
                expect($('.bubble-container').css('display')).toBe('none');
                sprite.talkBubbleOn = true;
                sprite.visible = false;
                sprite.updateVisible();
                expect($('.bubble-container').css('display')).toBe('none');
            });
        });

        describe('askContainer', function() {
            it('should update the askInput on askInput true and visible true', function() {
                expect($('.ask-container').css('display')).toBe('none');
                sprite.askInputOn = true;
                sprite.visible = true;
                sprite.updateVisible();
                expect($('.ask-container').css('display')).toBe('inline-block');
            });

            it('should update the askInput on askInput false and visible true', function() {
                expect($('.ask-container').css('display')).toBe('none');
                sprite.askInputOn = false;
                sprite.visible = true;
                sprite.updateVisible();
                expect($('.ask-container').css('display')).toBe('none');
            });

            it('should update the askInput on askInput true and visible false', function() {
                expect($('.ask-container').css('display')).toBe('none');
                sprite.askInputOn = true;
                sprite.visible = false;
                sprite.updateVisible();
                expect($('.ask-container').css('display')).toBe('none');
            });
        });

    });

    describe('setVisible', function() {

        beforeEach(function() {
            sprite = new Sprite({
                visible: false
            });
            spyOn(sprite, "updateVisible").andReturn();
        });

        it('should set visible to true', function() {
            expect(sprite.visible).toBe(false);
            sprite.setVisible(true);
            expect(sprite.visible).toBe(true);
            expect(sprite.updateVisible).toHaveBeenCalled();
        });

        it('should set visible to false', function() {
            sprite.visible = true;
            sprite.setVisible(false);
            expect(sprite.visible).toBe(false);
            expect(sprite.updateVisible).toHaveBeenCalled();
        });
    });
});
