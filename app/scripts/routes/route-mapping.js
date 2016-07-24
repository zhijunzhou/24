define(function(require) {
	'use strict';

	var homeTpl = require('text!partials/views/home.html');
	var	aboutTpl = require('text!partials/views/about.html');

	require('controllers/rootController');

	return {
		index: {
			controller: 'rootController',
			template: homeTpl
		},
		about: {
			template: aboutTpl
		},
		demo: {
			redirectTo: '/home'
		}
	};
});
