var BaseStore          = require('./BaseStore');
var AppDispatcher      = require('../dispatcher/AppDispatcher');
var AppActionConstants = require('../constants/AppActionConstants');

var ActionTypes        = AppActionConstants.ActionTypes.cms.form;

var _userProperties = {
	isEditingForm: false
};

/**
 * @class GeneralCmsStore
 * @type {Object}
 *
 * @memberOf Stores
 * @see {@link Stores}
 *
 */
var GeneralCmsStore = Object.assign({}, BaseStore, {
	/**
	 * isEditingForm
	 * @memberOf Stores.GeneralCmsStore
	 *
	 * @return {boolean}
	 */
	isEditingForm: function () {
		return _userProperties.isEditingForm;
	}
});

/**
 * Event Listeners
 */
GeneralCmsStore.dispatchToken = AppDispatcher.register(function(action) {
	switch (action.type) {
		case ActionTypes.USER_CHANGED_FORM_EDITING_STATE:
			_userProperties.isEditingForm = action.isEditing;

			GeneralCmsStore.emitChange();
			break;
		default:
			break;
	}
});

module.exports = GeneralCmsStore;
