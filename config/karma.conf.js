module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'test/artifacts/**/*.js',
      'test/lib/mock-ajax.js',
      'test/unit/**/*.js',
      'test/lib/jquery-1.11.0.min.js',
      'js/sound/SoundDecoder.js',
      'js/sound/**/*.js',
      'js/util/**/*.js',
      'js/**/*.js'
    ],

    exclude : [
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
