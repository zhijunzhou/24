define(function(require) {
	'use strict';

	var template = require('text!partials/directives/userBrief.html');

	var directive = function() {
		return {
			restrict: 'E',
			template: template
		};
	};

	directive.id = 'userBrief';

	return directive;
});
