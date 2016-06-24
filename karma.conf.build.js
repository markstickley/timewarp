module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'dist/timewarp.js',
      'test/timewarp.spec.js'
    ]
  });
};