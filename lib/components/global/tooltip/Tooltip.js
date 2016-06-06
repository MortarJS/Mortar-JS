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
		width       : React.PropTypes.string,
		height      : React.PropTypes.string,
		keepOpen    : React.PropTypes.bool
	},

	unitRegExp  : new RegExp(/^\d+(px|em|\%|cm|mm|in|pt|pc|ch|vh|vw|vmin|vmax)$/),
	digitRegExp : new RegExp(/\d+/),

	setWidth: function(width, orientation, styles) {

		if (this.digitRegExp.test(width)) {
			if (! this.unitRegExp.test(width)) {
				let newWidth = width.match(this.digitRegExp)[0] + 'px';
				console.warn(`The value provided for width: "${width}" was not valid.  Adjusting to ${newWidth}. Please note that valid css units are required: https://developer.mozilla.org/en-US/docs/Web/CSS/length`);
				width = newWidth;
			}

			styles.width = width;

			if (orientation === "top" || orientation === "bottom") {
				let widthValue = width.match(this.digitRegExp)[0];
				styles.marginLeft = -Math.ceil(widthValue / 2);
			}
		} else {
			console.error(`A digit is required when specifying width.  Your input: "${width}".  Falling back to 150px.`);
		}
	},

	setHeight: function(height, orientation, styles) {
		if (this.digitRegExp.test(height)) {
			if (! this.unitRegExp.test(height)) {
				let newHeight = height.match(this.digitRegExp)[0] + 'px';
				console.warn(`The value provided for height: "${height}" was not valid.  Adjusting to ${newHeight}. Please note that valid css units are required: https://developer.mozilla.org/en-US/docs/Web/CSS/length`);
				height = newHeight;
			}

			styles.height = height;

			if (orientation === "left" || orientation === "right") {
				let heightValue = height.match(this.digitRegExp)[0];
				styles.marginLeft = -Math.ceil(heightValue / 2);
			}
		} else {
			console.error(`A digit is required when specifying height.  Your input: "${height}".  Falling back to 150px.`);
		}
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
			this.setWidth(width, orientation, styles);
		}

		// Conditionally set the height of the tooltip and margin (for alignment)
		if (height) {
			this.setHeight(height, orientation, styles);
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
