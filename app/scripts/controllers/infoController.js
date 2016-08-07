define(function() {
	'use strict';

	var infoController = function($scope, CONSTANT) {
		$scope.currentTitle = CONSTANT.Titles.editInfo.title;
	};

	infoController.id = 'infoController';

	infoController.$inject = ['$scope', 'CONSTANT'];

	return infoController;
});
