// External
import Immutable from "immutable";

// Components
var AppActionConstants  = require('../constants/AppActionConstants');

var ActionTypes         = AppActionConstants.ActionTypes.cms.form;
var AppDispatcher       = require('../dispatcher/AppDispatcher');

// Stores
var BaseStore           = require('./BaseStore');

// Globals
// var _formStore          = {};
var _formStore = new Map();
var _currentFormKey     = '';
var _typeaheadQueryData = {};

/**
 * @class FormStore
 * @type {Object}
 *
 * @memberOf Stores
 * @see {@link Stores}
 */
var FormStore = Object.assign({}, BaseStore, {
	getField: function (formKey, fieldKey) {
		let formData = _formStore.get(formKey),
			path = `resource.${fieldKey}`.split('.');

		if (! formData) {
			return false;
		}

		return formData.getIn(path);
	},

	hasForm: function (formKey) {
		return _formStore.includes(formKey);
	},

	getResource: function (formKey) {
		if (! formKey || formKey === '' || formKey === 'undefined') {
			throw new Error('Form key cannot be undefined');
		}

		return _formStore.get(formKey).get('resource').toJSON();
	},

	getCurrentFormKey: function () {
		return _currentFormKey;
	},

	isFormValid: function (formKey) {
		let formData = _formStore.get(formKey);

		if (! formData) {
			return false;
		}

		return _formStore.get(formKey).get('isValid');
	},

	isFieldValid: function (formKey, fieldKey) {
		let formData = _formStore.get(formKey);

		if (! formData) {
			return false;
		}

		let validity = formData.getIn(`validations.${fieldKey}`);

		return typeof validity  === 'undefined' ? true : validity;
	},

	getTypeaheadQueryData: function (formKey) {
		return _typeaheadQueryData[formKey];
	},

	_setField: function (formKey, fieldKey, value) {
		let formData = _formStore.get(formKey),
			path = `resource.${fieldKey}`.split('.');

		formData = formData.setIn(path, value);
		_formStore.set(formKey, formData);
	},

	_validateForm: function (formKey) {
		let formIsValid = true,
			formFieldsValidities = _formStore.get(formKey).get('validations');

		Object.keys(formFieldsValidities).forEach((fieldKey) => {
			if (! formFieldsValidities.get(fieldKey)) {
				formIsValid = false;
			}
		});

		_formStore.get(formKey).set('isValid', formIsValid);
	}
});

/**
 * Event Listeners
 */
FormStore.dispatchToken = AppDispatcher.register(function(action) {
	let formData = {};

	switch (action.type) {
		case ActionTypes.FORM_REGISTER_FORM:
			// @todo set form editing state here?
			formData = {};

			formData.validations = formData.validations || action.validations || {};
			formData.resource = action.resource;
			formData.isValid = typeof action.isValid === 'boolean' ? action.isValid : true;
			_currentFormKey = action.formKey;

			_formStore.set(action.formKey, Immutable.fromJS(formData));

			FormStore.emitChange();
			break;

		case ActionTypes.FORM_EDIT_FIELD:
			FormStore._setField(action.formKey, action.fieldKey, action.value);

			FormStore.emitChange();
			break;

		case ActionTypes.TYPEAHEAD_QUERY:
			_typeaheadQueryData[action.eventData.formKey] = action.data;

			FormStore.emitChange();
			break;

		case ActionTypes.FORM_CLEAR_TYPEAHEAD_QUERY:
			_typeaheadQueryData[action.formKey] = [];
			break;
		default:
			break;
	}
});

module.exports = FormStore;
