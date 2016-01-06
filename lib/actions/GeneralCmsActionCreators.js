var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppActionConstants = require('../constants/AppActionConstants');

var UserActionTypes = AppActionConstants.ActionTypes.cmsUser;
var FormActionTypes = AppActionConstants.ActionTypes.cms.form;
var RequestActionTypes = AppActionConstants.ActionTypes.cms.requests;

module.exports = {
	requestSignOut: function () {
		AppDispatcher.dispatch({
			type: UserActionTypes.REQUEST_SIGN_OUT,
			request: true
		});
	},

	cancelSignOutAction: function () {
		AppDispatcher.dispatch({
			type: UserActionTypes.REQUEST_SIGN_OUT,
			request: false
		});
	},

	/**
	 * Authentication failed. Necessary to set CmsUserStore and result in a redirect to login page.
	 *
	 * @param response
	 */
	failedAuthentication: function (response) {
		AppDispatcher.dispatch({
			type:   UserActionTypes.FAILED_AUTHENTICATION,
			status: response
		});
	},

	/**
	 * Authentication failed. Necessary to set CmsUserStore and result in a redirect to login page.
	 *
	 * @param loaded
	 * @param total
	 */
	uploadProgress: function (loaded, total) {
		AppDispatcher.dispatch({
			type:   RequestActionTypes.UPLOAD_PROGRESS,
			data: {
				loaded: loaded,
				total: total
			}
		});
	}
};
