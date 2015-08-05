require.config({
    'baseUrl': './src',
    'paths': {},
    'packages': [
        {
            'name': 'esl',
            'location': '../dep/esl/1.2.0/src'
        },
        {
            'name': 'jquery',
            'location': '../dep/jquery/1.9.1/src',
            'main': 'jquery.min'
        }
    ]
});
require(['core/main'], function (main) {
    main.init();
});