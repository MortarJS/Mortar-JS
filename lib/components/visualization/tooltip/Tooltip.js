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
		width: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		])
	},

	render: function() {
		let styles = {};

		if (this.props.width) {
			styles.width = this.props.width;

			if (this.props.orientation === "top" || this.props.orientation === "bottom") {
				styles.marginLeft = -(Math.ceil(this.props.width / 2));
			}
		}

		if (this.props.height) {
			styles.height = this.props.height;

			if (this.props.orientation === "left" || this.props.orientation === "right") {
				styles.marginTop = -(Math.ceil(this.props.height / 2));
			}
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
