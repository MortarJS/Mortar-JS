var React = require('react/addons');

var SubmitButton = React.createClass({
	propTypes: {
		text: React.PropTypes.string.isRequired
	},

	render: function () {
		return (
			<button type="submit" className="btn btn-lg btn-success btn-block"
				disabled={this.props.disabled}>{this.props.text}</button>
		)
	}
});

module.exports = SubmitButton;
