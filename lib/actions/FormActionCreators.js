var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppActionConstants = require('../constants/AppActionConstants');

var ActionTypes = AppActionConstants.ActionTypes.cms.form;

module.exports = {
	registerForm: function (formKey, resource) {
		// Dirty workaround for dispatch event collisions
		if (AppDispatcher.isDispatching()) {
			setTimeout(function () {
				AppDispatcher.dispatch({
					type: ActionTypes.FORM_REGISTER_FORM,
					formKey: formKey,
					resource: resource
				});
			}, 0);
		} else {
			AppDispatcher.dispatch({
				type: ActionTypes.FORM_REGISTER_FORM,
				formKey: formKey,
				resource: resource
			});
		}
	},

	editField: function (formKey, fieldKey, value, isValid) {
		AppDispatcher.dispatch({
			type: ActionTypes.FORM_EDIT_FIELD,
			formKey: formKey,
			fieldKey: fieldKey,
			value: value,
			isValid: isValid
		});
	},

	clearTypeaheadQueryData: function(formKey) {
		AppDispatcher.dispatch({
			type: ActionTypes.FORM_CLEAR_TYPEAHEAD_QUERY,
			formKey: formKey
		});
	}
};
