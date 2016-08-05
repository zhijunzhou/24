define(function(require) {
	'use strict';

	var homeTpl = require('text!partials/views/home.html');
	var unknownRscTpl = require('text!partials/views/404.html');
	var startTpl = require('text!partials/views/start.html');

	return {
		index: {
			controller: 'rootController',
			template: homeTpl
		},
		start: {
			controller: 'startController',
			template: startTpl
		},
		unknownRsc: {
			template: unknownRscTpl
		}
	};
});
