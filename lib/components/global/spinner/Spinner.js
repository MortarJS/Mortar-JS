var React = require('react/addons');

/**
 * @class Spinner
 *
 * @memberOf GlobalComponents
 */
var Spinner = React.createClass({
	/**
	 * Map easy name to class name
	 * @memberOf GlobalComponents.Spinner
	 */
	spinnerTypes: {
		spinner: 'spinner-loader',
		throbber: 'throbber-loader',
		hexdots: 'hexdots-loader',
		whirly: 'whirly-loader',
		dots: 'dots-loader',
		circles: 'circles-loader'
	},

	/**
	 * Renders the spiner to the page
	 *
	 * @memberOf GlobalComponents.Spinner
	 *
	 * @return {jsx}
	 */
	render: function () {
		return (
			<div className={this.spinnerTypes[this.props.type] + ' ' + this.props.classes}>
				{this.props.text || 'Loading...'}
			</div>
		)
	}
});

module.exports = Spinner;
