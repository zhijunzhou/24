define(function() {
	'use strict';

	var rootController = function($scope) {
		$scope.firstValue = 'Hi Allen';
	};

	rootController.id = 'rootController';

	rootController.$inject = ['$scope'];

	return rootController;
});
