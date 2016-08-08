define(function(require) {
	'use strict';

	var angular = require('angular'),
		constant = require('model/constant'),
		homeModule = require('home/home-module'),
		rootController = require('controllers/rootController'),
		mainController = require('controllers/mainController'),
		startController = require('controllers/startController'),
		infoController = require('controllers/infoController'),
		navBannerDirective = require('directives/nav-banner-directive'),
		bottomPanelDirective = require('directives/bottom-panel-directive'),
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
	app.controller(mainController.id, mainController);
	app.controller(startController.id, startController);
	app.controller(infoController.id, infoController);

	app.directive(navBannerDirective.id, navBannerDirective);
	app.directive(bottomPanelDirective.id, bottomPanelDirective);

	return app;
});
