module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/testing/main.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'src/testing/main.js': ['webpack', 'sourcemap']
    },
    webpack: require('./webpack.dev.js'),
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browserNoActivityTimeout: 100000,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  });
}
