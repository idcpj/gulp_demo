require.config({
    paths: {
        jquery: '../../vendor/jquery/dist/jquery.min',
    },
    shim: {
        "backbone": {
            deps: [ "underscore" ],
            exports: "Backbone",
        },
        "underscore": {
            exports: "_",
        }
    },
});