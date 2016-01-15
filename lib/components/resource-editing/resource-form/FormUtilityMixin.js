var _         = require('lodash');
var React     = require('react/addons');
var FormStore = require('../../../stores/FormStore');

/**
 * A mixin for simplifying some typical functionality inside Mortar's Form Components.
 * Typically only used internally to clean up Form components and reduce repeat code.
 *
 * @mixin
 */
var FormUtility = {
	/**
	 * Finds the value of a potentially deeply nested key in an object, and returns it.
	 *
	 * @example
	 * var formResource = {user: {first_name: 'Kyle'}};
	 * _findValueByPath(formResource, 'user.first_name'); // 'Kyle'
	 * @private
	 *
	 * @param {object} object a
	 * @param {string} path a
	 *
	 * @return {value}
	 * @TODO: can this be removed?
	 */
	_findValueByPath: function (object, path) {
		return _.get(object, path);
	},

	/**
	 * Simply checks to see whether or not the two values are truly equal
	 *
	 * @private
	 *
	 * @param {*} first
	 * @param {*} second
	 *
	 * @return {boolean}
	 * @TODO: can this be removed?
	 */
	_checkOptionEquality: function (first, second) {
		// When bindResource[field] is 0, JS casts it to null so we need additional checks to properly equate in these cases
		return first == second || // Soft comparisons b/c JS can't decide if things should be strings or ints
			(first == null &&
			second >= null &&
			second <= null)
	},

	/**
	 * Checks to see if the help text for a component should be rendered, and handles rendering it.
	 *
	 * @private
	 *
	 * @param {string} helpText
	 *
	 * @return {jsx}
	 * @TODO can this be removed?
	 */
	_shouldRenderHelpBlock: function (helpText) {
		// React currently doesn't support overriding mixins
		if (typeof helpText !== 'undefined') {
			return (
				<p className="help-block">{this.props.helpText}</p>
			);
		}
	},

	/**
	 * _checkFieldIsValid
	 *
	 * @private
	 *
	 * @return {null}
	 *
	 * @TODO: this should be sunset since addition of schemas
	 */
	_checkFieldIsValid: function () {
		// If this component should be checked against a custom validation function
		if (typeof this.props.validityCheck === 'func') {
			return this.props.validityCheck(this.state.fieldValue, this.props.fieldKey);
		} else if (typeof this.props.formKey === 'string') {
			// If part of a Form
			return ! FormStore.isFieldValid(this.props.formKey, this.props.fieldKey);
		}
	},

	/**
	 * Handles changes to form components and handles setting state with the new value
	 * as well as firing a change callback to set the field in the parent component.
	 *
	 * @public
	 *
	 * @param {event} event
	 *
	 * @return {null}
	 */
	handleChange: function (event) {
		// Custom component change handler
		if (typeof this.customHandleChange !== 'undefined') {
			this.customHandleChange(event);
			return;
		}

		this.setState({
			fieldValue: event.target.value
		});

		this.props.changeCallback(this.props.fieldKey, event.target.value, this);
	},

	/**
	 * setValidationState
	 *
	 * @public
	 * @param {bool} isValid
	 * @param {function} cb
	 * @return {null}
	 */
	setValidationState: function (isValid, cb) {
		this.setState({
			isValid: isValid
		}, cb());
	}
};

module.exports = FormUtility;
