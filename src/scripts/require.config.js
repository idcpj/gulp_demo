require.config({
    paths: {
        jquery: '../../vendor/jquery/dist/jquery.min',
        common:'../common/common',
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