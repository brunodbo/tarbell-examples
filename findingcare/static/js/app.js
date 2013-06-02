// Invoke our application by requiring some libraries
require.config( {
    paths: {
        highcharts: "//code.highcharts.com/highcharts",
        jPlayer: "/findingcare/js/jplayer/jquery.jplayer.min"

    },
    shim: {
        highcharts: {
            exports: "Highcharts",
            deps: [ "jquery" ]
        },
    }
} );
require([ 'jquery', 'base/views/NavigationView', 'jPlayer', 'highcharts' ],
function($, NavigationView, jPlayer, Hightcharts) {
    // Navigation view: Use Backbone view from base app to generate nav bar
    var nav = new NavigationView({
        el: $('#header'),
        title: { label: document.title, url: '' },
        scrollspy: false
    }).render();

    // Rewrite as jquery plugin
    var maximizeSize = function(selector) {
        selector.height($(window).height()); 
        selector.width($(window).width());
    }

    var offsets = {};

    var initSlides = function() {
        // Maximize size of content wrapper, fade in content
        maximizeSize($('#content'));
        $('#content').fadeIn();

        // Size each section
        $('section').each(function(i) {
            var section = $(this);
            if (i === 0) {
                section.addClass('active').removeClass('fast');
                setTimeout(function() {
                    section.find('.bubble').fadeIn('slow');
                }, 900);
            }
            offsets['#' + section.attr('id')] = $(window).height() * i; 
            maximizeSize(section);
        });
    }

    initSlides();
    $(window).resize(initSlides);

    //Audio files
    
    $.each($('.jp-jplayer'), function(){
        var audiopath = $(this).data('audiofile'); 
        var slidername = $(this).data('slidername'); 
        $(this).jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    mp3: audiopath
                });
            },
            cssSelectorAncestor: "#jplayer_container_" + slidername,
            swfPath: "/findingcare/js/jplayer/",
            supplied: "mp3"
        });
    });
    // Attr links
    $('.bubble .body a').attr('target', '_blank');

    $('[data-toggle="modal"]').append($('<i class="icon icon-eye-open">'));

    // Scrolly on clicky
    $('.nav-buttons a, #nav a').click(function(){
        var href = $.attr(this, 'href')

        $('#nav li').removeClass('active');
        $('#nav li a[href="' + href + '"]').parent().addClass('active');

        $('section').removeClass('active');
        $(href).addClass('active');
        $('#content').animate({
            scrollTop: offsets[href]
        }, 1000, function() {
            $('.bubble').hide();
            setTimeout(function() {
                $(href).find('.bubble').fadeIn('slow');
            }, 400);
        });
        return false;

    });

    $('#graph-census').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            width: 600,
            height: 220,
            backgroundColor: null,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            margin: [0, 0, 0, 0],
            spacingTop: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0

        },
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>'+ '{point.percentage}' + '%</b>',
            percentageDecimals: 1
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                shadow: false,
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: <br />'+ Highcharts.numberFormat(this.percentage, 1)+' %';
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Immigrant Data',
            size: '60%',
            data: [
                /*['Native Born',	2110448],
                ['With health insurance coverage', 1795530],
                ['With private health insurance', 1177207],
                ['With public coverage', 765182],
                ['No health insurance coverage', 314918],
                ['Foreign Born' ,566712],
                ['Naturalized', 224769],
                ['With health insurance coverage', 181633],
                ['With private health insurance', 132226],
                ['With public coverage',70383],
                ['No health insurance coverage',43136],*/
                /*['Noncitizen',341943],*/
                ['Health insurance',157649],
                ['Private insurance', 111671],
                ['Public coverage',50667],
                ['No insurance',184294]
                
            ]
        }]
    });

});
