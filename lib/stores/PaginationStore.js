var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppActionConstants = require('../constants/AppActionConstants');
var assign = require('react/lib/Object.assign');
var BaseStore = require('./BaseStore');
var QueryHelper = require('../utils/QueryHelper');

var ActionTypes = AppActionConstants.ActionTypes.cms.pagination;

// Store for paginated data
var _paginationData = {};

var PaginationStore = assign({}, BaseStore, {
	/**
	 * Pull out the query string
	 *
	 * @param url
	 * @returns {*}
	 */
	getQuery: function (url) {
		var query = url.split('?')[1];

		return QueryHelper.deserialize(query); //@todo condense
	},

	/**
	 * Retrieve the appopriate query parameters (modifiers)
	 *
	 * @returns {*}
	 */
	getRequestedModifiers: function () {
		if (! _paginationData.links.next === null || ! _paginationData.links.previous) {
			return {};
		}

		// At this point, either link will contain the previous requested modifiers (filter, query, etc);
		return this.getQuery(_paginationData.links.next || _paginationData.links.previous);
	},

	/**
	 * Retrieve current page
	 *
	 * @returns {*}
	 */
	getCurrentPage: function () {
		return _paginationData.current_page;
	},

	/**
	 * Retrieve page count
	 *
	 * @returns {number}
	 */
	getTotalPages: function () {
		return Math.ceil(_paginationData.total / _paginationData.per_page);
	},

	/**
	 * Retrieve per page count
	 *
	 * @returns {paginationModifiers.per_page|*}
	 */
	getPerPage: function () {
		return _paginationData.per_page;
	}

});

PaginationStore.dispatchToken = AppDispatcher.register(function(action) {
	switch(action.type) {
		case ActionTypes.RECEIVED_PAGINATED_DATA:
			// Set key to the requested URI
			_paginationData = action.paginationObject;


			PaginationStore.emitChange();
			break;
	}
});

module.exports = PaginationStore;
