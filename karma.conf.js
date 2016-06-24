module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'src/**/*.es6',
      'test/**/*.spec.js'
    ]
  });
};