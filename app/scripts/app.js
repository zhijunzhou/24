define(function(require) {
	'use strict';

	var angular = require('angular'),
		constant = require('model/constant'),
		homeModule = require('home/home-module'),
		rootController = require('controllers/rootController'),
		mainController = require('controllers/mainController'),
		infoController = require('controllers/infoController'),
		startController = require('controllers/startController'),
		navBannerDirective = require('directives/nav-banner-directive'),
		userBriefDirective = require('directives/user-brief-directive'),
		appSettingsDirective = require('directives/app-settings-directive'),
		bottomPanelDirective = require('directives/bottom-panel-directive'),
		funcEntranceDirective = require('directives/func-entrance-directive'),
		funcCategoryDirective = require('directives/func-category-directive'),
		subjectProgressDirective = require('directives/subject-progress-directive'),
		routeConfig = require('routes/route-config');

	require('angular.route');
	require('bootstrap');
	require('angular-svg-round-progressbar');

	var app = angular.module('24', [
		'ngRoute',
		'angular-svg-round-progressbar',
		homeModule.name
	]);

	app.constant('CONSTANT', constant);

	app.config(routeConfig);

	app.controller(rootController.id, rootController);
	app.controller(mainController.id, mainController);
	app.controller(infoController.id, infoController);
	app.controller(startController.id, startController);

	app.directive(navBannerDirective.id, navBannerDirective);
	app.directive(userBriefDirective.id, userBriefDirective);
	app.directive(appSettingsDirective.id, appSettingsDirective);
	app.directive(bottomPanelDirective.id, bottomPanelDirective);
	app.directive(funcEntranceDirective.id, funcEntranceDirective);
	app.directive(funcCategoryDirective.id, funcCategoryDirective);
	app.directive(subjectProgressDirective.id, subjectProgressDirective);

	return app;
});
