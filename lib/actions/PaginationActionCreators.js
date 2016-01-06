var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppActionConstants = require('../constants/AppActionConstants');
var PaginationStore = require('../stores/PaginationStore'); // @todo temp

var ActionTypes = AppActionConstants.ActionTypes.cms.pagination;

module.exports = {
	acceptPaginatedData: function (paginationObject) {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVED_PAGINATED_DATA,
			paginationObject: paginationObject
		});
	}
};
