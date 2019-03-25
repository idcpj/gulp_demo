require(['../require.config'],function () {
    'use strict';
    require(['jquery','../common/common'],function ($,a) {
        console.log(a);
        console.log($("body"));
    });
});
