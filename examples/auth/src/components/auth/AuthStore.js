// External
var _                   = require('lodash');
var Mortar = require('../../bootstrap').MortarJS;

// Components
var AppDispatcher      = Mortar.Dispatcher;

// Stores
var ModelStore         = Mortar.Stores.ModelStore;

// Globals
var _isAuthenticated = true;
var _userPermissions = ['super-admin', 'bot'];

/**
 * @class AuthStore
 * @type {Object}
 *
 * @memberOf Stores
 * @see {@link Stores}
 */
var AuthStore = Object.assign({}, ModelStore, {
	isUserAuthenticated: function() {
		return _isAuthenticated;
	},

	getUserPermissions: function() {
		return _userPermissions;
	},

	/**
	 * denyRouteAuth
	 *
	 * @param {object} nextState The next state of the application
	 * @param {func} replace A routing function callback.
	 * @return {null}
	 *
	 * @TODO Make this user definable (to work with other routers)
	 * @TODO allow the user to pass in the 'redirect' path
	 * @TODO This shouldn't be in a store
	 */
	denyRouteAuth: function(nextState, replace) {
		if (_isAuthenticated) {
			replace({
				pathname : '/',
				state    : { nextPathname: nextState.location.pathname }
			});
		}
	},

	/**
	 * requireRouteAuth
	 *
	 * @param {object} nextState The next state of the application
	 * @param {func} replace A routing function callback.
	 * @return {null}
	 *
	 * @TODO Make this user definable (to work with other routers)
	 * @TODO allow the user to pass in the 'redirect' path
	 */
	requireRouteAuth: function(nextState, replace) {
		if (! _isAuthenticated) {
			replace({
				pathname : '/',
				state    : { nextPathname: nextState.location.pathname }
			});
		}
	}

});

/**
 * Event Listeners
 */
AuthStore.dispatchToken = AppDispatcher.register(function(action) {
	switch (action.type) {
		default:
			break;
	}
});

module.exports = AuthStore;
