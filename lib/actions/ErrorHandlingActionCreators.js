var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppActionConstants = require('../constants/AppActionConstants');

var ActionTypes = AppActionConstants.ActionTypes.alerts;

module.exports = {
	failedDataRetrieval: function (error, message) {
		AppDispatcher.dispatch({
			type: ActionTypes.ALERT_ERROR,
			message: message,
			actionOrError: error
		});
	}
};
