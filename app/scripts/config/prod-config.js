require.config({
	baseUrl: 'scripts',

	paths: {
		'angular': '../lib/bower/angular/angular',
		'angular.route': '../lib/bower/angular-route/angular-route',

		'underscore': '../lib/bower/lodash/lodash',

		'jquery': '../lib/bower/jquery/dist/jquery',

		'bootstrap': '../lib/bower/bootstrap/dist/js/bootstrap',

		'angular-svg-round-progressbar': '../lib/bower/angular-svg-round-progressbar/build/roundProgress.min',

		'log': 'logging/console-logger',

		'text': '../lib/bower/requirejs-text/text',

		'partials': '../partials'
	},

	shim: {
		'jquery': {
			exports: 'jquery'
		},
		'angular': {
			exports: 'angular'
		},
		'angular.route': ['angular'],
		'angular-svg-round-progressbar': ['angular'],
		'bootstrap': ['jquery']
	},
	waitSeconds: 0
});
