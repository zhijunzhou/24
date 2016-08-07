define(function(require) {
	'use strict';

	var template = require('text!partials/directives/navBanner.html');

	var directive = function($window) {
		return {
			restrict: 'E',
            replace: true,
            scope: {
				title: '='
			},
			template: template,
			link: function(scope) {
				scope.back = function() {
					$window.history.back();
				};
			}
		};
	};

	directive.id = 'navBanner';

	directive.$inject = ['$window'];

	return directive;
});
