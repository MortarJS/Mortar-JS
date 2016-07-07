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

	handleHours: function(event) {
		this.setState({
			hours: event.target.value
		});

		var newHours = event.target.value,
			time = this.state.fieldValue,
			hours = time.substring(0, time.indexOf(':')),
			minutes = time.substring(time.indexOf(':') + 1, time.lastIndexOf(':')),
			seconds = time.substring(time.lastIndexOf(':') + 1, time.indexOf(' '));

		var difference, newTime;
		if (newHours > hours) {
			difference = (newHours - hours);
			newTime = moment(time, "hh:mm:ss A").add(difference, 'hours').format("hh:mm:ss A");
		} else if (newHours < hours) {
			difference = (hours - newHours);
			newTime = moment(time, "hh:mm:ss").subtract(difference, 'hours').format("hh:mm:ss A");
		}

		this.setState({
			fieldValue: newTime
		});

		this.props.changeCallback(this.props.fieldKey, newTime, this);
	},

	handleTimeChange: function(action, resource) {
		let time = this.state.fieldValue;
		var newTime;
		// @TODO: set prop for format
		switch (action) {
			case 'time-increment':
				newTime = moment(time, "hh:mm:ss A").add(1, resource).format("hh:mm:ss A");
				break;
			case 'time-decrement':
				newTime = moment(time, "hh:mm:ss").subtract(1, resource).format("hh:mm:ss A");
				break;
			default:
				break;
		}

		this.setState({
			fieldValue: newTime
		});

		this.props.changeCallback(this.props.fieldKey, newTime, this);
	},

	/**
	 * Renders the Input component.
	 *
	 * @memberOf FormComponents.Input
	 *
	 * @return {JSX}
	 */
	render: function () {
		var time = this.state.fieldValue;
		if (time) {
			var hours   = time.substring(0, time.indexOf(':')),
				minutes = time.substring(time.indexOf(':') + 1, time.lastIndexOf(':')),
				seconds = time.substring(time.lastIndexOf(':') + 1, time.indexOf(' '));
		}

		if (this.state.hours === '') {
			hours = this.state.hours
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
								<button className="icon-chevron-up" onClick={this.handleTimeChange.bind(null, 'time-increment', 'hours')} value={this.state.fieldValue || ''}></button>
								<input type="number" onChange={this.handleHours} value={this.state.hours || hours} />
								<button className="icon-chevron-down" onClick={this.handleTimeChange.bind(null, 'time-decrement', 'hours')} value={this.state.fieldValue || ''}></button>
							</div>
							<div className="minutes">
								<button className="icon-chevron-up" onClick={this.handleTimeChange.bind(null, 'time-increment', 'minutes')} value={this.state.fieldValue || ''}></button>
								<input type="number" onChange={this.handleTimeChange.bind(null, 'minute-change')} value={minutes}  />
								<button className="icon-chevron-down" onClick={this.handleTimeChange.bind(null, 'time-decrement', 'minutes')} value={this.state.fieldValue || ''}></button>
							</div>
							<div className="seconds">
								<button className="icon-chevron-up" onClick={this.handleTimeChange.bind(null, 'time-increment', 'seconds')} value={this.state.fieldValue || ''}></button>
								<input type="number" onChange={this.handleTimeChange.bind(null, 'second-change')} value={seconds} />
								<button className="icon-chevron-down" onClick={this.handleTimeChange.bind(null, 'time-decrement', 'seconds')} value={this.state.fieldValue || ''}></button>
							</div>
						</div>
					</div>
				</div>


			</div>
		);
	}
});

module.exports = TimePicker;
