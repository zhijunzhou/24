define(function() {
	'use strict';

	var rootController = function($scope) {
		$scope.firstValue = 'Hi Allen';
	};

	rootController.id = 'rootController';

	return rootController;
});
