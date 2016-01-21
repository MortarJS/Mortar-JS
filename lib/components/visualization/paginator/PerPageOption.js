var React = require('react/addons');

/**
 * Component for selector options
 * @class PerPageOption
 *
 * @memberOf VisualizationComponents.Paginator.PerPageSelector
 */
var PerPageOption = React.createClass({

	/**
	 * Child callback for per-page selection
	 * @memberOf VisualizationComponents.Paginator.PerPageSelector.PerPageOption
	 *
	 * @return {null}
	 */
	setPerPage: function () {
		this.props.onChangeCallback(this.props.value)
	},

	/**
	 * Renders the option
	 *
	 * @memberOf VisualizationComponents.Paginator.PerPageSelector.PerPageOption
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
