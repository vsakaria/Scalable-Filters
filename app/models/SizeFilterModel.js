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
