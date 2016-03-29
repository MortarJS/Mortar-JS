// External Requirements
var _         = require('lodash');
var React     = require('react/addons');
var className = require('classnames');

// Mixins
var FormUtility = require('./utils/FormUtilityMixin');

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
 * @prop  {Boolean} disabled        If the fields should be disabled or not
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 */
var RadioButton = React.createClass({
	propTypes: {
		fieldKey       : React.PropTypes.string.isRequired,
		label          : React.PropTypes.string,
		valueKey       : React.PropTypes.string,
		labelAttribute : React.PropTypes.string,
		helpText       : React.PropTypes.string,
		options        : React.PropTypes.array,
		disabled       : React.PropTypes.bool,
		changeCallback : React.PropTypes.func
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
			isValid    : true,
			fieldValue : {}
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

		this.props.changeCallback(this.props.fieldKey, selectedOption[valueKey], this);
	},

	/**
	 * Build the radio buttons by mapping over the `options` prop.
	 *
	 * @memberOf FormComponents.RadioButton
	 *
	 * @return {Array}
	 */
	buildRadioButtons: function () {
		var self = this;

		return this.props.options.map(function (option, index) {
			var value = self.props.valueKey ? option[self.props.valueKey] : option.value;

			return (
				<div key={index} className="radio radio-success">
					<label>
						<input
							type="radio" name={option.name || 'option' + index} value={value}
							onChange={self.handleChange}
							data-index={index}
							checked={_.isEqual(self.state.fieldValue, value)}
							disabled={self.props.disabled || false} />
						<span className="circle"></span>
						<span className="check"></span>
						<div>{self.props.labelAttribute ? option[self.props.labelAttribute] : option.label}</div>
					</label>
				</div>
			);
		});
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
			"form-group" : true,
			"has-error"  : this._checkFieldIsValid(),
			"disabled"   : this.props.disabled || false
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
