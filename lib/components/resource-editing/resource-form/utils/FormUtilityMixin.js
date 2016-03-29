var _         = require('lodash');
var React     = require('react/addons');
var FormStore = require('../../../../stores/FormStore');

/**
 * A mixin for simplifying some typical functionality inside Mortar's Form Components.
 * Typically only used internally to clean up Form components and reduce repeat code.
 *
 * @mixin
 */
var FormUtility = {


	/**
	 * Adds a change listener to the FormStore that fires `this._updateFieldData` on change.
	 *
	 * @private
	 * @return {null}
	 */
	_componentDidMount: function() {
		FormStore.addChangeListener(this._updateFieldData);
	},

	/**
	 * Removes the change listener.
	 *
	 * @private
	 * @return {null}
	 */
	_componentWillUnmount: function() {
		FormStore.removeChangeListener(this._updateFieldData);
	},

	/**
	 * Any time a change is registered to a form, the component will request it's data from the FormStore.
	 *
	 * So, any time a form component changes, it will automatically request it's updated data from the FormStore
	 * and bind the new value to state.  In this way, form components are responsible for re-rendering on update,
	 * and for keeping track of their own state.  This ensures that all data is kept in the FormStore, and there's
	 * no chance for data to get out of sync.
	 *
	 * @private
	 * @return {null}
	 */
	_updateFieldData: function() {
		this.setState({fieldValue: FormStore.getField(this.props.formKey, this.props.fieldKey)});
	},

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
	 * @TODO: sunset in favor of FormStore.getValue
	 */
	_findValueByPath: function (object, path) {
		return _.get(object, path);
	},

	/**
	 * Checks to see if the help text for a component should be rendered, and handles rendering it.
	 *
	 * @private
	 *
	 * @param {string} helpText The help text to render
	 *
	 * @return {jsx}
	 * @TODO sunset
	 */
	_shouldRenderHelpBlock: function (helpText) {
		if (typeof helpText !== 'undefined') {
			return (
				<p className="help-block">{this.props.helpText}</p>
			);
		}

		return false;
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
		if (typeof this.props.validityCheck === 'function') {
			return this.props.validityCheck(this.state.fieldValue, this.props.fieldKey);
		} else if (typeof this.props.formKey === 'string') {
			// If part of a Form
			return ! FormStore.isFieldValid(this.props.formKey, this.props.fieldKey);
		}

		return false;
	},

	/**
	 * Handles changes to form components and handles setting state with the new value
	 * as well as firing a change callback to set the field in the parent component.
	 *
	 * @public
	 *
	 * @param {event} event The event triggering the change
	 *
	 * @return {null}
	 * @TODO: sunset
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
	 * @param {bool} isValid If the field is valid or not
	 * @param {function} cb  A callback to trigger
	 *
	 * @return {null}
	 */
	setValidationState: function (isValid, cb) {
		this.setState({
			isValid: isValid
		}, cb());
	}
};

module.exports = FormUtility;
