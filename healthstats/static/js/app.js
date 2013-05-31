require.config( {
    paths: {
        highcharts: "//code.highcharts.com/highcharts"
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

        // This could be simplified but who cares. Loop over each area area.
        _.each(rawdata, function(area) {
            data = {
                "birthrate": [],
                "lowbirthweight": [],
            };

            // Loop over each key. We"ll exploit the fact time-series data 
            // columns always end in numbers and summary columns don't.
            _.each(_.keys(area), function(key) {
                // Split to output ["lowbirthweight", "2006"] etc
                var key_parts = key.split("_");

                // If the second key is a number, it"s a year. We use isNan here. Wat.
                if (!isNaN(key_parts[1]) && key_parts[0] in data) {
                    // Push value into correct bucket... keys_parts[0] is
                    // "lowbirthweight" and area[key] is the value.
                    data[key_parts[0]].push(area[key])
                }
            });

        });
    });
});
