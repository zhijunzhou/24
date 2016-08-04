define(function(require) {
	'use strict';

	var routes = require('./route-mapping');

	var routeConfig = function($routeProvider) {
		$routeProvider
			.when('/', routes.index)
			.otherwise(routes.demo);
	};

	routeConfig.$inject = ['$routeProvider'];

	return routeConfig;
});
