var React = require('react/addons');

/**
 * Component for selector options
 * @class PerPageOption
 *
 * @memberOf VisualizationComponents.PerPageSelector
 * @see {@link VisualizationComponents.PerPageSelector}
 */
var PerPageOption = React.createClass({

	/**
	 * Child callback for per-page selection
	 * @memberOf VisualizationComponents.PerPageSelector.PerPageOption
	 *
	 * @return {null}
	 */
	setPerPage: function () {
		this.props.onChangeCallback(this.props.value)
	},

	/**
	 * Renders the option
	 *
	 * @memberOf VisualizationComponents.PerPageSelector.PerPageOption
	 *
	 * @return {jsx}
	 */
	render: function () {
		return (
			<option value={this.props.value}>{this.props.value}</option>
		)
	}
});

module.exports = PerPageOption;
