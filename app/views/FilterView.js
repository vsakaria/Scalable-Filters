var FilterTemplate = require('../templates/FilterTemplate.html');

var FilterView = Backbone.View.extend({

    events: {
        'click .list': 'toggleClearButton',
        'click .clear-filter': 'clearAllChecked'
    },

    render: function () {

        this.$el.append(FilterTemplate(this.model.toJSON()));

        var values = this.model.get('values');

        _.each(values, function (value) {
            this.$('.list').append('<li><input type="checkbox" id=' + value.id + '><label for=' + value.id + '> ' + value.value + '</label></li>');
        }, this);

        return this;
    },

    toggleClearButton: function (e) {

        var checked = this.$el.find(':checked').length

        if (checked) {
            this.$('.clear-filter').addClass('display');
            this.model.set('checkboxSelected', true);
        } else {
            this.$('.clear-filter').removeClass('display');
            this.model.set('checkboxSelected', false);
        };

        Backbone.trigger('facet-clicked');
    },

    clearAllChecked: function (e) {
        var checked = this.$el.find(':checked').attr('checked', false);
        this.toggleClearButton();

        return false;
    },

    updateFacet: function (values) {
        _.each(values, function (value) {
            var id = '#' + this.model.get('panelValue') + value;
            $(id).attr('checked', true)
        }, this);

        this.toggleClearButton();
    }

});

module.exports = FilterView;
