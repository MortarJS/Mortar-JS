var React          = require('react/addons');
var className      = require('classnames');
var FormUtility    = require('./FormUtilityMixin');
var CharacterCount = require('./CharacterCount');
var FormStore      = require('../../../stores/FormStore');

/**
 * Form Input Component
 * Responsible for handling simple keyboard inputs.
 *
 * @class Input
 * @type {ReactComponent}
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 *
 * @TODO: add props
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
		value: React.PropTypes.string // A custom value to display if we don't want to rely on fieldValue
	},

	mixins: [FormUtility],

	getInitialState: function () {
		return {
			isValid: true,
			renderCharacterCounter: false,
			fieldValue: null
		}
	},

	componentWillReceiveProps: function (nextProps) {
		this.setState({
			fieldValue: this._findValueByPath(nextProps.bindResource, nextProps.fieldKey)
		})
	},

	handleInput: function(event) {
		this.props.changeCallback(this.props.fieldKey, event.target.value, this);

		this.setState({
			fieldValue: event.target.value
		});
	},

	handleFocus: function (event) {
		if (typeof this.props.limit !== 'undefined') {
			this.setState({renderCharacterCounter: true});
		}

		if (typeof this.props.onFocus !== 'undefined') {
			this.props.onFocus(event);
		}
	},

	handleBlur: function (event) {
		this.setState({renderCharacterCounter: false});

		if (typeof this.props.onBlur !== 'undefined') {
			this.props.onBlur(event);
		}
	},

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
						<div className="form-icon fa fa-pencil"></div>
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
		)
	}
});

module.exports = Input;
