// External Requirements
var React        = require('react');
var className    = require('classnames');

// Mixins
var FormUtility  = require('./utils/FormUtilityMixin');
var FormKeyMixin = require('../../../mixins/FormKeyMixin');

/**
 * Form Toggle Component
 * Responsible for handling simple keyboard inputs.
 *
 * @class Toggle
 * @type {ReactComponent}
 *
 * @prop {!String}       fieldKey
 * @prop {String=}       fieldLabel
 * @prop {Boolean=}      disabled
 * @prop {Boolean=}      checked        A custom checked value if we don't want to rely on fieldValue
 * @prop {Array<string>} mods
 * @prop {Function=}     changeCallback
 * @prop {String=}       labelBefore    A label to show when the box is unchecked
 * @prop {String=}       labelAfter     A label to show when the box is checked
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 *
 */
var Toggle = React.createClass({
	propTypes: {
		fieldKey       : React.PropTypes.string.isRequired,
		formKey        : React.PropTypes.string,
		fieldLabel     : React.PropTypes.string,
		disabled       : React.PropTypes.bool,
		mods           : React.PropTypes.array,
		checked        : React.PropTypes.bool,
		changeCallback : React.PropTypes.func,
		labelBefore    : React.PropTypes.string,
		labelAfter     : React.PropTypes.string
	},

	mixins: [FormUtility, FormKeyMixin],

	/**
	 * Gets the initial state of the component
	 *
	 * @memberOf FormComponents.Toggle
	 *
	 * @return {Object}
	 */
	getInitialState: function () {
		return {
			isValid : true,
			id      : ''
		};
	},

	/**
	 * Generates a unique formKey which will serve as the checkbox's id.
	 *
	 * The checkbox needs a unique ID for the `<label>` to target, so
	 * we need to generate a unique key to serve that purpose.
	 *
	 * @see {@link FormKeyMixin}
	 *
	 * @return {null}
	 * @private
	 */
	_setFormKey: function() {
		this.setState({
			id: this._generateFormKey()
		});
	},

	/**
	 * Calls the setFormKey function to handle creating a unique ID.
	 *
	 * @see {@link FormUtility}
	 *
	 * @return {null}
	 */
	componentDidMount: function() {
		this._setFormKey();
	},

	/**
	 * Handles user input into the input component.
	 * Sets `fieldValue` in the component state to equal the keyboard input and syncs with the provided remote through a callback.
	 *
	 * @memberOf FormComponents.Toggle
	 *
	 * @param {event} event The event triggering this function
	 *
	 * @return {null}
	 */
	handleInput: function(event) {
		this.props.changeCallback(this.props.fieldKey, event.target.checked, this);
	},

	/**
	 * Renders the Toggle component.
	 *
	 * @memberOf FormComponents.Toggle
	 *
	 * @return {JSX}
	 */
	render: function () {
		let classes = {
			"form-group"    : true,
			"has-error"     : this._checkFieldIsValid(),
			'mortar-toggle' : true,
			'disabled'      : this.props.disabled || false
		};

		classes[`${this.props.formKey}-${this.props.fieldKey}`] = true;

		if (this.props.mods) {
			this.props.mods.forEach(function(mod) {
				classes[mod] = true;
			});
		}

		let toggleClasses = {
			'mortar-toggle-switch' : true,
			'inline'               : this.props.labelBefore || this.props.labelAfter
		};

		let labelBeforeClasses, labelAfterClasses;

		if (this.props.labelBefore) {
			labelBeforeClasses = {
				'mortar-toggle' : true,
				'label-before'  : true,
				'show'          : ! this.props.checked && ! this._fieldValue() || false
			};
		}

		if (this.props.labelAfter) {
			labelAfterClasses = {
				'mortar-toggle' : true,
				'label-after'   : true,
				'show'          : this.props.checked || this._fieldValue() || false
			};
		}

		return (
			<div className={className(classes)}>
				{this.props.fieldLabel &&
					<label className="mortar-toggle control-label">{this.props.fieldLabel}</label>
				}

				{this.props.labelBefore && <span className={className(labelBeforeClasses)}>{this.props.labelBefore}</span>}

				<input
					id       = {this.state.id}
					type     = "checkbox"
					onClick  = {this.handleInput}
					readOnly = {true}
					checked  = {this.props.checked || this._fieldValue() || false}
					disabled = {this.props.disabled} />

				<label htmlFor={this.state.id} className={className(toggleClasses)} />

				{this.props.labelAfter && <span className={className(labelAfterClasses)}>{this.props.labelAfter}</span>}
			</div>
		);
	}
});

module.exports = Toggle;
