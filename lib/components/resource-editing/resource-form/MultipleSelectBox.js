// External Requirements
var React = require('react');

/**
 * MultipleSelectBox Component
 * A simple Component to manage multi-select user-input
 *
 * @class MultipleSelectBox
 * @type {ReactComponent}
 *
 * @prop {String} fieldKey The key for the property on the object getting edited.
 * @prop {Array}  options  The options that will turn into the multi-select.
 * @prop {String} label    Label for the entire multi-select component.
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 */
var MultipleSelectBox = React.createClass({
	propTypes: {
		fieldKey       : React.PropTypes.string.isRequired,
		changeCallback : React.PropTypes.func,
		options        : React.PropTypes.array,
		label          : React.PropTypes.string
	},

	/**
	 * Builds the multi-select options by iterating over the `options` array from the component props.
	 *
	 * @memberOf FormComponents.MultipleSelectBox
	 *
	 * @return {Array} Array containing the multi-select options as JSX components.
	 */
	buildSelectOptions: function () {
		return this.props.options.map(function (option) {
			return (
				<option value={option} onChange={this.props.changeCallback(this.props.fieldKey)}>{option}</option>
			);
		}, this);
	},

	/**
	 * Renders the MultipleSelectBox component.
	 *
	 * @memberOf FormComponents.MultipleSelectBox
	 *
	 * @return {JSX}
	 */
	render: function () {
		return (
			<div className="form-group">
				<label className="control-label">{this.props.label}</label>

				<select multiple className="form-control">
					{this.buildSelectOptions()}
				</select>
			</div>
		);
	}
});

module.exports = MultipleSelectBox;
