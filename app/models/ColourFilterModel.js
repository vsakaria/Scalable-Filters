var ColourFilterModel = Backbone.Model.extend({
    defaults: {
        'checkboxSelected': false,
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

