var keyMirror = require('react/lib/keyMirror');

/**
 * Application action constants
 *
 * @type {{ActionTypes: {user: (*|exports), venues: (*|exports), dashboard: (*|exports)}}}
 */
var constants = {
	ActionTypes: {
		cmsUser: keyMirror({
			LOGGED_IN                       : null,
			LOGGED_OUT                      : null,
			SCOPES_RECEIVED                 : null,
			PASSWORD_RESET_SENT             : null,
			REQUEST_SIGN_OUT                : null,
			CANCEL_SIGN_OUT                 : null,
			USER_CHANGED_FORM_EDITING_STATE : null,
			FAILED_AUTHENTICATION           : null,
			VERIFYING_ACCESS_TOKEN          : null
		})
	}
};

module.exports = constants;
