define(function(require) {
	'use strict';

	var homeRoute = require('./home-route');

	var routeConfig = function($routeProvider) {
		$routeProvider
			.when('/home', homeRoute.index)
			.when('/about', homeRoute.about);
	};

	routeConfig.$inject = ['$routeProvider'];

	return routeConfig;
});
