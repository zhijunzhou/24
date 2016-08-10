define(['jquery'], function($) {
	'use strict';

	var mainController = function($scope, $routeParams, CONSTANT) {

		$scope.currentTitle = CONSTANT.Titles.main.title;

		$scope.currentTab = $routeParams.tab;

		$('#main-section').height($('body').outerHeight(true) - 100);

	};

	mainController.id = 'mainController';

	mainController.$inject = ['$scope', '$routeParams', 'CONSTANT'];

	return mainController;
});
