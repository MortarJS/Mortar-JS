var React       = require('react/addons');
var moment      = require('moment');
var InputTime   = require('react-time-picker');
var className   = require('classnames');
var FormUtility = require('./../FormUtilityMixin');

/**
 * @class TimePicker
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 */
var TimePicker = React.createClass({
	mixins: [FormUtility],

	propTypes: {
		className      : React.PropTypes.string, // Optional classname string to apply to the parent div
		fieldKey       : React.PropTypes.string.isRequired, // The field key
		label          : React.PropTypes.string, // The label to display above the rendered time picker
		onChange       : React.PropTypes.func,   // Optional callback called when a change occurs
		changeCallback : React.PropTypes.func
	},

	/**
	 * Gets the TimePicker's initial state
	 * @memberOf FormComponents.TimePicker
	 *
	 * @public
	 * @return {object}
	 */
	getInitialState: function () {
		return {
			isValid    : true,
			fieldValue : null
		};
	},

	/**
	 * Determine component state based on form field updates
	 * @memberOf FormComponents.TimePicker
	 *
	 * @param {object} nextProps The next properties for this component.
	 *
	 * @return {null}
	 */
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			fieldValue: this._findValueByPath(nextProps.bindResource, nextProps.fieldKey)
		});
	},

	/**
	 * Bubble value back up to the changeCallback
	 * @private
	 * @memberOf FormComponents.TimePicker
	 *
	 * @param {*} value The value coming back from the component
	 * @return {null}
	 */
	_customHandleChange: function (value) {
		var newValue = moment(value, 'hh:mm a').format('HH:mm');

		this.props.changeCallback(this.props.fieldKey, newValue, this);
	},

	/**
	 * Renders the TimePicker
	 * @memberOf FormComponents.TimePicker
	 *
	 * @return {null}
	 */
	render: function () {
		var format       = this.props.format       || "hh:mm a",
			step         = this.props.step         || 1,    // the increment at which all fields increase/decrease
			hourStep     = this.props.hourStep     || step, // the increment at which the hour increases/decreases
			minuteStep   = this.props.minuteStep   || step, // the increment at which the minute increases/decreases
			secondStep   = this.props.secondStep   || step, // the increment at which the second increases/decreases
			useArrowKeys = this.props.useArrowKeys || true; // can use the arrow keys to increase/decrease

		var classes = className({
			"form-group" : true,
			"has-error"  : this._checkFieldIsValid()
		});

		return (
			<div className={classes}>
				{this.props.label && (
					<label className="control-label">{this.props.label}</label>
				)}

				<InputTime
					value={this.state.fieldValue}
					format={format}
					step={step}
					hourStep={hourStep}
					minuteStep={minuteStep}
					secondStep={secondStep}
					useArrowKeys={useArrowKeys}
					onChange={this._customHandleChange} />
			</div>
		);
	}
});

module.exports = TimePicker;
