define(function() {
	'use strict';

	var mainController = function($scope, CONSTANT) {

		$scope.currentTitle = CONSTANT.Titles.main.title;

		$scope.currentTab = 'home';

		$scope.$watch('currentTab', function(n, o) {
			console.log(n, o);
		});
	};

	mainController.id = 'mainController';

	mainController.$inject = ['$scope', 'CONSTANT'];

	return mainController;
});
