// External Requirements
var React          = require('react');
var className      = require('classnames');

// Components
var CharacterCount = require('./CharacterCount');

// Mixins
var FormUtility    = require('./utils/FormUtilityMixin');

/**
 * Form Input Component
 * Responsible for handling simple keyboard inputs.
 *
 * @class Input
 * @type {ReactComponent}
 *
 * @prop {!String}   fieldKey
 * @prop {String=}   label
 * @prop {String=}   placeholder
 * @prop {String=}   helpText
 * @prop {!String}   type
 * @prop {Boolean=}  disabled
 * @prop {Function=} onFocus
 * @prop {Function=} onBlur
 * @prop {Number=}   min
 * @prop {Number=}   max
 * @prop {Number=}   maxLength
 * @prop {Number=}   autoFocus
 * @prop {String=}   value          A custom value to display if we don't want to rely on fieldValue
 * @prop {Function=} changeCallback
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 *
 */
var Input = React.createClass({
	propTypes: {
		formKey        : React.PropTypes.string,
		fieldKey       : React.PropTypes.string.isRequired,
		label          : React.PropTypes.string,
		placeholder    : React.PropTypes.string,
		helpText       : React.PropTypes.string,
		type           : React.PropTypes.string.isRequired,
		disabled       : React.PropTypes.bool,
		onFocus        : React.PropTypes.func,
		onBlur         : React.PropTypes.func,
		min            : React.PropTypes.number,
		max            : React.PropTypes.number,
		maxLength      : React.PropTypes.number,
		autoFocus      : React.PropTypes.bool,
		value          : React.PropTypes.string,
		changeCallback : React.PropTypes.func
	},

	mixins: [FormUtility],

	/**
	 * Gets the initial state of the component
	 *
	 * @memberOf FormComponents.Input
	 *
	 * @return {Object}
	 */
	getInitialState: function () {
		return {
			isValid                : true,
			renderCharacterCounter : false,
			fieldValue             : null
		};
	},

	/**
	 * Calls the FormUtilityMixin's componentDidMount function to handle input changes.
	 * @see {@link FormUtility}
	 *
	 * @return {null}
	 */
	componentDidMount: function() {
		this._componentDidMount();
	},

	/**
	 * Calls the FormUtilityMixin's componentWillUnmount function to handle removing change listeners
	 * @see {@link FormUtility}
	 *
	 * @return {null}
	 */
	componentWillUnmount: function() {
		this._componentWillUnmount();
	},

	/**
	 * Handles user input into the input component.
	 * Sets `fieldValue` in the component state to equal the keyboard input and syncs with the provided remote through a callback.
	 *
	 * @memberOf FormComponents.Input
	 *
	 * @param {event} event The event that triggered this function
	 *
	 * @return {null}
	 */
	handleInput: function(event) {
		this.props.changeCallback(this.props.fieldKey, event.target.value, this);
	},

	/**
	 * When the field is in focus, show the text area character count.
	 *
	 * @memberOf FormComponents.Input
	 *
	 * @param {event} event The event that triggered this function
	 * @return {null}
	 */
	handleFocus: function (event) {
		if (typeof this.props.maxLength !== 'undefined') {
			this.setState({renderCharacterCounter: true});
		}

		if (typeof this.props.onFocus !== 'undefined') {
			this.props.onFocus(event);
		}
	},

	/**
	 * When the field is out of focus, hide the text area character count.
	 *
	 * @memberOf FormComponents.TextArea
	 *
	 * @param {event} event The event that triggered this function
	 * @return {null}
	 */
	handleBlur: function (event) {
		this.setState({renderCharacterCounter: false});

		if (typeof this.props.onBlur !== 'undefined') {
			this.props.onBlur(event);
		}
	},

	/**
	 * Renders the Input component.
	 *
	 * @memberOf FormComponents.Input
	 *
	 * @return {JSX}
	 */
	render: function () {
		var classes = className({
			"form-group" : true,
			"disabled"   : this.props.disabled || false,
			"has-error"  : this._checkFieldIsValid()
		});

		var editableClasses = className({
			"editable-input": ! this.props.disabled
		});

		return (
			<div className={classes}>
				{this.props.label && (
					<label className="control-label">{this.props.label}</label>
				)}

				<div className={editableClasses}>
					{! this.props.disabled && (
						<div className="form-icon icon-pencil"></div>
					)}
					<input className={`form-control form-input mortar-input ${this.props.formKey}-${this.props.fieldKey}`}
						placeholder = {this.props.placeholder || ''}
						type        = {this.props.type}
						disabled    = {this.props.disabled}
						onChange    = {this.handleInput}
						onFocus     = {this.handleFocus}
						onBlur      = {this.handleBlur}
						value       = {this.props.value     || this.state.fieldValue || ''}
						min         = {this.props.min       || null}
						max         = {this.props.max       || null}
						maxLength   = {this.props.max       || null}
						autoFocus   = {this.props.autoFocus || null}
						/>
				</div>

				{this.state.renderCharacterCounter && (
					<CharacterCount input={this.state.fieldValue} limit={this.props.maxLength} />
				)}

				{this._shouldRenderHelpBlock(this.props.helpText)}
			</div>
		);
	}
});

module.exports = Input;
