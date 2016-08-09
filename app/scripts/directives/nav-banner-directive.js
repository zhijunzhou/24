define(function(require) {
	'use strict';

	var template = require('text!partials/directives/navBanner.html');

	var directive = function($window, $location) {
		return {
			restrict: 'E',
            replace: true,
            scope: {
				title: '='
			},
			template: template,
			link: function(scope) {
				scope.back = function() {
					if (scope.title === '主页') {
						$location.url('/');
					} else {
						$window.history.back();
					}
				};
			}
		};
	};

	directive.id = 'navBanner';

	directive.$inject = ['$window', '$location'];

	return directive;
});
