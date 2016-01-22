// External Requirements
var React = require('react/addons');
var className = require('classnames');
var _ = require('lodash');

// Stores
var FormStore = require('../../../stores/FormStore');

// Mixins
var FormUtility = require('./FormUtilityMixin');

/**
 * RadioButton component
 * A component used to build radio-style checkbox elements.
 *
 * @class RadioButton
 * @type {ReactComponent}
 *
 * @prop  {!String} fieldKey        The key for the property on the object getting edited.
 * @prop  {String}  label           The label for entire component. Displayed above the radio buttons
 * @prop  {String}  valueKey        If the bound resource doesn't save data to `value` you can define your own value key here.
 * @prop  {String}  labelAttribute  The attribute on the bound resource to display as the option next to the radio button.
 * @prop  {Array}   options         Possible options that will become the radio-button.
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 */
var RadioButton = React.createClass({
	propTypes: {
		fieldKey: React.PropTypes.string.isRequired,
		label: React.PropTypes.string,
		valueKey: React.PropTypes.string,
		labelAttribute: React.PropTypes.string,
		helpText: React.PropTypes.string,
		options: React.PropTypes.array
	},

	mixins: [FormUtility],

	/**
	 * Gets the initial state of the component.
	 *
	 * @memberOf FormComponents.RadioButton
	 *
	 * @return {Object}
	 */
	getInitialState: function () {
		return {
			isValid: true,
			fieldValue: {}
		}
	},

	/**
	 * Called anytime this component receives new props.  Not called on initial render.
	 *
	 * @memberOf FormComponents.RadioButton
	 *
	 * @param {array} nextProps An array of the properties this component will receive
	 *
	 * @return {null}
	 */
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			fieldValue: this._findValueByPath(nextProps.bindResource, nextProps.fieldKey)
		});
	},

	/**
	 * Handle radio button selection.
	 *
	 * @memberOf FormComponents.RadioButton
	 *
	 * @param {event} event The event that triggered the change
	 * @return {null}
	 */
	customHandleChange: function (event) {
		var index = event.target.dataset.index;

		// Find first match (like laravel's queryBuilder->first())
		var selectedOption = this.props.options[index],
			valueKey = this.props.valueKey || 'value';

		this.setState({
			fieldValue: selectedOption[valueKey]
		}, function () {
			this.props.changeCallback(this.props.fieldKey, this.state.fieldValue, this);
		});

	},

	/**
	 * Build the radio buttons by mapping over the `options` prop.
	 *
	 * @memberOf FormComponents.RadioButton
	 *
	 * @return {Array}
	 */
	buildRadioButtons: function () {
		var fieldValue = this.state.fieldValue || {};

		return this.props.options.map(function (option, index) {
			var value = this.props.valueKey ? option[this.props.valueKey] : option.value;

			return (
				<div key={index} className="radio radio-success">
					<label>
						<input
							type="radio" name={option.name || ('option' + index)} value={value}
							onChange={this.handleChange}
							data-index={index}
							checked={_.isEqual(this.state.fieldValue, value)} />
						<span className="circle"></span>
						<span className="check"></span>
						<div>{this.props.labelAttribute ? option[this.props.labelAttribute] : option.label}</div>
					</label>
				</div>
			)
		}.bind(this));
	},

	/**
	 * Renders the RadioButton component.
	 *
	 * @memberOf FormComponents.RadioButton
	 *
	 * @return {JSX}
	 */
	render: function () {
		var classes = className({
			"form-group": true,
			"has-error": this._checkFieldIsValid()
		});

		return (
			<div className={classes}>
				<label className="control-label">{this.props.label}</label>
				{this._shouldRenderHelpBlock(this.props.helpText)}

				{this.buildRadioButtons()}
			</div>
		);
	}
});

module.exports = RadioButton;
