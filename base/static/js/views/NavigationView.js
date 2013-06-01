define(['backbone', 'text!base/templates/nav.jst', 'bootstrap'], function(Backbone, NavTemplate) {
    var NavigationView = Backbone.View.extend({
        id: 'navigation',
        parse_selector: '#content section',
        initialize: function(options) {
            this.template = options.template || NavTemplate;
            this.scrollspy = _.isUndefined(options.scrollspy) ? true : options.scrollspy;
            this.parse_selector = options.parse_selector || this.parse_selector;
            this.parse_sections = options.parse_sections || this.parse_sections;
            this.context = {
                title: options.title || false
            };
            if (this.parse_sections) {
                _.extend(this.context, this.parse_sections());
            }

        },
        render: function() {
            $('body').addClass('has-nav').attr('data-offset', '82');
            var rendered = _.template(this.template, this.context);
            this.$el.append(rendered);
            if (this.scrollspy) {
                $('body').attr('data-spy', 'scroll');
                this.$el.find('#nav').scrollspy();
            }
            return this;
        },
        parse_sections: function() {
            var nav = [];
            _.each($(this.parse_selector), function(section) {
                var title = $(section).data('title');
                if (title && section.id) {
                    nav.push({label: title, url: '#'+ section.id});
                }
            });
            return { nav: nav };
        }
    });
    return NavigationView;
});
