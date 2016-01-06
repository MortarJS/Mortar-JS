var SuccessActions = require('../actions/SuccessActionCreators');

var ErrorHandler = {
	success: function (status, message) {
		SuccessActions.success(status, message)
	}
};

module.exports = ErrorHandler;
