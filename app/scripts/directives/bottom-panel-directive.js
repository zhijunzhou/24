define(function(require) {
	'use strict';
	// http://blog.csdn.net/evankaka

	var template = require('text!partials/directives/bottomPanel.html');

	var directive = function() {
		return {
			restrict: 'E',
            replace: true,
            scope: {
				tab: '='
            },
			template: template,
			link: function(scope) {
				scope.switch = function(tab) {
					// todo change tab
					console.log(tab);
				};
			}
		};
	};

	directive.id = 'bottomPanel';

	return directive;
});
