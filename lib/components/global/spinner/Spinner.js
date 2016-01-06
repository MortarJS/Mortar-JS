var React = require('react/addons');

var Spinner = React.createClass({
	/**
	 * Map easy name to class name
	 */
	spinnerTypes: {
		spinner: 'spinner-loader',
		throbber: 'throbber-loader',
		hexdots: 'hexdots-loader',
		whirly: 'whirly-loader',
		dots: 'dots-loader',
		circles: 'circles-loader'
	},

	render: function () {
		return (
			<div className={this.spinnerTypes[this.props.type] + ' ' + this.props.classes}>
				{this.props.text || 'Loading...'}
			</div>
		)
	}
});

module.exports = Spinner;
