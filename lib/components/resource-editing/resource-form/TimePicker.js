// External Requirements
var React       = require('react');
var className   = require('classnames');

// Mixins
var FormUtility = require('./utils/FormUtilityMixin');


var TimePicker = React.createClass({
	propTypes: {
		formKey        : React.PropTypes.string,
		fieldKey       : React.PropTypes.string.isRequired,
		label          : React.PropTypes.string,
		placeholder    : React.PropTypes.string,
		time           : React.PropTypes.shape({
			hours   : React.PropTypes.string,
			minutes : React.PropTypes.string,
		}),
		format         : React.PropTypes.string,
		value          : React.PropTypes.string,
		changeCallback : React.PropTypes.func
	},

	mixins: [FormUtility],

	/**
	 * Gets the initial state of the component
	 *
	 * @memberOf FormComponents.TimePicker
	 *
	 * @return {Object}
	 */
	getInitialState: function () {
		return {
			isValid    : true,
			fieldValue : null
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

	setFormat: function() {
		var h = this.props.hours,
			m = this.props.minutes,
			format = h + ':' + m;
		this.setState({
			format: format,
			time  : format
		});
	},

	render: function() {
		console.log(this.state.format, this.props.time);
		var classes = className({
			"form-group" : true,
			"has-error"  : this._checkFieldIsValid()
		});

		return (
			<div className={classes}>
				{this.props.label && (
					<label className="control-label">{this.props.label}</label>
				)}

				<input className="form-control form-input"
					placeholder = {this.props.placeholder || ''}
					format      = {this.props.format      || this.state.format}
					time        = {this.props.time        || '11:23'}
					value       = {this.props.value       || this.state.fieldValue || ''}
					/>

				<input className="form-control form-input"
					placeholder = {this.props.placeholder || ''}
					format      = {this.props.format      || this.state.format}
					time        = {this.props.time        || '11:23'}
					value       = {this.props.value       || this.state.fieldValue || ''}
					/>
			</div>
		);
	}
});
// /**
//  * Form Input Component
//  * Responsible for handling simple keyboard inputs.
//  *
//  * @class Input
//  * @type {ReactComponent}
//  *
//  * @prop {!String}   fieldKey
//  * @prop {Number=}   limit
//  * @prop {String=}   label
//  * @prop {String=}   placeholder
//  * @prop {String=}   helpText
//  * @prop {!String}   type
//  * @prop {Boolean=}  disabled
//  * @prop {Function=} onFocus
//  * @prop {Function=} onBlur
//  * @prop {Number=}   min
//  * @prop {Number=}   max
//  * @prop {Number=}   maxLength
//  * @prop {Number=}   autoFocus
//  * @prop {String=}   value          A custom value to display if we don't want to rely on fieldValue
//  * @prop {Function=} changeCallback
//  *
//  * @memberOf FormComponents
//  * @see {@link FormComponents}
//  *
//  */
// var TimePicker = React.createClass({
// 	propTypes: {
// 		formKey        : React.PropTypes.string,
// 		fieldKey       : React.PropTypes.string.isRequired,
// 		label          : React.PropTypes.string,
// 		placeholder    : React.PropTypes.string,
// 		disabled       : React.PropTypes.bool,
// 		onFocus        : React.PropTypes.func,
// 		onBlur         : React.PropTypes.func,
// 		minTime        : React.PropTypes.number,
// 		maxTime        : React.PropTypes.number,
// 		maxLength      : React.PropTypes.number,
// 		autoFocus      : React.PropTypes.bool,
// 		value          : React.PropTypes.string,
// 		timeView       : React.PropTypes.bool,
// 		hours          : React.PropTypes.number,
// 		hoursVisible   : React.PropTypes.bool,
// 		minutes        : React.PropTypes.number,
// 		minutesVisible : React.PropTypes.bool,
// 		seconds        : React.PropTypes.number,
// 		secondsVisible : React.PropTypes.bool,
// 		format         : React.PropTypes.string,
// 		changeCallback : React.PropTypes.func
// 	},
//
// 	mixins: [FormUtility],
//
// 	/**
// 	 * Gets the initial state of the component
// 	 *
// 	 * @memberOf FormComponents.Input
// 	 *
// 	 * @return {Object}
// 	 */
// 	getInitialState: function () {
// 		return {
// 			isValid                : true,
// 			fieldValue             : null
// 		};
// 	},
//
// 	/**
// 	 * Calls the FormUtilityMixin's componentDidMount function to handle input changes.
// 	 * @see {@link FormUtility}
// 	 *
// 	 * @return {null}
// 	 */
// 	componentDidMount: function() {
// 		this._componentDidMount();
// 	},
//
// 	/**
// 	 * Calls the FormUtilityMixin's componentWillUnmount function to handle removing change listeners
// 	 * @see {@link FormUtility}
// 	 *
// 	 * @return {null}
// 	 */
// 	componentWillUnmount: function() {
// 		this._componentWillUnmount();
// 	},
//
// 	/**
// 	 * Handles user input into the input component.
// 	 * Sets `fieldValue` in the component state to equal the keyboard input and syncs with the provided remote through a callback.
// 	 *
// 	 * @memberOf FormComponents.Input
// 	 *
// 	 * @param {event} event The event that triggered this function
// 	 *
// 	 * @return {null}
// 	 */
// 	handleInput: function(event) {
// 		this.props.changeCallback(this.props.fieldKey, event.target.value, this);
// 	},
//
// 	/**
// 	 * When the field is in focus, show the text area character count.
// 	 *
// 	 * @memberOf FormComponents.Input
// 	 *
// 	 * @param {event} event The event that triggered this function
// 	 * @return {null}
// 	 */
// 	handleFocus: function (event) {
// 		if (typeof this.props.limit !== 'undefined') {
// 			this.setState({renderCharacterCounter: true});
// 		}
//
// 		if (typeof this.props.onFocus !== 'undefined') {
// 			this.props.onFocus(event);
// 		}
// 	},
//
// 	/**
// 	 * When the field is out of focus, hide the text area character count.
// 	 *
// 	 * @memberOf FormComponents.TextArea
// 	 *
// 	 * @param {event} event The event that triggered this function
// 	 * @return {null}
// 	 */
// 	handleBlur: function (event) {
// 		this.setState({renderCharacterCounter: false});
//
// 		if (typeof this.props.onBlur !== 'undefined') {
// 			this.props.onBlur(event);
// 		}
// 	},
//
// 	/**
// 	 * Renders the Input component.
// 	 *
// 	 * @memberOf FormComponents.Input
// 	 *
// 	 * @return {JSX}
// 	 */
// 	render: function () {
// 		var classes = className({
// 			"form-group" : true,
// 			"has-error"  : this._checkFieldIsValid()
// 		});
//
// 		var editableClasses = className({
// 			"editable-input": ! this.props.disabled
// 		});
//
// 		return (
// 			<div className={classes}>
// 				{this.props.label && (
// 					<label className="control-label">{this.props.label}</label>
// 				)}
//
// 				<div className={editableClasses}>
// 					{! this.props.disabled }
// 					<input className="form-control form-input"
// 						disabled       = {this.props.disabled}
// 						onChange       = {this.handleInput}
// 						onFocus        = {this.handleFocus}
// 						onBlur         = {this.handleBlur}
// 						placeholder    = {this.props.placeholder    || ''}
// 						value          = {this.props.value          || this.state.fieldValue || ''}
// 						minTime        = {this.props.minTime        || null}
// 						maxTime        = {this.props.maxTime        || null}
// 						autoFocus      = {this.props.autoFocus      || null}
// 						timeView       = {this.props.timeView       || 0}
// 						hours          = {this.props.hours          || 11}
// 						hoursVisible   = {this.props.hoursVisible   || 1}
// 						minutes        = {this.props.minutes        || 59}
// 						minutesVisible = {this.props.minutesVisible || 1}
// 						seconds        = {this.props.seconds        || 59}
// 						secondsVisible = {this.props.secondsVisible || 1}
// 						/>
// 				</div>
//
// 			</div>
// 		);
// 	}
// });

module.exports = TimePicker;
