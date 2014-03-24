requirejs({
    baseUrl: '..',
    paths: {
        'jquery': '../lib/jquery-1.10.1/jquery.min',
        'can': '../lib/canjs-2.0.5',
        'text': '../lib/require-text-2.0.10/text'
    },
    map: {
        '*': {
            'ejs': 'plugin/require-canjs-ejs/ejs',
            'mustache': 'plugin/require-canjs-mustache/mustache'
        }
    },
    shim: {
        'jquery': {
            exports: 'jQuery'
        }
    }
});
