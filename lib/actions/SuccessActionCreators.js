var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppActionConstants = require('../constants/AppActionConstants');

var ActionTypes = AppActionConstants.ActionTypes.alerts;

module.exports = {
	success: function (status, message) {
		AppDispatcher.dispatch({
			type: ActionTypes.ALERT_SUCCESS,
			message: message,
			actionOrError: status
		});
	}
};
