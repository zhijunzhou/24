define(function(require) {
	'use strict';

	var homeTpl = require('text!partials/views/home.html');

	return {
		index: {
			controller: 'rootController',
			template: homeTpl
		},
		demo: {
			redirectTo: '/home'
		}
	};
});
