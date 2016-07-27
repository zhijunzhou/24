define(function(require) {
	'use strict';

	var homeTpl = require('text!partials/views/home.html');
	return {
		index: {
			template: homeTpl
		}
	};
});
