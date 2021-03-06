define(function(require) {
	'use strict';

	var angular = require('angular'),
		homeModule = require('home/home-module'),
		rootController = require('controllers/rootController'),
		routeConfig = require('routes/route-config');

	require('angular.route');
	require('../lib/vendor/scrollreveal/scrollreveal');

	var app = angular.module('24', [
		'ngRoute',
		homeModule.name
	]);

	app.config(routeConfig);

	app.controller(rootController.id, rootController);

	return app;
});
