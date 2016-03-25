var BaseStore     = require('./BaseStore');
var EventEmitter  = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');

var CHANGE_EVENT  = 'change';

/**
 * @class ModelStore
 * @type {Object}
 *
 * @memberOf Stores
 * @see {@link Stores}
 *
 * @todo Work in progress
 */
var ModelStore = Object.assign({}, BaseStore, {
});

module.exports = ModelStore;
