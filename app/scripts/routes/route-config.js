define(function() {
	'use strict';

	var routeConfig = function($routeProvider) {
		$routeProvider
			.otherwise({
				redirectTo: '/demo'
			});
	};

	routeConfig.$inject = ['$routeProvider'];

	return routeConfig;
});
