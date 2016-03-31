// External Requirements
var React = require('react');

/**
 * SubmitButton Component
 * A simple submit button component.
 *
 * @class SubmitButton
 * @type {ReactComponent}
 *
 * @prop {Boolean=} disabled
 * @prop {!String}  text
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
		text     : React.PropTypes.string.isRequired,
		disabled : React.PropTypes.bool.isRequired
	},

	/**
	 * Renders the SubmitButton component
	 *
	 * @memberOf FormComponents.SubmitButton
	 *
	 * @return {JSX}
	 */
	render: function () {
		return (
			<button type="submit" className="btn btn-lg btn-success btn-block"
				disabled={this.props.disabled}>{this.props.text}</button>
		);
	}
});

module.exports = SubmitButton;
