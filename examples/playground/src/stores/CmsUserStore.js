var MortarJS = require('../bootstrap').MortarJS;
var AppDispatcher = MortarJS.Dispatcher;
var AppActionConstants = require('../constants/AppActionConstants');
var assign = require('react/lib/Object.assign');
var ModelStore = MortarJS.Stores.ModelStore;

var ActionTypes = AppActionConstants.ActionTypes.cmsUser;

// User data storage
var _user = {
	_me             : {},
	_tokenStore     : {
		accessToken : false
	},
	refreshToken    : '',
	_authenticated  : false,
	_error          : false,
	_scopes         : []
};

// Misc
var _passwordResetSent = null;
var _requestingSignOut = false;
var _verifyingAccessToken = false;

var CmsUserStore = assign({}, ModelStore, {
	getToken: function () {
		var tokenStore = this._getLocalTokenStore();
		return tokenStore !== null ? tokenStore.accessToken : _user._tokenStore.accessToken;
	},

	getRefreshToken: function () {
		var tokenStore = this._getLocalTokenStore();
		return tokenStore !== null ? tokenStore.refreshToken : _user._tokenStore.refreshToken;
	},

	isTokenExpired: function () {
		var tokenStore = this._getLocalTokenStore();

		if (tokenStore === null) {
			return false;
		}

		// Buffer time in seconds
		var expiryBuffer = 100;

		return Date.now() > (tokenStore.expiresAt - expiryBuffer);
	},

	me: function () {
		return _user._me;
	},

	scopes: function () {
		var scopesStore = this._getLocalScopesStore();
		return scopesStore !== null ? scopesStore.scopes : _user._scopes;
	},

	isAuthenticated: function () {
		return _user._authenticated;
	},

	getError: function () {
		return _user._error;
	},

	getUserPermissions: function () {
		return _user._scopes;
	},

	getPasswordResetSentStatus: function () {
		return _passwordResetSent;
	},

	isRequestingSignOut: function () {
		return _requestingSignOut;
	},

	isVeryifyingAccessToken: function () {
		return _verifyingAccessToken;
	},

	_saveTokenToLocalStorage: function (action) {
		var tokenStore = {
			accessToken:  action.accessToken,
			expiresIn:    action.expiresIn,
			expiresAt:    Date.now() + (action.expiresIn * 1000), // Convert to milliseconds
			refreshToken: action.refreshToken
		};
		localStorage.removeItem('tokenStore');
		localStorage.removeItem('scopesStore');
		localStorage.setItem('tokenStore', JSON.stringify(tokenStore));
	},

	_getLocalTokenStore: function () {
		return JSON.parse(localStorage.getItem('tokenStore'));
	},

	_saveScopesToLocalStorage: function (scopes) {
		var scopesStore = {
			scopes: scopes
		};

		localStorage.removeItem('scopesStore');
		localStorage.setItem('scopesStore', JSON.stringify(scopesStore));
	},

	_getLocalScopesStore: function () {
		return JSON.parse(localStorage.getItem('scopesStore'));
	}

});

/**
 * Event listeners
 */
CmsUserStore.dispatchToken = AppDispatcher.register(function (action) {
	switch (action.type) {
		case ActionTypes.LOGGED_IN:
			// Save token to local storage
			if (action.rememberMe) {
				CmsUserStore._saveTokenToLocalStorage(action);
			}

			_user._tokenStore.accessToken = action.accessToken;
			_user._tokenStore.refreshToken = action.refreshToken;
			_user._tokenStore.expiresIn = action.expiresIn;
			_user._tokenStore.expiresAt = Date.now() + action.expiresIn;
			_user._authenticated = true;

			if (action.user) {
				_user._me = action.user

				if (typeof action.user.groups !== 'undefined') {
					_user._groups = action.user.groups.map(function (group, index) {
						return group.id;
					});
				}
			}

			_verifyingAccessToken = false;

			// Do work on other stores here, if needed
			CmsUserStore.emitChange();
			break;
		case ActionTypes.SCOPES_RECEIVED:
			_user._scopes = action.scopes;
			CmsUserStore._saveScopesToLocalStorage(action.scopes);
			CmsUserStore.emitChange();
			break;
		case ActionTypes.LOGGED_OUT:
			localStorage.removeItem('tokenStore');

			_user._tokenStore.accessToken = false;
			_user._authenticated = false;
			_requestingSignOut = false;

			// Do work on other stores here, if needed
			CmsUserStore.emitChange();
			break;
		case ActionTypes.FAILED_AUTHENTICATION:
			_verifyingAccessToken = false;
			_user._tokenStore.accessToken = false;
			_user._authenticated = false;
			_user._error = ActionTypes.FAILED_AUTHENTICATION;

			// Do work on other stores here, if needed
			CmsUserStore.emitChange();
			break;
		case ActionTypes.PASSWORD_RESET_SENT:
			_passwordResetSent = true;

			CmsUserStore.emitChange();
			break;
		case ActionTypes.REQUEST_SIGN_OUT:
			_requestingSignOut = action.request;

			CmsUserStore.emitChange();
			break;
		case ActionTypes.VERIFYING_ACCESS_TOKEN:
			_verifyingAccessToken = true;

			CmsUserStore.emitChange();
			break;
		default:
		// do nothing
	}

	return true; // Needed for Flux promise resolution
});

module.exports = CmsUserStore;

