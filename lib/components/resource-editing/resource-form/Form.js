/**
 * Form components are varied in implementation, but all focus on one thing: editing data.
 * All Form components can live outside of the '<Form>', but wrapping them in '<Form>' adds a lot of functionality.  For example, automatic updating of bound resources via the FormStore.
 *
 * In the below example, we require the Mortar Form, and create a working resource with the property "first_name".  We then bind that resource to the form, and reference the path to that key in `Br.Form.Input`.  The input is rendered with the value specified in 'workingResource'.  Now, any changes to that input field will be caught by the Form, and a change event will be fired in the 'FormStore'.
 *
 * Registering a change listener to the 'FormStore' will allow changes to be picked up in our component, and let us 'setState()' with any changes.
 *
 * @example
 * var Br = MortarJS.require('components', 'Form');
 * var FormStore = MortarJS.Stores.FormStore;
 *
 * // in the component:
 * workingResource = {first_name: 'Kyle'}
 *
 * // in component.render
 * <Br.Form key="a string" formKey="unique string" bindResource={this.workingResource}>
 *	<Br.Form.Input fieldKey="first_name" type="text" label="First Name" />
 *</Br.Form>
 *
 * @namespace FormComponents
 */

// External Requirements
var _             = require('lodash');
var React         = require('react');
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
 * as well as updating the form's field data in the FormStore.
 *
 * @class Form
 *
 * @memberOf FormComponents
 */
var Form = React.createClass({
	propTypes: {
		formKey      : React.PropTypes.string.isRequired, // A unique identifier for this instance of the form component
		bindResource : React.PropTypes.oneOfType([   // The resource to bind
			React.PropTypes.object,
			React.PropTypes.array
		]).isRequired,
		onSubmit : React.PropTypes.func,             // An optional submit handler
		schema   : React.PropTypes.object,
		children : React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		])
	},

	/**
	 * getInitialState
	 *
	 * @memberOf FormComponents.Form
	 *
	 * @return {object}
	 */
	getInitialState: function () {
		return {
			isValid       : true,
			boundResource : {}
		};
	},

	/**
	 * Container for the bound resource
	 * @memberOf FormComponents.Form
	 */
	boundResource: {},

	/**
	 * Instantiating the internal validate for later assignment.
	 * @memberOf FormComponents.Form
	 */
	validator: null,

	/**
	 * Container for all form field components.
	 * This is only for observation of child components, not for modifying them.
     *
	 * @memberOf FormComponents.Form
	 */
	formFields: {},

	/**
	 * componentDidMount
	 * @memberOf FormComponents.Form
	 *
	 * @return {null}
	 */
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
	 * @memberOf FormComponents.Form
	 *
	 * @param {object} nextProps The next props for this component
	 *
	 * @return {null}
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
	 * Handle attaching universal properties to all children
	 * @memberOf FormComponents.Form
	 *
	 * @return {null}
	 */
	componentWillMount: function () {
		this.traverseChildren(this.props.children);
	},

	/**
	 * componentWillUnmount
	 * @memberOf FormComponents.Form
	 *
	 * @return {null}
	 */
	componentWillUnmount: function () {
		this.boundResource = {}; // Clear bound resource
	},

	/**
	 * Master parent change handler for every child form field component.
	 *
	 * @memberOf FormComponents.Form
	 *
	 * @param {string} fieldKey  The path to the value on the object. e.g.'user.first_name'
	 * @param {*}      value     The value of the Form at the path
	 *
	 * @return {null}
	 */
	handleChange: function (fieldKey, value) {
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
				FormActions.editField(self.props.formKey, fieldKey, value, true);
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
	 * @memberOf FormComponents.Form
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
	 * @memberOf FormComponents.Form
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
					return key + '.' + deepKey;
				});
			}

			return key;

		}).reduce(function(array, value) {
			return array.concat(value);
		}, []);
	},

	/**
	 * Built upon http://christianalfoni.github.io/javascript/2014/10/22/nailing-that-validation-with-reactjs.html
	 *
	 * @memberOf FormComponents.Form
	 *
	 * @param {string} fieldKey The field key for the property to validate
	 * @param {*}      value    The value to validate
	 *
	 * @return {boolean}
	 */
	validate: function (fieldKey, value) {
		var formField = this.formFields[fieldKey];

		if (formField.required && (! value || value.length < 1)) {
			return false;
		}

		// If no validations, don't continue
		if (! formField.validations) {
			return true;
		}

		var isValid = true;

		if (value || formField.required === true) {
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
	 *
	 * @memberOf FormComponents.Form
	 *
	 * @return {null}
	 */
	validateForm: function () {
		this.setState({
			isValid: FormStore.isFormValid()
		});
	},

	/**
	 * Dynamically (recursively) traverse every child component and set some universal properties for them.
	 *
	 * @memberOf FormComponents.Form
	 *
	 * @param {*} children The children nodes of the Form component
	 *
	 * @returns {*}
	 */
	traverseChildren: function (children) {
		var self = this;

		return React.Children.map(children, function (child) {
			if (! child || ! child.props) {
				return child;
			}

			var changeCallback;

			if (children.props && typeof children.props.changeCallback === 'function') {
				changeCallback = children.props.changeCallback;
			} else {
				changeCallback = self.handleChange;
			}

			if (child.props.fieldKey) {
				child = React.cloneElement(child, {
					changeCallback : changeCallback,
					bindResource   : self.props.bindResource,
					formKey        : self.props.formKey
				});

				self.formFields[child.props.fieldKey] = {
					validations : child.props.validations || false,
					required    : child.props.required ? true : false,
					isValid     : FormStore.isFieldValid(self.props.formKey, child.props.fieldKey)
				};
			}

			if (child.props.children) {
				child = React.cloneElement(child, {
					children: self.traverseChildren(child.props.children)
				});
			}

			return child;
		});
	},

	/**
	 * Determine if there's an onSubmit handler available
	 *
	 * @memberOf FormComponents.Form
	 *
	 * @param {event} event The change event to handle
	 *
	 * @return {null}
	 */
	handleSubmit: function (event) {
		event.preventDefault();

		if (this.props.onSubmit) {
			this.props.onSubmit(event);
		}
	},

	/**
	 * Renders the form and all of its children
	 * @memberOf FormComponents.Form
	 *
	 * @return {jsx}
	 */
	render: function () {
		return (
			<form role="form" onSubmit={this.handleSubmit}>
				{this.traverseChildren(this.props.children)}
			</form>
		);
	}
});

// The currently available form components

// Layout
Form.Row             = Row;
Form.Column          = Column;
Form.Submit          = require('./Submit');

// Text Input
Form.Input           = require('./Input');
Form.TextArea        = require('./TextArea');
Form.TypeAheadInput  = require('./TypeAheadInput');

// Selection
Form.File            = require('./FileInput');
Form.Toggle          = require('./Toggle');
Form.Checkbox        = require('./Checkbox');
Form.SelectBox       = require('./SelectBox');
Form.RadioButtons    = require('./RadioButtons');
Form.DropdownSelect  = require('./DropdownSelect');

// Time
Form.TimePicker      = require('./TimePicker');

module.exports = Form;
