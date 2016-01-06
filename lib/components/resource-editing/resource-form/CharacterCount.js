var React = require('react/addons');
var classNames = require('classnames');

var CharacterCount = React.createClass({
	propTypes: {
		input: React.PropTypes.string,
		limit: React.PropTypes.number.isRequired
	},

	getInitialState: function () {
		return {
			isValid: true,
			inputLength: 0
		}
	},

	getDefaultProps: function () {
		return {
			limit: 0
		}
	},

	isInputValid: function () {
		var inputLength = this.props.input ? this.props.input.toString().length : 0;
		return inputLength <= this.props.limit;
	},

	componentWillReceiveProps: function () {
		this.setState({
			isValid: this.isInputValid()
		});
	},

	_buildDisplayString: function () {
		// Set default if input is null
		var input = this.props.input || '';

		// toString on input in case input is composed of solely numbers. This might not be necessary.
		return input.toString().length.toString() + '/' + this.props.limit.toString()
	},

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
		)
	}
});

module.exports = CharacterCount;
