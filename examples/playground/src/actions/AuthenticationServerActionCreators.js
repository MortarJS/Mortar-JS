var MortarJS = require('../bootstrap').MortarJS;
var AppDispatcher = MortarJS.Dispatcher;
var AppActionConstants = require('../constants/AppActionConstants');
var AuthenticationApi = require('../utils/AuthenticationApi');

var ActionTypes = AppActionConstants.ActionTypes.cmsUser;

var AuthenticationServerActionCreators = {
	/**
	 * Begin a login request with the API
	 *
	 * @param requestObject
	 * @param rememberMe
	 */
	login: function (requestObject, rememberMe) {
		AuthenticationApi.login(requestObject, this.requestUserPermissions.bind(this));
	},

	/**
	 * Log a user in with their localStorage token
	 */
	loginWithToken: function () {
		AuthenticationApi.selfAuth(this.userAuthenticated, this.failedAuthentication);
		AppDispatcher.dispatch({
			type: ActionTypes.VERIFYING_ACCESS_TOKEN
		});
	},

	/**
	 * Request a token refresh
	 *
	 * @param refreshToken
	 */
	refreshToken: function (refreshToken) {
		AuthenticationApi.refreshToken(refreshToken, this.requestUserPermissions.bind(this), this.failedAuthentication);
		AppDispatcher.dispatch({
			type: ActionTypes.VERIFYING_ACCESS_TOKEN
		});
	},

	/**
	 * Request a password reset email
	 *
	 * @param requestObject
	 */
	forgotPassword: function (requestObject) {
		AuthenticationApi.forgotPassword(requestObject, this.receiveForgotPasswordConfirmation);
	},

	/**
	 * Request a password reset
	 *
	 * @param data
	 * @param options
	 */
	resetPassword: function (data, options) {
		AuthenticationApi.resetPassword(data, options);
	},

	/**
	 * Receive confirmation that password reset has been successfully sent
	 *
	 * @param response
	 */
	receiveForgotPasswordConfirmation: function (response) {
		if (response) {
			AppDispatcher.dispatch({
				type:   ActionTypes.PASSWORD_RESET_SENT,
				status: response
			});
		}
	},

	/**
	 * Request user permissions
	 *
	 * @param {Object} response
	 */
	requestUserPermissions: function (response) {
		this.saveTokenToLocalStorage(response);
		this.loginWithToken();

		AppDispatcher.dispatch({
			type   : ActionTypes.SCOPES_RECEIVED,
			scopes : response.scopes
		});
	},

	/**
	 * Save token and refreshToken to local storage
	 *
	 * @param response
	 */
	saveTokenToLocalStorage: function (response) {
		AppDispatcher.dispatch({
			type:         ActionTypes.LOGGED_IN,
			accessToken:  response.access_token,
			refreshToken: response.refresh_token,
			expiresIn:    response.expires_in,
			rememberMe:   true
		});
	},

	/**
	 * Only send token data to any listening stores
	 *
	 * @param response
	 */
	saveTokenToUserStore: function (response) {
		AppDispatcher.dispatch({
			type:         ActionTypes.LOGGED_IN,
			accessToken:  response.access_token,
			refreshToken: response.refresh_token,
			expiresIn:    response.expires_in,
			rememberMe:   false
		});
	},

	/**
	 * Set user as authenticated
	 *
	 * @param response
	 */
	userAuthenticated: function (response) {
		AppDispatcher.dispatch({
			type:        ActionTypes.LOGGED_IN,
			accessToken: localStorage.getItem('accessToken'),
			user:        response
		});
	},

	/**
	 * Authentication failed. Necessary to set CmsUserStore and result in a redirect to login page.
	 *
	 * @param response
	 */
	failedAuthentication: function (response) {
		AppDispatcher.dispatch({
			type:   ActionTypes.FAILED_AUTHENTICATION,
			status: response
		});
	},

	/**
	 * Log a user out of the CMS
	 */
	logoutUser: function () {
		AppDispatcher.dispatch({
			type: ActionTypes.LOGGED_OUT
		});
	}
};

module.exports = AuthenticationServerActionCreators;
