module.exports = function(config) {
    config.set({
        basePath : '../../',
        frameworks: ['jasmine'],
        autoWatch: false,
        singleRun: true,
        preprocessors: {
            '*.html': ['html2js']
        },
        files: [
            'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
            'node_modules/underscore/underscore.js',

            'test/artifacts/**/*.js',
            'test/lib/**/*.js',
            'test/unit/**/*.js',
            
            'js/sound/SoundDecoder.js',
            'js/sound/**/*.js',
            'js/util/**/*.js',
            'js/**/*.js'
        ],
        browsers: ['PhantomJS'],
        plugins: [
            'karma-jasmine',
            'karma-html2js-preprocessor',
            'karma-phantomjs-launcher',
            'phantomjs'
        ]
    });
}
