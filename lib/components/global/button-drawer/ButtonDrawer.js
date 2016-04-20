var React     = require('react');
var Button    = require('../button/Button');

/**
 * @class ButtonDrawer
 *
 * @memberOf GlobalComponents
 * @see {@link GlobalComponents}
 */
var ButtonDrawer = React.createClass({
	propTypes: {
		mods         : React.PropTypes.array,
		type         : React.PropTypes.string,
		icon         : React.PropTypes.string,
		iconClass    : React.PropTypes.string,
		handleAction : React.PropTypes.func,
		action       : React.PropTypes.string,
		buttons      : React.PropTypes.arrayOf(
			React.PropTypes.shape({
				action       : React.PropTypes.string,
				handleAction : React.PropTypes.func,
				icon         : React.PropTypes.string,
				mod          : React.PropTypes.string
			})
		).isRequired
	},

	getInitialState: function() {
		return {
			showButtons: false
		};
	},

	handleClick: function (event) {
		this.props.handleAction(this.props.action, event);
	},

	buttonClasses: function(mods) {
		// @TODO Does this need to loop for the mods?
		// @TODO should fab and raised be mods?
		return `btn btn-${mods || "info"} btn-fab btn-raised`;
	},

	buttonDrawerClasses: function(button) {
		return `${this.buttonClasses(button.mod)} ${button.iconClass || "icon"}-${button.icon || "times"}`
	},

	buildButtons: function() {
		return this.props.buttons.reverse().map((button, index) => {
			return (
				<a key={index} className={ `${this.buttonDrawerClasses(button)}` } />
			);
		});
	},

	classes: function() {
		return {
			// 'visible'       : this.state.showButtons,
			// 'hidden'        : ! this.state.showButtons,
			'button-drawer' : true
		};
	},

	render: function() {
		return (
			<div className="button-drawer-container">
				<div className="hidden-buttons">
					{this.buildButtons()}
				</div>
				<a className={ `${this.buttonClasses(this.props.mods || "primary")} ${this.props.iconClass || "icon"} ${this.props.iconClass || "icon"}-${this.props.icon || "pencil"}` } />
			</div>
		);
	}
});

module.exports = ButtonDrawer;
