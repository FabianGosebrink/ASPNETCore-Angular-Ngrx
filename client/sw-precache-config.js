module.exports = {
    staticFileGlobs: [
        '.dist/web/**.html',
        '.dist/web/**.js',
        '.dist/web/**.css',
        '.dist/web/*.ico',
        '.dist/web/*.eot',
        '.dist/web/*.svg',
        '.dist/web/*.woff2',
        '.dist/web/*.ttf',
        '.dist/web/*.woff'
    ],
    root: '.dist/web/',
    stripPrefix: '.dist/web/',
    navigateFallback: '/index.html',
    runtimeCaching: [{
        urlPattern: /foodapi4demo\.azurewebsites\.net/,
        handler: 'networkFirst'
    }]
};