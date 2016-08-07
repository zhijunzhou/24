define(function(require) {
	'use strict';

	var routes = require('./route-mapping');

	var routeConfig = function($routeProvider) {
		$routeProvider
			.when('/', routes.index)
			.when('/start', routes.start)
			.when('/editInfo', routes.editInfo)
			.otherwise(routes.unknownRsc);

	};

	routeConfig.$inject = ['$routeProvider'];

	return routeConfig;
});
