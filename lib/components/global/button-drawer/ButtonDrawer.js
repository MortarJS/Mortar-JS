var React     = require('react');

/**
 * @class ButtonDrawer
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

	getInitialState: function() {
		return {
			showButtons: false
		};
	},

	handleClick: function (button, event) {
		console.log('clicked!', button);
		this.props.handleAction(button.action, event);
	},

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

	buttonDrawerClasses: function(button) {
		return `${this.buttonClasses(button.mods)} ${this.props.iconClass || "icon"}-${button.icon || "times"}`;
	},

	buildButtons: function() {
		return this.props.buttons.reverse().map((button, index) => {
			return (
				<a key={index} className={ `${this.buttonDrawerClasses(button)}` } onClick={this.handleClick.bind(null, button)} />
			);
		});
	},

	classes: function() {
		return {
			'button-drawer': true
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
