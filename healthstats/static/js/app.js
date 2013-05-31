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

require([ "jquery", "underscore", "highcharts" ],
function($, _, Highcharts) {
    console.log("Starting our app");

    // Get, parse, and visualize data.
    $.getJSON("/healthstats/json/summary.json", function(rawdata) {
        console.log("Data downloaded");

        // This could be simplified but who cares. Loop over each community area.
        _.each(rawdata, function(community) {
            data = {
                "birthrate": [],
                "lowbirthweight": [],
                "pretermpct": []
            };


            // Loop over each key. We"ll exploit the fact time-series data 
            // columns always end in numbers and summary columns don't.
            _.each(_.keys(community), function(key) {
                // Split to output ["lowbirthweight", "2006"] etc
                var key_parts = key.split("_");

                // If the second key is a number, it"s a year. We use isNan here. Wat.
                if (!isNaN(key_parts[1])) {
                    // Push value into correct bucket... keys_parts[0] is
                    // "lowbirthweight" and community[key] is the value.
                    data[key_parts[0]].push(community[key])
                }

                console.log("Data for " + community.name, data);
            });
        });
    });
});
