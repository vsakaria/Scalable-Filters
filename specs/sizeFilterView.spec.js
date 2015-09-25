describe('sizeFilterView', function () {
    beforeEach(function () {
        var model = new BackBone.Model();
        this.view = new sizeFilterView({model: model});
    });

    describe('#getFacetCheckState', function () {
        it('should return ture when a checkbox is checked', function () {

            this.view.getFacetCheckState();
        });
    });
})
