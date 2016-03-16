var assign             = require('react/lib/Object.assign');

var BaseStore          = require('./BaseStore');
var AppDispatcher      = require('../dispatcher/AppDispatcher');
var AppActionConstants = require('../constants/AppActionConstants');

var ActionTypes        = AppActionConstants.ActionTypes.alerts;

// Store for alert messages
var _alert = {
	isError       : false,
	actionOrError : '',
	message       : ''
};

/**
 * Error store logic
 *
 * @class AlertStore
 * @type {Object}
 * @private
 *
 * @memberOf Stores
 * @see {@link Stores}
 *
 * @todo how will this handle multiple error messages
 */

var AlertStore = assign({}, BaseStore, {
	isError: function () {
		return _alert.isError;
	},

	getAlert: function () {
		return _alert;
	}
});

/**
 * Event Listeners
 */
AlertStore.dispatchToken = AppDispatcher.register(function(action) {
	switch (action.type) {
		case ActionTypes.ALERT_ERROR:
			_alert.isError = true;
			_alert.actionOrError = 'Error: ' + action.actionOrError;
			_alert.message = action.message;

			AlertStore.emitChange();
			break;
		case ActionTypes.ALERT_SUCCESS:
			_alert.isError = false;
			_alert.actionOrError = action.actionOrError;
			_alert.message = action.message;

			AlertStore.emitChange();
			break;
		default:
			break;
	}
});

module.exports = AlertStore;
