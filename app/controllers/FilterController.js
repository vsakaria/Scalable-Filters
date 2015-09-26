var FilterView = require('../views/FilterView.js')
var ClearAllFiltersView = require('../views/ClearAllFilterView.js');

var SizeFilterModel = require('../models/SizeFilterModel.js');
var BrandFilterModel = require('../models/BrandFilterModel.js');
var ColourFilterModel = require('../models/ColourFilterModel.js');

var Router = require('../router/Router.js');

var FilterController = {

    initialise: function () {
        Backbone.on('facet-clicked', this.renderClearAll, this);

        var router = new Router();
        router.on('route:start', this.displayViews, this);
        Backbone.history.start();
    },

    displayViews: function (q) {

        this.clearAllFiltersView();

        this.sizeView();
        this.brandView();
        this.colourView();

        if (window.location.search) {
            this.handleQueryString(window.location.search);
        }
    },

    handleQueryString: function (queryString) {
        var refinements = queryString.slice(8).split('|');

        _.each(refinements, function (panelData) {
            var panelName = panelData.split(':')[0];
            var panelValues = panelData.split(':')[1].split(',');

            if (panelName == 'size') {

                this.sizeView.updateFacet(panelValues);

                // var refinementValues = $('[data-id=size] [type=checkbox]');

                // $.each(panelValues, function (i, val) {
                //     refinementValues.eq((val - 3) / 2).attr('checked', true).change();
                // });

            } else if (panelName == 'colour') {
                this.colourView.updateFacet(panelValues);

                // var refinementValues = $('[data-id=base_colour] [type=checkbox]');

                // $.each(panelValues, function (i, val) {
                //     refinementValues.eq(val).attr('checked', true).change();
                // });

            } else if (panelName === 'brand') {
                this.brandView.updateFacet(panelValues);

                // var refinementValues = $('[data-id=brand] [type=checkbox]');

                // $.each(panelValues, function (i, val) {
                //     refinementValues.filter('#brand_' + val).attr('checked', true).change();
                // });

            }

        }, this);
    },

    renderClearAll: function () {
        this.views = [this.sizeView, this.brandView, this.colourView];

        var filtersState = _.map(this.views, function (view) {
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
        this.sizeView = new FilterView({
            model: new SizeFilterModel()
        });
        $('[data-role="size-filter"]').append(this.sizeView.render().$el);
    },

    brandView: function () {
        this.brandView = new FilterView({
            model: new BrandFilterModel()
        });
        $('[data-role="brand-filter"]').append(this.brandView.render().$el);
    },

    colourView: function () {
        this.colourView = new FilterView({
            model: new ColourFilterModel()
        });
        $('[data-role="colour-filter"]').append(this.colourView.render().$el);
    }
};

module.exports = FilterController;

//?refine=size:4,10,16|colour:1,4|brand:53,3392,12767

//1. Look at the connect grunt plug in
