// External Requirements
var React = require('react/addons');

// Mixins
var FormUtility = require('./FormUtilityMixin');

/**
 * SelectBox component
 * Simple select box component.
 *
 * @class SelectBox
 * @type {ReactComponent}
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 */
var SelectBox = React.createClass({
	propTypes: {
		label: 				React.PropTypes.string,
		options: 			React.PropTypes.array,
		fieldKey: 		React.PropTypes.string.isRequired,
		required: 		React.PropTypes.bool,
		bindResource: React.PropTypes.object
	},

	mixins: [FormUtility],

	/**
	 * Build options components by mapping over the options array
	 *
	 * @memberOf FormComponents.SelectBox
	 *
	 * @return {Array}
	 */
	buildSelectOptions: function () {
		return this.props.options.map(function (option, index) {
			return (
				<option key={index} value={option.value}>{option.label}</option>
			)
		}, this);
	},

	/**
	 * Renders the SelectBox component
	 *
	 * @memberOf FormComponents.SelectBox
	 *
	 * @return {JSX}
	 */
	render: function () {
		var fieldValue = this._findValueByPath(this.props.bindResource, this.props.fieldKey);

		return (
			<div className="form-group">
				<label className="control-label">{this.props.label}</label>

				<select className="form-control" onChange={this.handleChange} value={fieldValue}>
					{this.buildSelectOptions()}
				</select>
			</div>
		)
	}
});

module.exports = SelectBox;
