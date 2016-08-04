'use strict';

describe('24', function() {
	it('should not redirect to #/home', function() {
		browser.get('/');

		browser.getLocationAbsUrl().then(function(url) {
			expect(url).toBe('/');
		});
	});
});
