var React       = require('react/addons');
var moment      = require('moment');
var Calendar    = require('react-input-calendar');
var className   = require('classnames');
var FormUtility = require('./../utils/FormUtilityMixin');

/**
 * @class DatePicker
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 */
var DatePicker = React.createClass({
	mixins: [FormUtility],

	propTypes: {
		label     : React.PropTypes.string,
		helpText  : React.PropTypes.string,
		className : React.PropTypes.string,
		fieldKey  : React.PropTypes.string.isRequired
	},

	/**
	 * Gets the initial state of the DatePicker
	 * @memberOf FormComponents.DatePicker
	 *
	 * @return {object}
	 */
	getInitialState: function () {
		return {
			isValid                : true,
			renderCharacterCounter : false,
			fieldValue             : null
		}
	},

	/**
	 * Determine component state based on form field updates
	 * @memberOf FormComponents.DatePicker
	 *
	 * @param nextProps
	 *
	 * @return null
	 */
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			fieldValue: this._findValueByPath(nextProps.bindResource, nextProps.fieldKey)
		})
	},

	/**
	 * Bubble value back up to the changeCallback
	 * @memberOf FormComponents.DatePicker
	 *
	 * @private
	 * @param value
	 *
	 * @return null
	 */
	_customHandleChange: function (value) {
		this.props.changeCallback(this.props.fieldKey, value, this);
	},

	/**
	 * Renders the date picker
	 * @memberOf FormComponents.DatePicker
	 *
	 * @return {jsx}
	 */
	render: function () {
		var date             = this.props.date ? this.props.date : moment(),
			format           = this.props.format           || "MM/DD/YYYY",
			minView          = this.props.minView          || "0",           // Day view is '0', month view is '1', year view is '2'
			computableFormat = this.props.computableFormat || "YYYY-MM-DD" , // This is the format in which it gets saved.
			closeOnSelect    = this.props.closeOnSelect    || true,
			openOnInputFocus = this.props.openOnInputFocus || true;

		var classes = className({
			"form-group": true,
			"has-error": this._checkFieldIsValid()
		});

		return (
			<div className={classes}>
				{this.props.label && (
					<label className="control-label">{this.props.label}</label>
				)}
				<Calendar
					date={date}
					format={format}
					minView={minView}
					computableFormat={computableFormat}
					closeOnSelect={closeOnSelect}
					openOnInputFocus={openOnInputFocus}
					onChange={this._customHandleChange} />
			</div>
		);
	}
});

module.exports = DatePicker;
