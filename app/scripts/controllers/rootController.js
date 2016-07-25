define(function() {
	'use strict';

	var rootController = ['$scope', function($scope) {
		$scope.firstValue = 'Hi Allen';
	}];

	rootController.id = 'rootController';

	return rootController;
});
