require.config({
	baseUrl: 'scripts',

	paths: {
		'angular': '../lib/bower/angular/angular',
		'angular.route': '../lib/bower/angular-route/angular-route',

		'underscore': '../lib/bower/lodash/lodash',

		'jquery': '../lib/bower/jquery/dist/jquery',

		'bootstrap': '../lib/bower/bootstrap/dist/js/bootstrap',

		'log': 'logging/console-logger',

		'text': '../lib/bower/requirejs-text/text',

		'partials': '../partials'
	},

	shim: {
		'angular': {
			exports: 'angular'
		},
		'angular.route': ['angular'],
		'bootstrap': ['jquery']
	}
});
