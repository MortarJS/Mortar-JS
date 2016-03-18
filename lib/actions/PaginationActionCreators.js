var AppDispatcher      = require('../dispatcher/AppDispatcher');
var PaginationStore    = require('../stores/PaginationStore'); // @todo temp
var AppActionConstants = require('../constants/AppActionConstants');

var ActionTypes        = AppActionConstants.ActionTypes.cms.pagination;

module.exports = {
	acceptPaginatedData: function (paginationObject) {
		AppDispatcher.dispatch({
			type             : ActionTypes.RECEIVED_PAGINATED_DATA,
			paginationObject : paginationObject
		});
	}
};
