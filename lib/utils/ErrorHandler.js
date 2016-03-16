var ErrorActions = require('../actions/ErrorHandlingActionCreators');

var ErrorHandler = {
	logError: function(message) {
		console.error(message);
	},

	failedDataRetrieval: function (error, message) {
		this.logError(message);
		// This dispatches an error event to the dispatcher which then fires a callback in the errorstore which then
		// emits a change to the app error handling component which displays the error alert
		ErrorActions.failedDataRetrieval(error, message);
	}
};

module.exports = ErrorHandler;
