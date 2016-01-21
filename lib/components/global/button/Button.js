var React = require('react/addons');

/**
 * @class Button
 *
 * @memberOf GlobalComponents
 * @see {@link GlobalComponents}
 */
var Button = React.createClass({
	propTypes: {
		action:       React.PropTypes.string.isRequired,
		handleAction: React.PropTypes.func.isRequired,
		mods:         React.PropTypes.array,
		type:         React.PropTypes.string,
		text:         React.PropTypes.string
	},

	handleClick: function (event) {
		this.props.handleAction(this.props.action, event);
	},

	_buildClassString: function () {
		var string = 'btn';
		var buttonMods = ['default', 'flat', 'raised', 'lg', 'sm', 'xs', 'primary', 'success', 'info', 'warning', 'danger', 'link']
		if (this.props.mods) {
			this.props.mods.forEach(function (mod, index) {
				if (buttonMods.indexOf(mod) > -1) {
					// Is a default button class type
					string = string.concat(' btn-' + mod);
				} else {
					string = string.concat(' ' + mod);
				}
			});
		}

		return string;
	},

	render: function () {
		return (
			<button type={this.props.type || 'button'}
				disabled={typeof this.props.disabled === 'undefined' ? false : this.props.disabled}
				className={this._buildClassString()}
				onClick={this.handleClick}>{this.props.text}
			</button>
		)
	}
});

module.exports = Button;
