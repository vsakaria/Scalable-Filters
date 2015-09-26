var clearAllFiltersTemplate = require('../templates/clearAllFiltersTemplate.html');

var ClearAllFiltersView = Backbone.View.extend({

    className: 'main-title',

    template: _.template(clearAllFiltersTemplate()),

    events: {
        'click .clear-all-filters': 'clearAllFacets'
    },

    render: function () {
        this.$el.append(this.template());
        return this;
    },

    show: function () {
        this.$('a.clear-all-filters').addClass('display');
    },

    hide: function () {
        this.$('a.clear-all-filters').removeClass('display');
    },

    clearAllFacets: function () {
        this.trigger('clear-all-facets');
    }
});

module.exports = ClearAllFiltersView;

