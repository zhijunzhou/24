define(function(require) {
	'use strict';

	var angular = require('angular'),
		// homeModule = require('home/home-module'),
		appTitleDirective = require('directives/app-title-directive'),
		rootController = require('controllers/rootController'),
		routeConfig = require('routes/route-config');

	require('angular.route');

	var app = angular.module('apple', [
		'ngRoute'
		// homeModule.name
	]);

	app.directive(appTitleDirective.id, appTitleDirective);

	app.controller(rootController.id, rootController);

	app.config(routeConfig);

	return app;
});
