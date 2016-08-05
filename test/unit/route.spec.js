define(function(require) {
	'use strict';

	require('angular.mocks');

	var app = require('app');

	describe('app', function() {
		beforeEach(module(app.name));

		// Make sure the module is actually constructed
		beforeEach(inject(function() {}));

		it('should test routeProvider', function() {
			inject(function ($route, $location, $rootScope) {
				expect($route.current).toBeUndefined();

				$location.path('/');

				$rootScope.$digest();

				console.log($route.current.template);

				expect($route.current.controller).toBe('rootController');
			})
		});
	});
});
