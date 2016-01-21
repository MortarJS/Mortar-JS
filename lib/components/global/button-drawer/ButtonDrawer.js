var React     = require('react/addons');
var Button    = require('../button/Button');
var className = require('classnames');

/**
 * @class ButtonDrawer
 *
 * @memberOf GlobalComponents
 */
var ButtonDrawer = React.createClass({
	propTypes: {
		buttons : React.PropTypes.array.isRequired,
		mods    : React.PropTypes.array,
		type    : React.PropTypes.string,
		text    : React.PropTypes.string
	},

	getInitialState: function() {
		return {
			showButtons: false,
		}
	},

	handleClick: function (event) {
		this.props.handleAction(this.props.action, event);
	},

	buildButtons: function() {
		return this.props.buttons.map(function(button) {
			return (
				<Button action={button.action}
					handleAction={button.handleAction}
					text={button.text} />
			)
		});
	},

	classes: function() {
		return {
			'visible'       : this.state.showButtons,
			'hidden'        : !this.state.showButtons,
			'button-drawer' : true
		}
	},

	doNothing: function() {},

	// The button in here should be an AddAction probably
	render: function () {
		return (
			<div className={'button-drawer-container'}>
				<div className="hidden-buttons">
					{this.buildButtons()}
				</div>
				<a className="btn btn-info btn-fab btn-raised">+</a>
			</div>
		)
	}
});

module.exports = ButtonDrawer;

