/* jasmine specs for Reporter.js go here */

describe('Reporter', function() {
    var reporter, reporterValues;

    beforeEach(function() {
        reporter = Reporter;
        reporterValues = new ReporterValues();
    });

    describe('Initialized variables', function() {
        var initReporter;
        beforeEach(function() {
            io = new ioMock({'getCount': 4});
            initReporter = new reporter(reporterValues.getStageVariables());
        });

        describe('Reporter Variables', function() {
            it('should have a cmd variable', function() {
                expect(initReporter.cmd).toBe('getVar:');
            });

            it('should have a color variable', function() {
                expect(initReporter.color).toBe(15629590);
            });

            it('should have a isDiscrete variable', function() {
                expect(initReporter.isDiscrete).toBe(true);
            });

            it('should have a mode variable', function() {
                expect(initReporter.mode).toBe(1);
            });

            it('should have a param variable', function() {
                expect(initReporter.param).toBe('myAnswer');
            });

            it('should have a sliderMax variable', function() {
                expect(initReporter.sliderMax).toBe(100);
            });

            it('should have a sliderMin variable', function() {
                expect(initReporter.sliderMin).toBe(0);
            });

            it('should have a target variable', function() {
                expect(initReporter.target).toBe('Stage');
            });

            it('should have a visible variable', function() {
                expect(initReporter.visible).toBe(true);
            });

            it('should have a x variable', function() {
                expect(initReporter.x).toBe(5);
            });

            it('should have a y variable', function() {
                expect(initReporter.y).toBe(5);
            });

            it('should have a z variable', function() {
                expect(initReporter.z).toBe(4);
            });

            it('should have a label variable', function() {
                expect(initReporter.label).toBe('myAnswer');
            });

            it('should have an el variable', function() {
                expect(initReporter.el).toBe(null);
            });

            it('should have an valueEl variable', function() {
                expect(initReporter.valueEl).toBe(null);
            });

            it('should have an slider variable', function() {
                expect(initReporter.slider).toBe(null);
            });
        });
    });

    describe('determineReporterLabel', function() {
        it('should return a stage variable', function() {
            reporter.prototype.target = "Stage";
            reporter.prototype.param = "myAnswer";
            reporter.prototype.cmd = "getVar:";
            expect(reporter.prototype.determineReporterLabel()).toBe('myAnswer');
        });

        it('should return a sprite variable', function() {
            reporter.prototype.target = "Sprite 1";
            reporter.prototype.param = "localAnswer";
            reporter.prototype.cmd = "getVar:";
            expect(reporter.prototype.determineReporterLabel()).toBe('Sprite 1: localAnswer');
        });

        it('should return a stage answer variable', function() {
            reporter.prototype.target = "Stage";
            reporter.prototype.param = null;
            reporter.prototype.cmd = "answer";
            expect(reporter.prototype.determineReporterLabel()).toBe('answer');
        });

    });
});
