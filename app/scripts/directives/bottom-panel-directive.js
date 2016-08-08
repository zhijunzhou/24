define(function(require) {
	'use strict';

	var template = require('text!partials/directives/bottomPanel.html');

	var directive = function($window) {
		return {
			restrict: 'E',
            replace: true,
			template: template,
			link: function(scope) {
				scope.back = function() {
					$window.history.back();
				};
			}
		};
	};

	directive.id = 'bottomPanel';

	directive.$inject = ['$window'];

	return directive;
});
