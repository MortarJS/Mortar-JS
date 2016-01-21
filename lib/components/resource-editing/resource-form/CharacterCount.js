// External Requirements
var React = require('react/addons');
var classNames = require('classnames');

/**
 * CharacterCount
 * A component used to count the number of characters in various input fields.
 * When the characters limit is reached, the component will mark it's `isValid` state as `false`.
 *
 * @class CharacterCount
 * @type {ReactComponent}
 *
 * @prop  {String=} input user input to be counted
 * @prop  {Number!} limit component will mark itself invalid if characters exceed this limit
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 */
var CharacterCount = React.createClass({
	propTypes: {
		input: React.PropTypes.string,
		limit: React.PropTypes.number.isRequired
	},

	/**
	 * Gets the initial state of the component.
	 *
	 * @memberOf FormComponents.CharacterCount
	 *
	 * @return {Object}
	 */
	getInitialState: function () {
		return {
			isValid: true,
			inputLength: 0
		};
	},

	/**
	 * Set the default character limit to be zero
	 *
	 * @memberOf FormComponents.CharacterCount
	 *
	 * @return {Object}
	 */
	getDefaultProps: function () {
		return {
			limit: 0
		};
	},

	/**
	 * Check if the input's character count has exceeded the limit
	 *
	 * @memberOf FormComponents.CharacterCount
	 *
	 * @return {Boolean}
	 */
	isInputValid: function () {
		var inputLength = this.props.input ? this.props.input.toString().length : 0;
		return inputLength <= this.props.limit;
	},

	/**
	 * Allow the component's `isValid` state to be set through the `props`
	 *
	 * @memberOf FormComponents.CharacterCount
	 *
	 * @return {null}
	 */
	componentWillReceiveProps: function () {
		this.setState({
			isValid: this.isInputValid()
		});
	},

	/**
	 * Build a the character limit counter display.
	 * E.g. "43/100"
	 *
	 * @memberOf FormComponents.CharacterCount
	 *
	 * @private
	 *
	 * @return {String}
	 */
	_buildDisplayString: function () {
		// Set default if input is null
		var input = this.props.input || '';

		// toString on input in case input is composed of solely numbers. This might not be necessary.
		return input.toString().length.toString() + '/' + this.props.limit.toString()
	},

	/**
	 * Renders the TextArea component.
	 *
	 * @memberOf FormComponents.CharacterCount
	 *
	 * @return {JSX}
	 */
	render: function () {
		var valid = this.isInputValid();

		var classes = classNames({
			valid: valid,
			invalid: ! valid
		});

		return (
			<div className="input-count">
				<span className={classes}>
					{this._buildDisplayString()}
				</span>
			</div>
		);
	}
});

module.exports = CharacterCount;
