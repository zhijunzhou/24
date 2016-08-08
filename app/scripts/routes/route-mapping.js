define(function(require) {
	'use strict';

	var homeTpl = require('text!partials/views/home.html');
	var unknownRscTpl = require('text!partials/views/404.html');
	var startTpl = require('text!partials/views/start.html');
	var editInfoTpl = require('text!partials/views/editInfo.html');
	var mainTpl = require('text!partials/views/main.html');

	return {
		index: {
			controller: 'rootController',
			template: homeTpl
		},
		start: {
			controller: 'startController',
			template: startTpl
		},
		main: {
			controller: 'mainController',
			template: mainTpl
		},
		editInfo: {
			controller: 'infoController',
			template: editInfoTpl
		},
		unknownRsc: {
			template: unknownRscTpl
		}
	};
});
