var FilterView = require('../views/FilterView.js')
var ClearAllFiltersView =  require('../views/ClearAllFilterView.js');

var SizeFilterModel = require('../models/SizeFilterModel.js');
var BrandFilterModel = require('../models/BrandFilterModel.js');
var ColourFilterModel = require('../models/ColourFilterModel.js');

var FilterController = {

    initialise: function () {
        // I lsitened on the Backbone Global Object to keep the code DRY,
        //I could have used Marionttee and create Channles to keep the code self contained
        Backbone.on('facet-clicked', this.renderClearAll, this);

        this.clearAllFiltersView();

        this.sizeView();
        this.brandView();
        this.colourView();
    },

    renderClearAll: function () {
        this.views = [this.sizeView, this.brandView, this.colourView];

        var filtersState  = _.map(this.views, function (view) {
            return view.model.get('checkboxSelected');
        });

        if (_.contains(filtersState, true)) {
            this.clearAllFiltersView.show();
        } else {
            this.clearAllFiltersView.hide();
        }
    },

    clearAllFacets: function () {
        _.each(this.views, function (view) {
            view.clearAllChecked();
        });
    },

    clearAllFiltersView: function () {
        this.clearAllFiltersView = new ClearAllFiltersView();
        $('[data-role="clear-all-filters"]').append(this.clearAllFiltersView.render().$el);
        this.clearAllFiltersView.on('clear-all-facets', this.clearAllFacets, this);
    },

    sizeView: function () {
        this.sizeView = new FilterView({ model: new SizeFilterModel() });
        $('[data-role="size-filter"]').append(this.sizeView.render().$el);
    },

    brandView: function () {
        this.brandView = new FilterView({ model: new BrandFilterModel() });
        $('[data-role="brand-filter"]').append(this.brandView.render().$el);
    },

    colourView: function () {
        this.colourView = new FilterView({ model: new ColourFilterModel() });
        $('[data-role="colour-filter"]').append(this.colourView.render().$el);
    }
};

module.exports = FilterController;
