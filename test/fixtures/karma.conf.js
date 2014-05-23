module.exports = function(config) {
    config.set({
      basePath : '../../',

      // Options to browserify
      browserify: {
        debug: true,
        watch: true // Watches dependencies only (Karma watches the tests)
      },

      files : [
        'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
        'test/unit/**/*.js'
      ],

      exclude : [],

      preprocessors: {
        '*.html': 'html2js',
        // 'js/**/*.js': 'browserify',
        // 'soundbank/Instr.js': 'browserify',
        'test/unit/**/*.js': 'browserify'
      },

      autoWatch : true, // Watches tests only (Browserify watches the source)

      frameworks: [
        'browserify',
        'jasmine'
      ],

      browsers : ['Chrome']
  });
}
