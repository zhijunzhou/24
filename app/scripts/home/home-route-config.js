define(function(require) {
	'use strict';

	var homeRoute = require('./home-route');

	var routeConfig = function($routeProvider) {
		$routeProvider
			.when('/home', homeRoute.index);
	};

	routeConfig.$inject = ['$routeProvider'];

	return routeConfig;
});
