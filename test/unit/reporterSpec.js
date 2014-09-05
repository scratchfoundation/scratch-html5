/* jasmine specs for Reporter.js go here */

var Reporter = require('../../js/Reporter'),
    IO = require('../../js/IO');

describe('Reporter', function() {

    var reporter;
    beforeEach(function() {
        global.io = new IO();
        reporter = new Reporter({});
    });

    describe('Initialized variables', function() {
        beforeEach(function() {
            io.spriteLayerCount = 4;
            reporter = new Reporter({
                'cmd': "getVar:",
                'color': 15629590,
                'isDiscrete':  true,
                'mode': 1,
                'param': "myAnswer",
                'sliderMax': 100,
                'sliderMin': 0,
                'target': "Stage",
                'visible': true,
                'x': 5,
                'y': 5
            });
        });

        it('should have a cmd variable', function() {
            expect(reporter.cmd).toBe('getVar:');
        });

        it('should have a color variable', function() {
            expect(reporter.color).toBe(15629590);
        });

        it('should have a isDiscrete variable', function() {
            expect(reporter.isDiscrete).toBe(true);
        });

        it('should have a mode variable', function() {
            expect(reporter.mode).toBe(1);
        });

        it('should have a param variable', function() {
            expect(reporter.param).toBe('myAnswer');
        });

        it('should have a sliderMax variable', function() {
            expect(reporter.sliderMax).toBe(100);
        });

        it('should have a sliderMin variable', function() {
            expect(reporter.sliderMin).toBe(0);
        });

        it('should have a target variable', function() {
            expect(reporter.target).toBe('Stage');
        });

        it('should have a visible variable', function() {
            expect(reporter.visible).toBe(true);
        });

        it('should have a x variable', function() {
            expect(reporter.x).toBe(5);
        });

        it('should have a y variable', function() {
            expect(reporter.y).toBe(5);
        });

        it('should have a z variable', function() {
            expect(reporter.z).toBe(4);
        });

        it('should have a label variable', function() {
            expect(reporter.label).toBe('myAnswer');
        });

        it('should have an el variable', function() {
            expect(reporter.el).toBe(null);
        });

        it('should have an valueEl variable', function() {
            expect(reporter.valueEl).toBe(null);
        });

        it('should have an slider variable', function() {
            expect(reporter.slider).toBe(null);
        });
    });

    describe('determineReporterLabel', function() {
        it('should return a stage variable', function() {
            reporter.target = "Stage";
            reporter.param = "myAnswer";
            reporter.cmd = "getVar:";
            expect(reporter.determineReporterLabel()).toBe('myAnswer');
        });

        it('should return a sprite variable', function() {
            reporter.target = "Sprite 1";
            reporter.param = "localAnswer";
            reporter.cmd = "getVar:";
            expect(reporter.determineReporterLabel()).toBe('Sprite 1: localAnswer');
        });

        it('should return a stage answer variable', function() {
            reporter.target = "Stage";
            reporter.param = null;
            reporter.cmd = "answer";
            expect(reporter.determineReporterLabel()).toBe('answer');
        });

    });
});
