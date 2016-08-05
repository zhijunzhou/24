define(function(require) {
	'use strict';

	require('angular.mocks');

	var app = require('app');

	describe('root controller function', function() {

		describe('root controller', function() {
			var $scope;

			beforeEach(module(app.name));

			beforeEach(inject(function($rootScope, $controller) {
				$scope = $rootScope.$new();
				$controller('rootController', { $scope:$scope });
			}));

			it('should equal to "Hi Allen" ', function() {
				expect($scope.firstValue).toBe('Hi Allen');
			});
		});
	});
});
