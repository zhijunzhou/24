define(function(require) {
	'use strict';

	var template = require('text!partials/directives/appSettings.html');

	var directive = function() {
		return {
			restrict: 'E',
			template: template
		};
	};

	directive.id = 'appSettings';

	return directive;
});
