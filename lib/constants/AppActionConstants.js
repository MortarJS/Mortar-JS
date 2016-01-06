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
		}),

		alerts: keyMirror({
			ALERT_ERROR:           null,
			ALERT_SUCCESS:         null,
			FAILED_AUTHENTICATION: null,
			FAILED_DATA_RETRIEVAL: null,
			SUCCEED_EDIT_MODEL:    null
		}),

		cms: {
			tableData: keyMirror({
				REORDERED_DATA: null
			}),

			form: keyMirror({
				USER_CHANGED_FORM_EDITING_STATE: null,
				FORM_REGISTER_FORM: null,
				FORM_EDIT_FIELD: null,
				FORM_FIELD_VALIDITIES: null,
				TYPEAHEAD_QUERY: null,
				FORM_CLEAR_TYPEAHEAD_QUERY: null
			}),

			pagination: keyMirror({
				RECEIVED_PAGINATED_DATA: null
			}),

			requests: keyMirror({
				UPLOAD_PROGRESS: null
			})
		}
	}
};

module.exports = constants;
