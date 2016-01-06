var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var assign = require('react/lib/Object.assign');
var BaseStore = require('./BaseStore');

var CHANGE_EVENT = 'change';

var ModelStore = assign({}, BaseStore, {
});

module.exports = ModelStore;


