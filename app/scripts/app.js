define(function(require) {
	'use strict';

	var angular = require('angular'),
		constant = require('model/constant'),
		homeModule = require('home/home-module'),
		rootController = require('controllers/rootController'),
		startController = require('controllers/startController'),
		infoController = require('controllers/infoController'),
		navBannerDirective = require('directives/nav-banner-directive'),
		routeConfig = require('routes/route-config');

	require('angular.route');
	require('bootstrap');

	var app = angular.module('24', [
		'ngRoute',
		homeModule.name
	]);

	app.constant('CONSTANT', constant);

	app.config(routeConfig);

	app.controller(rootController.id, rootController);
	app.controller(startController.id, startController);
	app.controller(infoController.id, infoController);

	app.directive(navBannerDirective.id, navBannerDirective);

	return app;
});
