define(function(require) {
	'use strict';

	require('angular.mocks');

	var homeModule = require('home/home-module');

	describe('APP Title directive', function() {
		var element, scope;

		beforeEach(module(homeModule.name));

		beforeEach(inject(function($rootScope, $compile) {
			scope = $rootScope.$new();

			element = '<app-title></app-title>';

			element = $compile(element)(scope);

			scope.$digest();
		}));

		it('should create a title heading', function() {
			expect(element.text().trim()).toBe('24');
		});
	});
});
