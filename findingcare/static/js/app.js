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

    // Custom chart
    $('#graph1-holder').highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: 'pie',
            width: 110,
            height: 110,
            margin: [0, 0, 0, 0],
            spacingTop: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0,
            backgroundColor: '#eeeeee'
        },
        title: {
            text: null,
        },
        plotOptions: {
            pie: { 
                shadow: false
            }
        },
        series: [{
            name: "Thing",
            data: [
                ['This', 20],
                ['That', 35],
                ['The other', 65]
            ],
            size: '100%',
            innerSize: '55%',
            dataLabels: {
                enabled: false
            }
        }] 
    });
    $('#graph2-holder').highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: 'pie',
            width: 110,
            height: 110,
            margin: [0, 0, 0, 0],
            spacingTop: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0,
            backgroundColor: '#eeeeee'
        },
        title: {
            text: null,
        },
        plotOptions: {
            pie: { 
                shadow: false
            }
        },
        series: [{
            name: "Thing",
            data: [
                ['This', 15],
                ['That', 35],
                ['The other', 45],
                ['Foo', 25],
                ['Bar', 5]
            ],
            size: '100%',
            innerSize: '55%',
            dataLabels: {
                enabled: false
            }
        
        }] 
    });
    $('#graph3-holder').highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: 'pie',
            width: 110,
            height: 110,
            margin: [0, 0, 0, 0],
            spacingTop: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0,
            backgroundColor: '#eeeeee'
        },
        title: {
            text: null,
        },
        plotOptions: {
            pie: { 
                shadow: false
            }
        },
        series: [{
            name: "Thing",
            data: [
                ['This', 10],
                ['That', 40],
                ['Foo', 10],
                ['The other', 35],
                ['Bar', 5]
            ],
            size: '100%',
            innerSize: '55%',
            dataLabels: {
                enabled: false
            }
        
        }] 
    });
});
