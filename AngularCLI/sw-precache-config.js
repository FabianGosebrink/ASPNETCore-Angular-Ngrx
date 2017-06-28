module.exports = {
    staticFileGlobs: [
        '.dist/web/**.html',
        '.dist/web/**.js',
        '.dist/web/**.css',
        '.dist/web/*.ico',
        '.dist/web/*.ico'
    ],
    root: '.dist/web/',
    stripPrefix: '.dist/web/',
    navigateFallback: '/index.html',
    runtimeCaching: [{
        urlPattern: /foodapi4demo\.azurewebsites\.net/,
        handler: 'networkFirst'
    }]
};