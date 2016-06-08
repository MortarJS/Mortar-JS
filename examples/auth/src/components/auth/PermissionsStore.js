// External
var _             = require('lodash');
var Mortar        = require('../../bootstrap').MortarJS;

// Components
var AppDispatcher = Mortar.Dispatcher;

// Stores
var AuthStore     = require('./AuthStore');
var ModelStore    = Mortar.Stores.ModelStore;

// Globals
var _permissions = ['super-admin', 'admin', 'bot'];

/**
 * @class PermissionsStore
 * @type {Object}
 *
 * @memberOf Stores
 * @see {@link Stores}
 */
var PermissionsStore = Object.assign({}, ModelStore, {

	/**
	 * denyRoutePermissions
	 *
	 * @param {Array<string>|string} required The required permissions for this route
	 * @param {object} nextState The next state of the application
	 * @param {func} replace A routing function callback.
	 * @return {null}
	 *
	 * @TODO Make this user definable (to work with other routers)
	 * @TODO allow the user to pass in the 'redirect' path
	 */
	denyRoutePermissions: function(required, nextState, replace) {
		if (typeof required === "string") {
			required = [required];
		}

		if (_.intersection(AuthStore.getUserPermissions(), required).length > 0) {
			replace({
				pathname : '/',
				state    : { nextPathname: nextState.location.pathname }
			});
		}
	},

	/**
	 * requireRoutePermissions
	 *
	 * @param {Array<string>|string} required The required permissions for this route
	 * @param {object} nextState The next state of the application
	 * @param {func} replace A routing function callback.
	 * @return {null}
	 *
	 * @TODO Make this user definable (to work with other routers)
	 * @TODO allow the user to pass in the 'redirect' path
	 */
	requireRoutePermissions: function(required, nextState, replace) {
		if (typeof required === "string") {
			required = [required];
		}

		if (! _.intersection(AuthStore.getUserPermissions(), required).length > 0) {
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
PermissionsStore.dispatchToken = AppDispatcher.register(function(action) {
	switch (action.type) {
		default:
			break;
	}
});

module.exports = PermissionsStore;
