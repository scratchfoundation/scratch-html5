/* jasmine specs for Sprite.js go here */

describe('Sprite', function() {
    var sprite;

    beforeEach(function() {
        sprite = Sprite;
    });

    describe('Initialized variables', function() {
        var initSprite;
        beforeEach(function() {
            var spriteObject = sensingData.children[0];
            initSprite = new sprite(spriteObject);
        });

        describe('Sprite Variables', function() {
            it('should have a visible variable', function() {
                expect(initSprite.visible).toBe(true);
            });
        });

        describe('Pen Variables', function() {
            it('should have a penIsDown variable', function() {
                expect(initSprite.penIsDown).toBe(false);
            });

            it('should have a penWidth variable', function() {
                expect(initSprite.penWidth).toBe(1);
            });

            it('should have a penHue variable', function() {
                expect(initSprite.penHue).toBe(120);
            });

            it('should have a penShade variable', function() {
                expect(initSprite.penShade).toBe(50);
            });

            it('should have a penColorCache variable', function() {
                expect(initSprite.penColorCache).toBe(0x0000FF);
            });
        });

        describe('Ask Bubble', function() {
            it('should have an askInput variable', function() {
                expect(initSprite.askInput).toBe(null);
            });

            it('should have an askInputBox variable', function() {
                expect(initSprite.askInputField).toBe(null);
            });

            it('should have an askInputStyler variable', function() {
                expect(initSprite.askInputButton).toBe(null);
            });

            it('should have an askInputOn variable', function() {
                expect(initSprite.askInputOn).toBe(false);
            });
        });
    })

    describe('showBubble', function() {
        var spriteProto;
        beforeEach(function() {
            spriteProto = deepCopy(sprite.prototype);
            spriteProto.visible = true;
            setFixtures('<div class="bubble-container"></div>');
            spriteProto.talkBubble = $('.bubble-container');
            spriteProto.talkBubble.css('display', 'none');
            spriteProto.talkBubbleBox = $('<div class="bubble"></div>');
            spriteProto.talkBubbleStyler = $('<div class="bubble-say"></div>');
            spriteProto.talkBubble.append(spriteProto.talkBubbleBox);
            spriteProto.talkBubble.append(spriteProto.talkBubbleStyler);
        });

        describe('Say', function() {
            it('should call the showBubble method on the Sprite', function() {
                var text = "What to say";
                spyOn(spriteProto, "getTalkBubbleXY").andReturn([50,50]);;
                spriteProto.showBubble(text, "say");
                expect($('.bubble').html()).toBe(text);
                expect($('.bubble-say').hasClass('bubble-say')).toBe(true);
                expect($('.bubble').hasClass('say-think-border')).toBe(true);
                expect($('.bubble-container').css('display')).toBe('inline-block');
            });
        });

        describe('Think', function() {
            it('should call the showBubble method on the Sprite', function() {
                var text = "What to think";
                spyOn(spriteProto, "getTalkBubbleXY").andReturn([50,50]);;
                spriteProto.showBubble(text, "think");
                expect($('.bubble').html()).toBe(text);
                expect($('.bubble-think').hasClass('bubble-think')).toBe(true);
                expect($('.bubble').hasClass('say-think-border')).toBe(true);
                expect($('.bubble-container').css('display')).toBe('inline-block');
            });
        });

        describe('Ask', function() {
            it('should call the showBubble method on the Sprite', function() {
                var text = "What to Ask";
                spyOn(spriteProto, "getTalkBubbleXY").andReturn([50,50]);;
                spriteProto.showBubble(text, "doAsk");
                expect($('.bubble').html()).toBe(text);
                expect($('.bubble-ask').hasClass('bubble-ask')).toBe(true);
                expect($('.bubble').hasClass('ask-border')).toBe(true);
                expect($('.bubble-container').css('display')).toBe('inline-block');
            });
        });

        describe('Any Bubble with visible false', function() {
            it('should call the showBubble method on the Sprite and not display it', function() {
                spriteProto.visible = false;
                var text = "What to Ask";
                spyOn(spriteProto, "getTalkBubbleXY").andReturn([50,50]);;
                spriteProto.showBubble(text, "doAsk");
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
            spriteProto = deepCopy(sprite.prototype);
            setFixtures('<div class="bubble-container"></div>');
            spriteProto.talkBubble = $('.bubble-container');
            spriteProto.talkBubble.css('display', 'inline');
        });

        it('should hide the bubble', function() {
            spriteProto.hideBubble();
            expect($('.bubble-container').css('display')).toBe('none');
            expect(spriteProto.talkBubbleOn).toBe(false);

        });
    });

    describe('showAsk', function() {
        var spriteProto;
        beforeEach(function() {
            spriteProto = deepCopy(sprite.prototype);
            spriteProto.visible = true;
            spriteProto.z = 22;
            setFixtures('<div class="ask-container"></div>');
            spriteProto.askInput= $('.ask-container');
            spriteProto.askInput.css('display','none');
            spriteProto.askInput.css('position','relative');
            spriteProto.askInputField = $('<div class="ask-input"></div>');
            spriteProto.askInputTextField = $('<input type="text" class="ask-text-field"></input>');
            spriteProto.askInputField.append(spriteProto.askInputTextField);
            spriteProto.askInputButton = $('<div class="ask-button"></div>');
            spriteProto.askInput.append(spriteProto.askInputField);
            spriteProto.askInput.append(spriteProto.askInputButton);
        });

        it('should show the ask input if visible is true', function() {
            spriteProto.showAsk();
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
            expect(spriteProto.askInputOn).toBe(true);
        });

        it('should not show the ask input if visible is false', function() {
            spriteProto.visible = false;
            spriteProto.showAsk();
            expect($('.ask-container').css('display')).toBe('none');
            expect(
                $('.ask-text-field').is(':focus') ||
                document.activeElement.className.match(/ask-text-field/) !== null
            ).toBe(false);
        });
    });

    describe('hideAsk', function() {
        var spriteProto;
        beforeEach(function() {
            spriteProto = deepCopy(sprite.prototype);
            setFixtures('<div class="ask-container"></div>');
            spriteProto.askInput = $('.ask-container');
            spriteProto.askInputTextField = $('<input type="text" class="ask-text-field"></input>');
            spriteProto.askInputTextField.val("Delete Me");
            spriteProto.askInput.css('display', 'inline');
        });

        it('should hide the ask input', function() {
            spriteProto.hideAsk();
            expect($('.ask-container').css('display')).toBe('none');
            expect(spriteProto.askInputOn).toBe(false);
            expect(spriteProto.askInputTextField.val()).toBe('');
        });
    });

    describe('bindAsk', function() {
        beforeEach(function() {
            spriteProto = deepCopy(sprite.prototype);
            spriteProto.askInputTextField = $('<input type="text" class="ask-text-field"></input>');
            spriteProto.askInputButton = $('<div class="ask-button"></div>');
            spyOn(spriteProto, "hideBubble");
            spyOn(spriteProto, "hideAsk");
        });

        it('should bind to the askInputButton and handle a click', function() {
            interp = new interpreterMock();
            spyOn(interp, "targetStage").andCallThrough();
            $(spriteProto.askInputTextField).val('Hellow World');
            spriteProto.bindDoAskButton();
            $(spriteProto.askInputButton).click();
            expect(interp.targetStage).toHaveBeenCalled();
        });

        it('should bind to the askInputButton and handle a enter/return', function() {
            interp = new interpreterMock();
            spyOn(interp, "targetStage").andCallThrough();
            spriteProto.bindDoAskButton();
            var e = $.Event( "keypress", { which: 13 } );
            $(spriteProto.askInputButton).trigger(e);
            expect(interp.targetStage).toHaveBeenCalled();
        });


        it('should call hideBubble', function() {
            spriteProto.bindDoAskButton();
            $(spriteProto.askInputButton).click();
            expect(spriteProto.hideBubble).toHaveBeenCalled();
            expect(spriteProto.hideAsk).toHaveBeenCalled();
        });

        it('should call hideAsk', function() {
            spriteProto.bindDoAskButton();
            $(spriteProto.askInputButton).click();
            expect(spriteProto.hideAsk).toHaveBeenCalled();
        });

        it('should have interp.activeThread.paused be false', function() {
            interp = new interpreterMock();
            spriteProto.bindDoAskButton();
            $(spriteProto.askInputButton).click();
            expect(interp.activeThread.paused).toBe(false);
        });
    });

    describe('updateLayer', function() {
        var spriteProto;
        beforeEach(function() {
            spriteProto = deepCopy(sprite.prototype);
            setFixtures('<img class="mesh"></img><div class="bubble-container"></div><div class="ask-container"></div>');
            spriteProto.talkBubble = $('.bubble-container');
            spriteProto.talkBubble.css('position', 'relative');
            spriteProto.askInput = $('.ask-container');
            spriteProto.askInput.css('position', 'relative');
            spriteProto.mesh = $('.mesh');
            spriteProto.mesh.css('position', 'relative');
            spriteProto.z = 22;
        });

        it('should update the mesh z-index', function() {
            expect($('.mesh').css('z-index')).toBe('auto');
            spriteProto.updateLayer();
            expect($('.mesh').css('z-index')).toBe('22');
        });

        it('should update the talkBubble z-index', function() {
            expect($('.bubble-container').css('z-index')).toBe('auto');
            spriteProto.updateLayer();
            expect($('.bubble-container').css('z-index')).toBe('22');
        });

        it('should update the askInput z-index', function() {
            expect($('.ask-container').css('z-index')).toBe('auto');
            spriteProto.updateLayer();
            expect($('.ask-container').css('z-index')).toBe('22');
        });
    });

    describe('updateVisible', function() {
        var spriteProto;
        beforeEach(function() {
            spriteProto = deepCopy(sprite.prototype);
            setFixtures('<img class="mesh"></img><div class="bubble-container"></div><div class="ask-container"></div>');
            spriteProto.talkBubble = $('.bubble-container');
            spriteProto.talkBubble.css('display', 'none');
            spriteProto.askInput = $('.ask-container');
            spriteProto.askInput.css('display', 'none');
            spriteProto.mesh = $('.mesh');
            spriteProto.mesh.css('display', 'none');
        });

        describe('mesh', function() {
            it('should update the mesh display on false', function() {
                expect($('.mesh').css('display')).toBe('none');
                spriteProto.visible = false;
                spriteProto.updateVisible();
                expect($('.mesh').css('display')).toBe('none');
            });

            it('should update the mesh display on true', function() {
                expect($('.mesh').css('display')).toBe('none');
                spriteProto.visible = true;
                spriteProto.updateVisible();
                expect($('.mesh').css('display')).toBe('inline');
            });

        });

        describe('talkBubble', function() {
            it('should update the talkBubble on talkBubble true and visible true', function() {
                expect($('.bubble-container').css('display')).toBe('none');
                spriteProto.talkBubbleOn = true;
                spriteProto.visible = true;
                spriteProto.updateVisible();
                expect($('.bubble-container').css('display')).toBe('inline-block');
            });

            it('should update the talkBubble on talkBubble false and visible true', function() {
                expect($('.bubble-container').css('display')).toBe('none');
                spriteProto.talkBubbleOn = false;
                spriteProto.visible = true;
                spriteProto.updateVisible();
                expect($('.bubble-container').css('display')).toBe('none');
            });

            it('should update the talkBubble on talkBubble true and visible false', function() {
                expect($('.bubble-container').css('display')).toBe('none');
                spriteProto.talkBubbleOn = true;
                spriteProto.visible = false;
                spriteProto.updateVisible();
                expect($('.bubble-container').css('display')).toBe('none');
            });
        });

        describe('askContainer', function() {
            it('should update the askInput on askInput true and visible true', function() {
                expect($('.ask-container').css('display')).toBe('none');
                spriteProto.askInputOn = true;
                spriteProto.visible = true;
                spriteProto.updateVisible();
                expect($('.ask-container').css('display')).toBe('inline-block');
            });

            it('should update the askInput on askInput false and visible true', function() {
                expect($('.ask-container').css('display')).toBe('none');
                spriteProto.askInputOn = false;
                spriteProto.visible = true;
                spriteProto.updateVisible();
                expect($('.ask-container').css('display')).toBe('none');
            });

            it('should update the askInput on askInput true and visible false', function() {
                expect($('.ask-container').css('display')).toBe('none');
                spriteProto.askInputOn = true;
                spriteProto.visible = false;
                spriteProto.updateVisible();
                expect($('.ask-container').css('display')).toBe('none');
            });
        });

    });

    describe('setVisible', function() {
        var spriteProto;
        beforeEach(function() {
            spriteProto = deepCopy(sprite.prototype);
            spyOn(spriteProto, "updateVisible");
        });

        it('should set visible to true', function() {
            expect(spriteProto.visible).toBe(undefined);
            spriteProto.setVisible(true);
            expect(spriteProto.visible).toBe(true);
            expect(spriteProto.updateVisible).toHaveBeenCalled();
        });

        it('should set visible to false', function() {
            spriteProto.visible = true;
            spriteProto.setVisible(false);
            expect(spriteProto.visible).toBe(false);
            expect(spriteProto.updateVisible).toHaveBeenCalled();
        });
    });
});
