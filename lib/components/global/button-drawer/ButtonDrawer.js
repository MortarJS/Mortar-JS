var React = require('react');

/**
 * @class ButtonDrawer
 *
  * @prop {string|array}  mods         The mods for the buttonDrawer buttons
  * @prop {string}        type         The type of button to show
  * @prop {string}        icon         The buttonDrawer's icon
  * @prop {string}        iconClass    The buttonDrawer's iconClass (for example, `fa` for font-awesome)
  * @prop {func}          handleAction The function to call when an action is fired
  * @prop {Array<object>} buttons      The hidden buttons of the buttonDrawer
 *
 * @memberOf GlobalComponents
 * @see {@link GlobalComponents}
 */
var ButtonDrawer = React.createClass({
	propTypes: {
		mods: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.array
		]),
		type         : React.PropTypes.string,
		icon         : React.PropTypes.string,
		iconClass    : React.PropTypes.string,
		handleAction : React.PropTypes.func.isRequired,
		buttons      : React.PropTypes.arrayOf(
			React.PropTypes.shape({
				action : React.PropTypes.string,
				icon   : React.PropTypes.string,
				mods   : React.PropTypes.oneOfType([
					React.PropTypes.string,
					React.PropTypes.array
				])
			})
		).isRequired
	},

	/**
	 * Sets the initial state of the component
	 *
	 * @return {null}
	 */
	getInitialState: function() {
		return {
			showButtons: false
		};
	},

	/**
	 * Handles when buttons are clicked and fires the button's action
	 *
	 * @param {object} button The button that was clicked
	 * @param {event}  event  The event that triggered this function call
	 *
	 * @return {null}
	 */
	handleClick: function (button, event) {
		this.props.handleAction(button.action, event);
	},

	/**
	 * Builds the class names for an individual button based on the mod prop
	 *
	 * @param {Array<string>|string} mods Additional classes to apply to the button.
	 *
	 * @return {string}                   The final string of class names
	 */
	buttonClasses: function(mods) {
		if (typeof mods === 'object') {
			mods = mods.map((mod) => {
				return `btn-${mod}`;
			}).join(' ');
		} else {
			mods = mods ? `btn-${mods}` : 'btn-info';
		}

		return `btn ${mods} btn-fab btn-raised`;
	},

	/**
	 * Builds the classes for the main button drawer button and container
	 *
	 * @param {object} button The button drawer main button
	 *
	 * @return {null}
	 */
	buttonDrawerClasses: function(button) {
		return `${this.buttonClasses(button.mods)} ${this.props.iconClass || "icon"}-${button.icon || "times"}`;
	},

	/**
	 * Build the jsx for each button in the drawer.
	 *
	 * @return {Array<jsx>} The built components
	 */
	buildButtons: function() {
		return this.props.buttons.reverse().map((button, index) => {
			return (
				<a key={index} className={ `${this.buttonDrawerClasses(button)}` } onClick={this.handleClick.bind(null, button)} />
			);
		});
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
