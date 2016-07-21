// External Requirements
var React       = require('react');
var className   = require('classnames');
var moment      = require('moment');

// Mixins
var FormUtility = require('./utils/FormUtilityMixin');

/**
 * Form Input Component
 * Responsible for handling simple keyboard inputs.
 *
 * @class Input
 * @type {ReactComponent}
 *
 * @prop {!String}   fieldKey
 * @prop {Number=}   limit
 * @prop {String=}   label
 * @prop {String=}   placeholder
 * @prop {!String}   type
 * @prop {Boolean=}  disabled
 * @prop {String=}   value          A custom value to display if we don't want to rely on fieldValue
 * @prop {Function=} changeCallback
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 *
 */
var TimePicker = React.createClass({
	propTypes: {
		formKey        : React.PropTypes.string,
		fieldKey       : React.PropTypes.string.isRequired,
		limit          : React.PropTypes.number,
		label          : React.PropTypes.string,
		placeholder    : React.PropTypes.string,
		disabled       : React.PropTypes.bool,
		value          : React.PropTypes.string,
		format         : React.PropTypes.string,
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
			fieldValue             : null,
			showTimePicker         : false
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

	getResourceValue: function(fieldValue, resource) {
		let time = moment(fieldValue, this.props.format),
			resourceValue;

		if (resource === 'hours') {
			resourceValue = time.hours();
		} else if (resource === 'minutes') {
			resourceValue = time.minutes();
		} else if (resource === 'seconds') {
			resourceValue = time.seconds();
		}

		return resourceValue;
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
	handleInput: function(resource, event) {
		let value         = event.target.value,
			oldTime       = moment(this.state.fieldValue, this.props.format),
			resourceValue = this.getResourceValue(oldTime, resource);

		var difference = value - resourceValue;
		var newTime = oldTime.add(1, resource).format(this.props.format);

		this.setState({
			time       : event.target.value,
			resource   : resource,
			fieldValue : newTime
		});

		this.props.changeCallback(this.props.fieldKey, newTime, this);
	},

	handleTimeChange: function(action, resource) {
		let time    = this.state.fieldValue,
			newTime = moment(time, this.props.format).add(action, resource).format(this.props.format);

		this.setState({
			fieldValue : newTime,
			resource   : resource,
			time       : this.getResourceValue(newTime, resource)
		});

		this.props.changeCallback(this.props.fieldKey, newTime, this);
	},

	/**
	 * Renders the TimePicker component.
	 *
	 * @memberOf FormComponents.TimePicker
	 *
	 * @return {JSX}
	 */
	render: function () {
		let time  = this.state.fieldValue,
			value = time || '';
		if (time) {
			var	hoursValue   = this.state.resource === 'hours'   ? this.state.time : this.getResourceValue(time, 'hours'),
				minutesValue = this.state.resource === 'minutes' ? this.state.time : this.getResourceValue(time, 'minutes'),
				secondsValue = this.state.resource === 'seconds' ? this.state.time : this.getResourceValue(time, 'seconds');
		}

		var classes = className({
			"form-group" : true,
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

				<div className="mortar">
					<div className="mortar-form">
						<div className="mortar-form-time-picker">

							<div className="hour">
								<button className="icon-chevron-up" onClick={this.handleTimeChange.bind(null, '1', 'hours')} value={value}></button>
								<input type="number" onChange={this.handleInput.bind(null, 'hours')} value={hoursValue} />
								<button className="icon-chevron-down" onClick={this.handleTimeChange.bind(null, '-1', 'hours')} value={value}></button>
							</div>

							<div className="minutes">
								<button className="icon-chevron-up" onClick={this.handleTimeChange.bind(null, '1', 'minutes')} value={value}></button>
								<input type="number" onChange={this.handleInput.bind(null, 'minutes')} value={minutesValue}  />
								<button className="icon-chevron-down" onClick={this.handleTimeChange.bind(null, '-1', 'minutes')} value={value}></button>
							</div>

							<div className="seconds">
								<button className="icon-chevron-up" onClick={this.handleTimeChange.bind(null, '1', 'seconds')} value={value}></button>
								<input type="number" onChange={this.handleInput.bind(null, 'seconds')} value={secondsValue} />
								<button className="icon-chevron-down" onClick={this.handleTimeChange.bind(null, '-1', 'seconds')} value={value}></button>
							</div>

						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = TimePicker;
