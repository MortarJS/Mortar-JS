var _           = require('lodash');
var React       = require('react');
var className   = require('classnames');
var FormUtility = require('./utils/FormUtilityMixin');

/**
 * Checkbox Component
 *
 * @class Checkbox
 * @type {ReactComponent}
 *
 * @prop {string}   fieldKey       The key for the property on the object getting edited.
 * @prop {function} changeCallback The function that is called whenever a change occurs to this component
 * @prop {array}    options        The options that will turn into checkboxes
 * @prop {string}   labelAttribute The attribute on an object to be displayed
 * @prop {boolean}  disabled       If true, disables making changes to the component
 * @prop {array}    comparisonAttr The attribute to compare to the form's bound resource and return
 * @prop {string}   overrideclass  A string of classes to attach to the rendered checkboxes
 * @prop {string}   inputLabel     A label to be displayed above the checkboxes
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 */
var Checkbox = React.createClass({
	propTypes: {
		fieldKey       : React.PropTypes.string.isRequired,
		changeCallback : React.PropTypes.func,
		options        : React.PropTypes.array.isRequired,
		labelAttribute : React.PropTypes.string,
		disabled       : React.PropTypes.bool,
		comparisonAttr : React.PropTypes.array,
		overrideClass  : React.PropTypes.string,
		inputLabel     : React.PropTypes.string
	},

	mixins: [FormUtility],

	/**
	 * Gets the initial state of the component
	 *
	 * @memberOf FormComponents.Checkbox
	 *
	 * @return {obj}
	 */
	getInitialState: function () {
		return {
			fieldValue : [],
			options    : []
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
	 * Handle check selection
	 *
	 * @memberOf FormComponents.Checkbox
	 *
	 * @param {event} event The event that triggered the change
	 * @return {null}
	 */
	customHandleChange: function (event) {
		var selected = this.state.fieldValue || [],
			option = this.props.options[event.target.dataset.index],
			comparisonAttr = this.props.comparisonAttr || null;

		if (event.target.checked) {
			// Select the option
			selected.push(option);
		} else {
			var newSelections = [];

			selected.forEach(function (selection) {
				if (comparisonAttr) {
					if (option[comparisonAttr] !== selection[comparisonAttr]) {
						newSelections.push(selection);
					}
				} else if (! _.isEqual(option, selection)) {
					newSelections.push(selection);
				}
			});

			selected = newSelections;
		}

		this.props.changeCallback(this.props.fieldKey, selected, this);
	},

	/**
	 * The function that handles building the JSX for the checkboxes.
	 * Loops through each option, and attaches classes and properties passed down
	 * from the PropTypes.
	 *
	 * @memberOf FormComponents.Checkbox
	 *
	 * @return {Array<JSX>} An array of checkbox jsx
	 */
	buildCheckboxes: function () {
		// Provide the ability to set override classes to the div element for custom styling
		var overrideClass  = this.props.overrideClass ? ' ' + this.props.overrideClass : '',
			comparisonAttr = this.props.comparisonAttr || null,
			disabled       = this.props.disabled || false,
			label          = this.props.labelAttribute || 'label',
			self           = this;

		return this.props.options.map(function (option, index) {
			var checked = false;

			if (self.state.fieldValue && self.state.fieldValue.length) {
				self.state.fieldValue.forEach(function (selection) {
					if (comparisonAttr) {
						if (option[comparisonAttr] === selection[comparisonAttr]) {
							checked =  true;
						}
					} else if (_.isEqual(option, selection)) {
						checked = true;
					}
				});
			}

			return (
					<div key={index} className={'checkbox' + overrideClass}>
						<label>
							<input type="checkbox" name={option.name || 'option' + index} data-index={index}
								onChange={self.handleChange} value={option}
								checked={checked} disabled = {disabled} />
							<span className="checkbox-material">
								<span className="check"></span>
							</span>
							<span className="checkbox-label">{option[label]}</span>
						</label>
					</div>
			);
		});
	},

	/**
	 * Renders the Checkbox component
	 *
	 * @memberOf FormComponents.Checkbox
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
				<label className="control-label">{this.props.inputLabel}</label>

				{this.buildCheckboxes()}
			</div>
		);
	}
});

module.exports = Checkbox;
