var React = require('react/addons');

/**
 * Component for selector options
 *
 * @type {*|Function}
 */
var PerPageOption = React.createClass({
	/**
	 * Child callback for per-page selection
	 */
	setPerPage: function () {
		this.props.onChangeCallback(this.props.value)
	},

	render: function () {
		return (
			<option value={this.props.value}>{this.props.value}</option>
		)
	}
});

module.exports = PerPageOption;
