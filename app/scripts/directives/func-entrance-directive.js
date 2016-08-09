define(function(require) {
	'use strict';

	var template = require('text!partials/directives/funcEntrance.html');

	var directive = function() {
		return {
			restrict: 'E',
			template: template
		};
	};

	directive.id = 'funcEntrance';

	return directive;
});

