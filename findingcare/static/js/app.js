// Invoke our application by requiring some libraries
require([ 'jquery', 'base/views/NavigationView' ],
function($, NavigationView) {
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
            }
            offsets['#' + section.attr('id')] = $(window).height() * i; 
            maximizeSize(section);
        });
    }

    initSlides();
    $(window).resize(initSlides);

    // Attr links
    $('.bubble .body a').attr('target', '_blank');

    $('[data-toggle="modal"]').append($('<i class="icon icon-eye-open">'));

    // Scrolly on clicky
    $('.nav-buttons a, #nav a').click(function(){
        var href = $.attr(this, 'href')

        $('#nav li').removeClass('active');
        $('#nav li a[href="' + href + '"]').parent().addClass('active');

        console.log(href);
        console.log($( href ).position().top);

        $('section').removeClass('active');
        $(href).addClass('active');
        $('#content').animate({
            scrollTop: offsets[href]
        }, 750);
        return false;
    });
});
