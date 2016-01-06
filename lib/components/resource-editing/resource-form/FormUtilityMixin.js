var _ = require('lodash');
var React = require('react/addons');
var FormStore = require('../../../stores/FormStore');

var FormUtility = {
	_findValueByPath: function (object, path) {
		// Find the field value with a path string like 'property1.subProperty'
		return _.get(object, path);
	},

	_checkOptionEquality: function (first, second) {
		// When bindResource[field] is 0, JS casts it to null so we need additional checks to properly equate in these cases
		return first == second || // Soft comparisons b/c JS can't decide if things should be strings or ints
			(first == null &&
			second >= null &&
			second <= null)
	},

	_shouldRenderHelpBlock: function (helpText) {
		// React currently doesn't support overriding mixins
		if (typeof helpText !== 'undefined') {
			return (
				<p className="help-block">{this.props.helpText}</p>
			);
		}
	},

	_checkFieldIsValid: function () {
		// If this component should be checked against a custom validation function
		if (typeof this.props.validityCheck === 'func') {
			return this.props.validityCheck(this.state.fieldValue, this.props.fieldKey);
		} else if (typeof this.props.formKey === 'string') {
			// If part of a Form
			return ! FormStore.isFieldValid(this.props.formKey, this.props.fieldKey);
		}
	},

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

	setValidationState: function (isValid, cb) {
		this.setState({
			isValid: isValid
		}, cb());
	}
};

module.exports = FormUtility;
