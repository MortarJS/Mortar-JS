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

	validInputRegExp : new RegExp(/^\d+(px|em|\%|cm|mm|in|pt|pc|ch|vh|vw|vmin|vmax)$/),
	digitRegExp      : new RegExp(/\d+/),
	unitRegExp       : new RegExp(/px|em|\%|cm|mm|in|pt|pc|ch|vh|vw|vmin|vmax$/),

	/**
	 * Dynamically computes the width and (conditionally) margin-left styles for the tooltip.
	 * A valid CSS length is required when passing the width property.
	 *
	 * @memberOf Global.Tooltip
	 *
	 * @param {string} width The width passed in from `this.props.width`
	 * @param {string} orientation `The orientation of the tooltip, passed from `this.props.orientation`
	 *
	 * @return {object|boolean} The computed styles for `width` and optionally `margin-left`.  False if the input is invalid.
	 */
	setWidth: function(width, orientation) {
		if (! this.validInputRegExp.test(width)) {

			if (! this.digitRegExp.test(width)) {
				console.error(`A digit is required when specifying width.  Your input: "${width}".  Falling back to the default 150px.`);
				return false;
			}

			if (! this.unitRegExp.test(width)) {
				console.error(`The value provided for width: "${width}" was not valid.  Please note that valid css units are required: https://developer.mozilla.org/en-US/docs/Web/CSS/length.  Falling back to the default 150px.`);
				return false;
			}
		}

		let styles = { width: width },
			widthValue = width.match(this.digitRegExp)[0],
			widthUnit = width.match(this.unitRegExp)[0];

		// If the tooltip is above or below the object, center the tooltip by applying `margin-left`.
		if (orientation === 'top' || orientation === 'bottom') {
			styles.marginLeft = -Math.ceil(widthValue / 2) + widthUnit;
		}

		return styles;
	},

	/**
	 * Dynamically computes the width and (conditionally) margin-top styles for the tooltip.
	 * A valid CSS length is required when passing the width property.
	 *
	 * @memberOf Global.Tooltip
	 *
	 * @param {string} width The width passed in from `this.props.width`
	 * @param {string} orientation `The orientation of the tooltip, passed from `this.props.orientation`
	 *
	 * @return {object|boolean} The computed styles for `width` and conditionally `margin-top`.  False if the input is invalid.
	 */
	setHeight: function(height, orientation) {
		if (! this.validInputRegExp.test(height)) {

			if (! this.digitRegExp.test(height)) {
				console.error(`A digit is required when specifying height.  Your input: "${height}".  Falling back to the default 150px.`);
			}

			if (! this.unitRegExp.test(height)) {
				console.error(`The value provided for height: "${height}" was not valid.  Please note that valid css units are required: https://developer.mozilla.org/en-US/docs/Web/CSS/length.  Falling back to the default 150px.`);
			}

			return false;
		}

		let styles = { height: height },
			heightValue = height.match(this.digitRegExp)[0],
			heightUnit = height.match(this.unitRegExp)[0];

		// If the tooltip is above or below the object, center the tooltip by applying `margin-top`.
		if (orientation === 'left' || orientation === 'right') {
			styles.marginTop = -Math.ceil(heightValue / 2) + heightUnit;
		}

		return styles;
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
			styles = Object.assign(styles, this.setWidth(width, orientation));
		}

		// Conditionally set the height of the tooltip and margin (for alignment)
		if (height) {
			styles = Object.assign(styles, this.setHeight(height, orientation));
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
			styles.visibility = 'visible';
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
