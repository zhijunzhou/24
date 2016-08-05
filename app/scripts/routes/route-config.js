define(function(require) {
	'use strict';

	var routes = require('./route-mapping');

	var routeConfig = function($routeProvider) {
		$routeProvider
			.when('/', routes.index)
			.when('/start', routes.start)
			.otherwise(routes.unknownRsc);

	};

	routeConfig.$inject = ['$routeProvider'];

	return routeConfig;
});
