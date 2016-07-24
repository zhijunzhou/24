define(function(require) {
	'use strict';

	var angular = require('angular'),
		appTitleDirective = require('directives/app-title-directive'),
		rootController = require('controllers/rootController'),
		homeRouteConfig = require('./home-route-config');

	require('angular.route');

	var module = angular.module('appHome', ['ngRoute']);

	module.directive(appTitleDirective.id, appTitleDirective);

	module.controller(rootController.id, rootController);

	module.config(homeRouteConfig);

	return module;
});
