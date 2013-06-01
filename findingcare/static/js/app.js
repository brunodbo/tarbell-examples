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

    // Full screen each slide
    maximizeSize($('#content'));

    $('section').each(function(i) {
        var section = $(this);
        if (i === 0) {
            section.addClass('active').removeClass('fast');
        }
        maximizeSize(section);
    });

    $('.nav-buttons a, #nav a').click(function(){
        var href = $.attr(this, 'href')

        $('#nav li').removeClass('active');
        $('#nav li a[href="' + href + '"]').parent().addClass('active');

        $('section').removeClass('active');
        $(href).addClass('active');
        $('#content').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 1000);
        return false;
    });
    
});
