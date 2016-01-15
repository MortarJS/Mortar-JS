// External Requirements
var React = require('react/addons');

/**
 * SubmitButton Component
 * A simple submit button component.
 *
 * @prop {Boolean=} disabled
 * @prop {!String} 	text
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 *
 * @example
 * render: function() { return(
 * 	<Br.Form.SubmitButton text="Enter" />
 * )}
*/
var SubmitButton = React.createClass({
	propTypes: {
		text: React.PropTypes.string.isRequired,
		disabled: React.PropTypes.bool.isRequired
	},

	render: function () {
		return (
			<button type="submit" className="btn btn-lg btn-success btn-block"
				disabled={this.props.disabled}>{this.props.text}</button>
		);
	}
});

module.exports = SubmitButton;
