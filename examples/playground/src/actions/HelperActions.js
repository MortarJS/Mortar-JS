import { analytics, trackerId } from '../config/base-config';

const ReactGA = require('react-ga');

var HelperActions = {

	/**
	 * Log the page view in Google Analytics
	 */
	logPageView: function () {
		if (analytics) {
			ReactGA.initialize(trackerId);
			ReactGA.set({ page: window.location.hash });
			ReactGA.pageview(window.location.hash);
		}
	}
};


module.exports = HelperActions;
