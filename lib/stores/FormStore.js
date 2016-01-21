// Extneral
var _                   = require('lodash');
var assign              = require('react/lib/Object.assign');

// Components
var AppActionConstants  = require('../constants/AppActionConstants');

var ActionTypes         = AppActionConstants.ActionTypes.cms.form;
var AppDispatcher       = require('../dispatcher/AppDispatcher');

// Stores
var BaseStore           = require('./BaseStore');

// Globals
var _formStore          = {};
var _currentFormKey     = '';
var _typeaheadQueryData = {};

/**
 * @class FormStore
 * @type {Object}
 *
 * @memberOf Stores
 * @see {@link Stores}
 */
var FormStore = assign({}, BaseStore, {
	getField: function (formKey, fieldKey) {
		// Find the field value with a path string like 'property1.subProperty'
		return _.get(_formStore[formKey].resource, fieldKey);
	},

	hasForm: function (formKey) {
		return _formStore.hasOwnProperty(formKey);
	},

	getResource: function (formKey) {
		if (! formKey || formKey === '' || formKey === 'undefined') {
			throw new Error('Form key cannot be undefined');
		}

		if (! _formStore[formKey]) {
			return {};
		}

		return _formStore[formKey].resource;
	},

	getCurrentFormKey: function () {
		return _currentFormKey;
	},

	isFormValid: function (formKey) {
		return _formStore[formKey].isValid;
	},

	isFieldValid: function (formKey, fieldKey) {
		if (! _formStore[formKey]) {
			// Default when form hasn't been registered yet. @todo bind earlier
			return true;
		}

		var fieldValidity = _formStore[formKey].validations[fieldKey];
		return typeof fieldValidity === 'undefined' ? true : fieldValidity;
	},

	getTypeaheadQueryData: function (formKey) {
		return _typeaheadQueryData[formKey];
	},

	_setField: function (object, path, value) {
		return _.set(object, path, value);
	},

	_validateForm: function (formKey) {
		var formIsValid = true;

		var formFieldsValidities = _formStore[formKey].validations;
		Object.keys(formFieldsValidities).forEach(function (fieldKey) {
			if (! formFieldsValidities[fieldKey]) {
				formIsValid = false;
			}
		});

		_formStore[formKey].isValid = formIsValid;
	}
});

/**
 * Event Listeners
 */
FormStore.dispatchToken = AppDispatcher.register(function(action) {
	switch(action.type) {
		case ActionTypes.FORM_REGISTER_FORM:
			// @todo set form editing state here?
			_formStore[action.formKey] = {};
			_formStore[action.formKey].validations = _formStore[action.formKey].validations || action.validations || {};
			_formStore[action.formKey].resource = action.resource;
			_formStore[action.formKey].isValid = typeof action.isValid === 'boolean' ? action.isValid : true;
			_currentFormKey = action.formKey;

			// This event does not emit a change.
			FormStore.emitChange();
			break;
		case ActionTypes.FORM_EDIT_FIELD:
			// Bind the edited field to the resource
			_formStore[action.formKey].resource = FormStore._setField(
				_formStore[action.formKey].resource,
				action.fieldKey,
				action.value
			);

			_formStore[action.formKey].validations[action.fieldKey] = action.isValid;
			FormStore._validateForm(action.formKey);

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
