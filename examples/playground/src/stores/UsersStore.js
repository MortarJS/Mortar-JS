var FuzzyReaction      = require('../bootstrap').MortarJS;

var Paginator          = FuzzyReaction.Utils.Paginator;
var ModelStore         = FuzzyReaction.Stores.ModelStore;
var AppDispatcher      = FuzzyReaction.Dispatcher;

var AppActionConstants = require('../constants/AppActionConstants');
var ActionTypes        = AppActionConstants.ActionTypes.users;

/**
 * Data stores
 * @type {Array}
 * @private
 */
// Store for user table data
var _resourceListData = [];
var _user = {};

/**
 * User store logic
 *
 * @type {*|exports}
 */
var UsersStore = Object.assign({}, ModelStore, {
	getResourceListData: function () {
		//return this._mutateAttributes();
		return _resourceListData
	},


	getResourceById: function (id) {
		// http://stackoverflow.com/questions/12553274/getting-index-of-an-arrays-element-based-on-its-properties
		var index = _resourceListData.map(function(item) {
			return item.id
		}).indexOf(Number(id));

		return _resourceListData[index];
	},

	getUser: function () {
		return _user;
	}
});

/**
 * Event Listeners
 */
UsersStore.dispatchToken = AppDispatcher.register(function(action) {
	switch(action.type) {
		case 'USERS_LISTED':
			_resourceListData = action.data.users;

			UsersStore.emitChange();
			break;

		case 'USERS_RECEIVED':
			_user = action.data;

			UsersStore.emitChange();
			break;

		case 'USERS_UPDATED':
			UsersStore.emitChange();
			break;

		case 'USERS_CREATED':
			_user = action.data;
			UsersStore.emitChange();
			break;
	}
});

module.exports = UsersStore;

