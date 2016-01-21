var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var assign = require('react/lib/Object.assign');
var BaseStore = require('./BaseStore');

var CHANGE_EVENT = 'change';

/**
 * @class ModelStore
 * @type {Object}
 *
 * @memberOf Stores
 * @see {@link Stores}
 *
 * @todo Work in progress
 */
var ModelStore = assign({}, BaseStore, {
});

module.exports = ModelStore;
