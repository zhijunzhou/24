define(function(require) {
	'use strict';

	var template = require('text!partials/directives/subjectProgress.html');

	var directive = function() {
		return {
			restrict: 'E',
			template: template,
			link: function(scope) {
				var r = 45;
				scope.max = 100;
				scope.real = 50;
				scope.r = r;
				scope.stroke = Math.floor(r / 5);
			}
		};
	};

	directive.id = 'subjectProgress';

	return directive;
});
