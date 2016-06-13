var EventEmitter  = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');

var CHANGE_EVENT  = 'change';

import Immutable from "immutable";

/**
 * @class BaseStore
 * @type {Object}
 *
 * @memberOf Stores
 * @see {@link Stores}
 */

var BaseStore = Object.assign({}, EventEmitter.prototype, {
	_resource: {},

	initialize: function(resource) {
		this._resource = Immutable.fromJS(resource);
	},

	getResource: function() {
		return this._resource.toJSON();
	},

	getResourceAtPath: function(path) {
		if (typeof path === "string") {
			return this._resource.getIn(path.split('.'));
		}

		return this._resource.getIn(path);
	},

	setResource: function(value) {
		this.resource.set(value);
	},

	setResourceAtPath: function(path, value) {
		if (typeof path === "string") {
			return this._resource.setIn(path.split('.'), value);
		}

		return this._resource.setIn(path, value);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function (cb) {
		this.on(CHANGE_EVENT, cb);
	},

	removeChangeListener: function(cb) {
		this.removeListener(CHANGE_EVENT, cb);
	},

	subscribe: function (actionSubscribe) {
		this._dispatchToken = AppDispatcher.register(actionSubscribe());
	},

	getDispatchToken: function () {
		return this._dispatchToken;
	}
});

module.exports = BaseStore;
