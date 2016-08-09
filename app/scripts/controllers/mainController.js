define(function() {
	'use strict';

	var mainController = function($scope, $routeParams, CONSTANT) {

		$scope.currentTitle = CONSTANT.Titles.main.title;

		$scope.currentTab = $routeParams.tab;

	};

	mainController.id = 'mainController';

	mainController.$inject = ['$scope', '$routeParams', 'CONSTANT'];

	return mainController;
});
