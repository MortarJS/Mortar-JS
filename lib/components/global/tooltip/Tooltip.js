var React = require('react');

/**
 * @class Tooltip
 *
 * @memberOf GlobalComponents
 * @see {@link GlobalComponents}
 */
var Tooltip = React.createClass({
	propTypes: {
		text: React.PropTypes.string.isRequired,
		orientation: React.PropTypes.string,
		color: React.PropTypes.string,
		width: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		]),
		keepOpen: React.PropTypes.bool,
	},

	render: function() {
		let styles      = {},
			orientation = this.props.orientation,
			width       = this.props.width,
			height      = this.props.height;

		if (width) {
			styles.width = width;

			if (orientation === "top" || orientation === "bottom") {
				styles.marginLeft = -(Math.ceil(width / 2));
			}
		}

		if (height) {
			styles.height = height;

			if (orientation === "left" || orientation === "right") {
				styles.marginTop = -(Math.ceil(height / 2));
			}
		}

		if (this.props.color) {
			styles.color = this.props.color;
		}

		if (this.props.background) {
			styles.background = this.props.background;
		}

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
