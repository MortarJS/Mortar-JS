var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppActionConstants = require('../constants/AppActionConstants');
var assign = require('react/lib/Object.assign');
var BaseStore = require('./BaseStore');
var QueryHelper = require('../utils/QueryHelper');

var ActionTypes = AppActionConstants.ActionTypes.cms.pagination;

/**
 * Store for paginated data
 * @class PaginationStore
 * @type {Object}
 *
 * @memberOf Stores.PaginationStore
 * @see {@link Stores}
 */
var _paginationData = {};

/**
 * @class PaginationStore
 *
 * @memberOf Stores
 */
var PaginationStore = assign({}, BaseStore, {
	/**
	 * Pull out the query string
	 *
	 * @memberOf Stores.PaginationStore
	 *
	 * @param {string} url The url with a query to rip out.
	 *
	 * @returns {*}
	 */
	getQuery: function (url) {
		var query = url.split('?')[1];

		return QueryHelper.deserialize(query); // @TODO condense
	},

	/**
	 * Retrieve the appopriate query parameters (modifiers)
	 * @memberOf Stores.PaginationStore
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
	 * @memberOf Stores.PaginationStore
	 *
	 * @returns {*}
	 */
	getCurrentPage: function () {
		return _paginationData.current_page;
	},

	/**
	 * Retrieve page count
	 * @memberOf Stores.PaginationStore
	 *
	 * @returns {number}
	 */
	getTotalPages: function () {
		return Math.ceil(_paginationData.total / _paginationData.per_page);
	},

	/**
	 * Retrieve per page count
	 * @memberOf Stores.PaginationStore
	 *
	 * @returns {paginationModifiers.per_page|*}
	 */
	getPerPage: function () {
		return _paginationData.per_page;
	}

});

PaginationStore.dispatchToken = AppDispatcher.register(function(action) {
	switch (action.type) {
		case ActionTypes.RECEIVED_PAGINATED_DATA:
			// Set key to the requested URI
			_paginationData = action.paginationObject;


			PaginationStore.emitChange();
			break;
		default:
			break;
	}
});

module.exports = PaginationStore;
