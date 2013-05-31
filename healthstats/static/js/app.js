require.config( {
    paths: {
        highcharts: "//cdnjs.cloudflare.com/ajax/libs/highcharts/2.3.5/highcharts.min"
    },
    shim: {
        highcharts: {
            exports: "Highcharts",
            deps: [ "jquery" ]
        },
    }
} );

// Invoke our application by requiring some libraries
require([ "jquery", "underscore", "highcharts" ],
function($, _, Highcharts) {
    console.log("Hello world. AJAX and charts to come.")
});
