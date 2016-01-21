var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppActionConstants = require('../constants/AppActionConstants');
var assign = require('react/lib/Object.assign');
var BaseStore = require('./BaseStore');

var ActionTypes = AppActionConstants.ActionTypes.cms.form;

var _userProperties = {
	isEditingForm: false
}

/**
 * @class GeneralCmsStore
 *
 * @memberOf Stores
 *
 */
var GeneralCmsStore = assign({}, BaseStore, {
	isEditingForm: function () {
		return _userProperties.isEditingForm;
	}
});

/**
 * Event Listeners
 */
GeneralCmsStore.dispatchToken = AppDispatcher.register(function(action) {
	switch(action.type) {
		case ActionTypes.USER_CHANGED_FORM_EDITING_STATE:
			_userProperties.isEditingForm = action.isEditing;

			GeneralCmsStore.emitChange();
			break;
	}
});

module.exports = GeneralCmsStore;
