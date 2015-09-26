(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../models/BrandFilterModel.js":3,"../models/ColourFilterModel.js":4,"../models/SizeFilterModel.js":5,"../router/Router.js":6,"../views/ClearAllFilterView.js":9,"../views/FilterView.js":10}],2:[function(require,module,exports){
var FilterController = require('../app/controllers/FilterController.js');

FilterController.initialise();

},{"../app/controllers/FilterController.js":1}],3:[function(require,module,exports){
var BrandFilterModel = Backbone.Model.extend({
    defaults: {
        'checkboxSelected': false,
        title: 'Brand',
        panelValue: 'brand_',
        values: [{
                value: 'ASOS',
                id: 'brand_53'
            }, {
                value: 'Vero Moda',
                id: 'brand_3098'
            }, {
                value: 'TFNC',
                id: 'brand_716'
            }, {
                value: 'Paprika',
                id: 'brand_12885'
            }, {
                value: 'Motel',
                id: 'brand_481'
            }, {
                value: 'Aqua',
                id: 'brand_12711'
            }, {
                value: 'Rare',
                id: 'brand_3392'
            }, {
                value: 'ASOS Africa',
                id: 'brand_12652'
            }, {
                value: 'Nishe',
                id: 'brand_12767'
            }, {
                value: 'Beyonc',
                id: 'brand_13194'
            }, {
                value: 'Dehila',
                id: 'brand_143'
            }, {
                value: 'French Connection',
                id: 'brand_224'
            }, {
                value: 'Coast',
                id: 'brand_2965'
            }, {
                value: 'Karen Miller',
                id: 'brand_374'
            }, {
                value: 'Lipsy',
                id: 'brand_407'
            }, {
                value: 'Ted Baker',
                id: 'brand_712'
            }
        ]
    }
});

module.exports = BrandFilterModel;


},{}],4:[function(require,module,exports){
var ColourFilterModel = Backbone.Model.extend({
    defaults: {
        'checkboxSelected': false,
        title: 'Colour',
        panelValue: 'base_colour_',
        values: [{
                value: 'Yellow',
                id: 'base_colour_1'
            }, {
                value: 'White',
                id: 'base_colour_2'
            }, {
                value: 'Red',
                id: 'base_colour_3'
            }, {
                value: 'Purple',
                id: 'base_colour_4'
            }, {
                value: 'Pink',
                id: 'base_colour_5'
            }, {
                value: 'Orange',
                id: 'base_colour_6'
            }, {
                value: 'Multie',
                id: 'base_colour_7'
            }, {
                value: 'Grey',
                id: 'base_colour_8'
            }, {
                value: 'Green',
                id: 'base_colour_9'
            }, {
                value: 'Cream',
                id: 'base_colour_10'
            }, {
                value: 'Brown',
                id: 'base_colour_11'
            }, {
                value: 'Blue',
                id: 'base_colour_12'
            }, {
                value: 'Black',
                id: 'base_colour_13'
            }, {
                value: 'Beige',
                id: 'base_colour_14'
            }
        ]
    }
});

module.exports = ColourFilterModel;


},{}],5:[function(require,module,exports){
var SizeFilterModel = Backbone.Model.extend({
    defaults: {
        'checkboxSelected': false,
        title: 'Size',
        panelValue: 'size_',
        values: [{
                value: 'UK 4',
                id: 'size_4'
            }, {
                value: 'UK 6',
                id: 'size_6'
            }, {
                value: 'UK 8',
                id: 'size_8'
            }, {
                value: 'UK 10',
                id: 'size_10'
            }, {
                value: 'UK 12',
                id: 'size_12'
            }, {
                value: 'UK 14',
                id: 'size_14'
            }, {
                value: 'UK 16',
                id: 'size_16'
            }, {
                value: 'UK 18',
                id: 'size_18'
            }, {
                value: 'UK 22',
                id: 'size_22'
            }, {
                value: 'UK 24',
                id: 'size_24'
            }
        ]
    }
});

module.exports = SizeFilterModel;

},{}],6:[function(require,module,exports){
var myRouter = Backbone.Router.extend({
    routes: {
        '': 'start'
    }
});

module.exports = myRouter;

},{}],7:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="panel" data-id="size">\n    <a href="#" class="refinement-header">\n        <h3>\n        <span class="facet-name"></span>\n        '+
((__t=( title ))==null?'':__t)+
'\n        </h3>\n    </a>\n    <a href="#" data-clear="size" class="clear-filter">Clear</a>\n    <div class="options scrollable single-column">\n        <ul class=\'list\'>\n        </ul>\n    </div>\n</div>';
}
return __p;
};

},{}],8:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h2>REFINE BY</h2>\n<a href="#" class="clear-all-filters" data-clear="all">Clear All</a>';
}
return __p;
};

},{}],9:[function(require,module,exports){
var clearAllFiltersTemplate = require('../templates/clearAllFiltersTemplate.html');

var ClearAllFiltersView = Backbone.View.extend({

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


},{"../templates/clearAllFiltersTemplate.html":8}],10:[function(require,module,exports){
var FilterTemplate = require('../templates/FilterTemplate.html');

var FilterView = Backbone.View.extend({

    events: {
        'click .list': 'toggleClearButton',
        'click .clear-filter': 'clearAllChecked'
    },

    // render: function(){
    //  var template = _.template($('#dumb').html());
    //     var vars = {amount:200};
    //     var html = template(vars);
    //     this.$el.append(html);
    // },

    render: function () {

        this.$el.append(FilterTemplate(this.model.toJSON()));

        var values = this.model.get('values');

        _.each(values, function (value) {
            this.$('.list').append('<li><input type="checkbox" id=' + value.id + '><label for=' + value.id + '> ' + value.value + '</label></li>');
        }, this);

        return this;
    },

    toggleClearButton: function () {
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

    clearAllChecked: function () {
        var checked = this.$el.find(':checked').attr('checked', false);
        this.toggleClearButton();
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

},{"../templates/FilterTemplate.html":7}]},{},[2])
//# sourceMappingURL=bundle.map
