var React = require('react');

/**
 * @class Tooltip
 * @type {ReactComponent}
 *
 * @prop {*}             children    The children that the tooltip wraps and will point to when open.
 * @prop {!string}       text        The text to display inside of the tooltip
 * @prop {string=}       orientation The orientation of the tooltip. (top, bottom, left, right)
 * @prop {string=}       color       The text color
 * @prop {string=}       background  The background color
 * @prop {string|number} width       The width (in pixels) of the tool tip
 * @prop {string|number} height      The height (in pixels) of the tool tip
 * @prop {boolean=}      keepOpen    If true, the tooltip is always shown
 *
 * @memberOf GlobalComponents
 * @see {@link GlobalComponents}
 */
var Tooltip = React.createClass({
	propTypes: {
		children    : React.PropTypes.any,
		text        : React.PropTypes.string.isRequired,
		orientation : React.PropTypes.string,
		color       : React.PropTypes.string,
		background  : React.PropTypes.string,
		width       : React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		]),
		height: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		]),
		keepOpen: React.PropTypes.bool
	},

	/**
	 * Renders the Tooltip.
	 *
	 * @memberOf Global.Tooltip
	 *
	 * @return {JSX}
	 */
	render: function() {
		let styles      = {},
			orientation = this.props.orientation,
			width       = this.props.width,
			height      = this.props.height;

		// Conditionally set the width of the tooltip and margin (for alignment)
		if (width) {
			styles.width = width;

			if (orientation === "top" || orientation === "bottom") {
				styles.marginLeft = -Math.ceil(width / 2);
			}
		}

		// Conditionally set the height of the tooltip and margin (for alignment)
		if (height) {
			styles.height = height;

			if (orientation === "left" || orientation === "right") {
				styles.marginTop = -Math.ceil(height / 2);
			}
		}

		// Allow for user defined text color
		if (this.props.color) {
			styles.color = this.props.color;
		}

		// Allow for user defined background color
		if (this.props.background) {
			styles.background = this.props.background;
		}

		// Keeps the tooltip open, regardless of hover.
		if (this.props.keepOpen) {
			styles.opacity = 1;
			styles.visibility = "visible";
		}

		return (
			<span className="mortar-tooltip-container">
				<span style={styles} className={ `mortar-tooltip ${this.props.orientation || "top"}` }>
					{this.props.text}
				</span>

				{this.props.children}
			</span>
		);
	}
});

module.exports = Tooltip;
