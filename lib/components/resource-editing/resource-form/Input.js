// External Requirements
var React          = require('react/addons');
var className      = require('classnames');

// Components
var CharacterCount = require('./CharacterCount');

// Stores
var FormStore      = require('../../../stores/FormStore');

// Mixins
var FormUtility    = require('./FormUtilityMixin');

/**
 * Form Input Component
 * Responsible for handling simple keyboard inputs.
 *
 * @class Input
 * @type {ReactComponent}
 *
 * @prop {!String}		fieldKey
 * @prop {Number=}		limit
 * @prop {String=}		label
 * @prop {String=}		placeholder
 * @prop {String=}		helpText
 * @prop {!String}		type
 * @prop {Boolean=}		disabled
 * @prop {Function=}	onFocus
 * @prop {Function=}	onBlur
 * @prop {Number=}		min
 * @prop {Number=}		max
 * @prop {Number=}		maxLength
 * @prop {Number=}		autoFocus
 * @prop {String=}		value						A custom value to display if we don't want to rely on fieldValue
 * @prop {Function=}	changeCallback
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 *
 */
var Input = React.createClass({
	propTypes: {
		fieldKey: React.PropTypes.string.isRequired,
		limit: React.PropTypes.number,
		label: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		helpText: React.PropTypes.string,
		type: React.PropTypes.string.isRequired,
		disabled: React.PropTypes.bool,
		onFocus: React.PropTypes.func,
		onBlur: React.PropTypes.func,
		min: React.PropTypes.number,
		max: React.PropTypes.number,
		maxLength: React.PropTypes.number,
		autoFocus: React.PropTypes.bool,
		value: React.PropTypes.string,
		changeCallback: React.PropTypes.func
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
			isValid: true,
			renderCharacterCounter: false,
			fieldValue: null
		};
	},

	/**
	 * Set fieldValue through props based on attached resource.
	 *
	 * @memberOf FormComponents.Input
	 *
	 * @param  {Object}
	 * @return {null}
	 */
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			fieldValue: this._findValueByPath(nextProps.bindResource, nextProps.fieldKey)
		});
	},

	/**
	 * Handles user input into the input component.
	 * Sets `fieldValue` in the component state to equal the keyboard input and syncs with the provided remote through a callback.
	 *
	 * @memberOf FormComponents.Input
	 *
	 * @return {null}
	 */
	handleInput: function(event) {
		this.props.changeCallback(this.props.fieldKey, event.target.value, this);

		this.setState({
			fieldValue: event.target.value
		});
	},

	/**
	 * When the field is in focus, show the text area character count.
	 *
	 * @memberOf FormComponents.Input
	 *
	 * @param      		event
	 * @return 	{null}
	 */
	handleFocus: function (event) {
		if (typeof this.props.limit !== 'undefined') {
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
	 * @param					event
	 * @return 	{null}
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
			"form-group": true,
			"has-error": this._checkFieldIsValid()
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
					<input className="form-control form-input"
						placeholder = {this.props.placeholder || ''}
						type        = {this.props.type}
						disabled    = {this.props.disabled}
						onChange    = {this.handleInput}
						onFocus     = {this.handleFocus}
						onBlur      = {this.handleBlur}
						value       = {this.props.value     || this.state.fieldValue}
						min         = {this.props.min       || null}
						max         = {this.props.max       || null}
						maxLength   = {this.props.max       || null}
						limit       = {this.props.limit     || null}
						autoFocus   = {this.props.autoFocus || null}
						/>
				</div>

				{this.state.renderCharacterCounter && (
					<CharacterCount input={this.state.fieldValue} limit={this.props.limit} />
				)}

				{this._shouldRenderHelpBlock(this.props.helpText)}
			</div>
		);
	}
});

module.exports = Input;
