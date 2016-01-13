/**
 * @namespace FormComponents
 */

// External Requirements
var _             = require('lodash');
var React         = require('react/addons');
var validator     = require('validator');
var isEmpty       = require('../../../utils/isEmpty');

// Page Components
var Row           = require('../../page-structure/Row');
var Column        = require('../../page-structure/Column');
var FormActions   = require('../../../actions/FormActionCreators');
var FormValidator = require('./FormValidator');

// Stores
var FormStore     = require('../../../stores/FormStore');

/**
 * This component is responsible for rendering all form components
 * as well as updating the form field's data in the FormStore.
 *
 * @class Form
 * @memberOf FormComponents
 */
var Form = React.createClass({
	propTypes: {
		// A unique identifier for this instance of the form component
		formKey: React.PropTypes.string.isRequired,
		// The resource to bind
		bindResource: React.PropTypes.oneOfType([
			React.PropTypes.object,
			React.PropTypes.array
		]).isRequired,
		// An optional submit handler
		onSubmit: React.PropTypes.func,
		schema: React.PropTypes.object
	},

	getInitialState: function () {
		return {
			isValid: true,
			boundResource: {}
		}
	},

	/**
	 * Container for the bound resource
	 */
	boundResource: {},

	validator: null,

	/**
	 * Bubble up form's boundResource with parent state.
	 *
	 * @param resource
	 * @param isValid
	 */
	syncBoundResource: function (resource, isValid) {
		this.props.bindResourceCallback(resource, this.state.isValid);
	},

	componentDidMount: function () {
		var self = this;

		if (self.props.schema) {
			self.validator = new FormValidator(self.props.schema);
		}

		// Set the bound resource that will be passed down to child components
		self.setState({
			boundResource: self.props.bindResource
		}, function() {
			if (! isEmpty(self.state.boundResource) && self.props.schema) {
				self.validateAndRegisterFormAgainstSchema();
			} else {
				FormActions.registerForm(self.props.formKey, self.props.bindResource);
			}
		});
	},

	/**
	 * Form component receives props on every parent state change (when form fields are edited). On these events,
	 * we need to sync the form's resource with parent's state.
	 *
	 * @param nextProps
	 */
	componentWillReceiveProps: function (nextProps) {
		this.boundResource = nextProps.bindResource; // Sync form's resource with parent's state
		//FormActions.registerForm(this.props.formKey, this.props.bindResource); @todo is this needed?

		// Set the bound resource that will be passed down to child components
		this.setState({
			boundResource: nextProps.bindResource
		});
	},

	/**
	 * Master parent change handler for every child form field component.
	 *
	 * @param path
	 * @param value
	 * @param component
	 */
	handleChange: function (fieldKey, value, component) {
		var self = this;

		// If there's a schema, we validate using that
		if (self.props.schema) {
			// Clone the form's data to test against
			var form = _.cloneDeep(FormStore.getResource(self.props.formKey));

			// Set the value of the updated field locally so we can validate before saving
			_.set(form, fieldKey, value);

			// Test all the fields, including the locally-edited one
			var errors = self.validator.validate(form);

			// If there's errors returned from the validator, we set those fields to invalid
			if (errors) {
				var errorFields = self.getNestedFieldKeys(errors);

				errorFields.forEach(function(field) {
					FormActions.editField(self.props.formKey, field, _.get(form, field), false);
				});

				// If the errors don't include the field we editited, we save the value and set isValid to true
				if (! errorFields.includes(fieldKey)) {
					FormActions.editField(self.props.formKey, fieldKey, value, true);
				}

			// If there are no errors, we just save the edited field as valid
			} else {
				FormActions.editField(self.props.formKey, fieldKey, value, true)
			}

		// If there's no included schema, we proceed with saving the value using local validation
		} else {
			var isValid = self.validate(fieldKey, value);
			// Apply the change
			FormActions.editField(self.props.formKey, fieldKey, value, isValid);
		}
	},

	/**
	 * When there's a schema, handles validating the form and registering it.
	 *
	 * This is used to flag invalid fields on page-load
	 *
	 * @return {null}
	 */
	validateAndRegisterFormAgainstSchema: function() {
		var self = this,
			validations = {},
			isValid;

		// Clone the form's data to test against
		var resource = this.state.boundResource;

		// Test all the fields on the form
		var errors = self.validator.validate(resource);

		// If there's errors returned from the validator, we set those fields to invalid
		if (errors) {
			var errorFields = self.getNestedFieldKeys(errors);

			isValid = false;

			errorFields.forEach(function(field) {
				validations[field] = false;
			});
		}

		FormActions.registerForm(this.props.formKey, resource, validations, isValid);
	},

	/**
	 * Takes an object with infinitely nested values and grabs the paths to all values
	 *
	 * Example:
	 *	var obj = {a: 1, b: {c: 2}};
	 *	getNestedFieldKeys(obj); // ['a', 'b.c']
	 *
	 * @param {object} obj The object to be flattened
	 *
	 * @return {array}     An array of paths to all values on the object
	 */
	getNestedFieldKeys: function(obj) {
		var self = this;

		return Object.keys(obj).map(function(key) {
			if (typeof obj[key] === 'object') {
				return self.getNestedFieldKeys(obj[key]).map(function(deepKey) {
					return '{}.{}'.format(key, deepKey);
				});
			} else {
				return key;
			}
		}).reduce(function(array, value) {
			return array.concat(value);
		}, []);
	},

	// @todo this might be helpful to fully flesh out and use
	determineColumnSize: function () {
		var columns = React.Children.count(this.props.children);
		return Math.floor(12 / columns);
	},

	/**
	 * Handle attaching universal properties to all children
	 */
	componentWillMount: function () {
		this.traverseChildren(this.props.children);
	},

	componentWillUnmount: function () {
		this.boundResource = {}; // Clear bound resource
	},

	/**
	 * Container for all form field components. This is only for observation of child components, not for modifying them.
	 */
	formFields: {},

	/**
	 * Built upon http://christianalfoni.github.io/javascript/2014/10/22/nailing-that-validation-with-reactjs.html
	 *
	 * @param component
	 * @param value
	 */
	validate: function (fieldKey, value) {
		var formField = this.formFields[fieldKey];

		if (formField.required && (!value || value.length < 1)) {
			return false;
		}

		// If no validations, don't continue
		if (! formField.validations) {
			return true;
		}

		var isValid = true;

		if (value || (formField.required === true)) {
			// Parse the validations string
			formField.validations.split(',').forEach(function (validation) {
				var args = validation.split(':');
				var validationMethod = args.shift(); // ['isLength', 5] -> 'isLength'

				args = args.map(function (arg) {
					return JSON.parse(arg); // Coerce values to correct types
				});

				args = [value].concat(args);

				// Call validator with ['isValidationMethod', 'arg1', 'arg2']
				if (! validator[validationMethod].apply(validator, args)) {
					isValid = false;
				}
			});
		}

		// Call child component callback to set its state, and register the full form validator as a callback
		//component.setValidationState(isValid, this.validateForm); @todo set field validity state
		return isValid;
	},

	/**
	 * Validate form in full
	 */
	validateForm: function () {
		this.setState({
			isValid: FormStore.isFormValid()
		});
	},

	/**
	 * Dynamically (recursively) traverse every child component and set some universal properties for them.
	 *
	 * @param children
	 * @returns {*}
	 */
	traverseChildren: function (children) {
		return React.Children.map(children, function (child) {
			if (! child || ! child.props) {
				return child;
			}

			if (children.props && typeof children.props.changeCallback === 'function') {
				var changeCallback = children.props.changeCallback;
			} else {
				var changeCallback = this.handleChange;
			}

			if (child.props.fieldKey) {
				child = React.addons.cloneWithProps(child, {
					changeCallback: changeCallback,
					bindResource: this.props.bindResource,
					formKey: this.props.formKey
				});

				this.formFields[child.props.fieldKey] = {
					validations: child.props.validations || false,
					required: child.props.required ? true : false,
					isValid: FormStore.isFieldValid(this.props.formKey, child.props.fieldKey)
				}
			}

			if (child.props.children) {
				child = React.addons.cloneWithProps(child, {
					children: this.traverseChildren(child.props.children)
				});
			}

			return child;
		}.bind(this))
	},

	/**
	 * Determine if there's an onSubmit handler available
	 *
	 * @param event
	 */
	handleSubmit: function (event) {
		event.preventDefault();
		this.props.onSubmit ? this.props.onSubmit(event) : void(0);
	},

	render: function () {
		return (
			<form role="form" onSubmit={this.handleSubmit}>
				{this.traverseChildren(this.props.children)}
			</form>
		)
	}
});

// The currently available form components

// Layout
Form.Row             = Row;
Form.Column          = Column;
Form.Submit          = require('./Submit');

// Text Input
Form.Input           = require('./Input');
Form.FizzyWig        = require('./FizzyWig');
Form.TextArea        = require('./TextArea');
Form.TypeAheadInput  = require('./TypeAheadInput');

// Selection
Form.File            = require('./FileInput');
Form.Checkbox        = require('./Checkbox');
Form.SelectBox       = require('./SelectBox');
Form.RadioButtons    = require('./RadioButtons');
Form.DropdownSelect  = require('./DropdownSelect');

// Date && Time
Form.DatePicker      = require('./Time/DatePicker');
Form.TimePicker      = require('./Time/TimePicker');

module.exports = Form;
