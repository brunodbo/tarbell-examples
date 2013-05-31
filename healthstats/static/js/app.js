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

            $('#area-' + area.number + '-birthrate-chart').highcharts({
                credits: {
                    enabled: false
                },
                chart: {
                    type: "area"
                },
                title: {
                    text: 'Births per 1,000 residents',
                },
                yAxis: {
                    min: 5,
                    max: 30,
                    tickInterval: 5,
                    title: {
                        text: null
                    }
                },
                xAxis: {
                    categories: ['1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009']
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        animation: false
                    }
                },
                series: [{
                    name: "Birthrate (per 1,000 residents)",
                    data: data["birthrate"]
                }]
            });
            $('#area-' + area.number + '-lowbirthweight-chart').highcharts({
                credits: {
                    enabled: false
                },
                chart: {
                    type: "area"
                },
                title: {
                    text: 'Low birth weight as % of children born',
                },
                yAxis: {
                    tickInterval: 25,
                    max: 25,
                    title: {
                        text: null
                    }
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    categories: ['1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009']
                },
                plotOptions: {
                    series: {
                        animation: false
                    }
                },
                series: [{
                    name: "Low birth weight as % of children born",
                    data: data["lowbirthweight"]
                }]
            });
        });
    });
});
