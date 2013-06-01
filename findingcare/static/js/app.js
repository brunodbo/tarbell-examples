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
        maximizeSize(section);
    });

    $('.nav-buttons a').click(function(){
        $('#content').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        return false;
    });
    
});
