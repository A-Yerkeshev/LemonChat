//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/es5-shim/es5-sham.js',
      'app/bower_components/es5-shim/es5-shim.js',
      'app/bower_components/json3/lib/json3.js',
      'app/scripts/**/*.js',
      'test/spec/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
