define(function() {
	'use strict';

	var startController = function($scope) {
		$scope.test = {};
	};

	startController.id = 'startController';

	startController.$inject = ['$scope'];

	return startController;
});
