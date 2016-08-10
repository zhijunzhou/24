define(function(require) {
	'use strict';

	var template = require('text!partials/directives/funcCategory.html');

	var directive = function() {
		return {
			restrict: 'E',
			template: template
		};
	};

	directive.id = 'funcCategory';

	return directive;
});
