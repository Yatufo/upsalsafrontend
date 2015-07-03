'use strict';

/* jasmine specs for controllers go here */
describe('eventify controllers', function() {

    describe('CategoriesController', function() {
        var scope, mockHttp, config;

        beforeEach(module('eventify'));

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, CONFIG) {
            mockHttp = _$httpBackend_;
            mockHttp.expectGET(CONFIG.CATEGORIES_ENDPOINT).
            respond(categoriesListMock);
            config = CONFIG;
            scope = $rootScope.$new();
            $controller('CategoriesController', {
                $scope: scope
            });
        }));

        it('Categories must have the first child as default', function() {
            expect(scope.categoryTree).toBeUndefined();
            mockHttp.flush();
            expect(scope.categoryTree).toBeDefined();
        });

    });

    var categoriesListMock = {
        id: "root",
        categories: [{
            id: '1-parent',
            categories: [{
                "id": '11-child'
            }, {
                "id": '12-child',
                categories: [{
                    "id": '121-grandchild'
                }, {
                    "id": '122-grandchild'
                }]
            }]
        }, {
            id: '2-parent',
            categories: [{
                "id": '21-child'
            }]
        }]
    };


});