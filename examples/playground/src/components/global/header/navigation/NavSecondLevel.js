var React = require('react/addons');
var NavThirdLevel = require('./NavThirdLevel');

// @todo keep it DRY. This and third level can be combined. Indirect CSS.
var NavSecondLevel = React.createClass({
	propTypes: {
		button: React.PropTypes.shape({
			href: React.PropTypes.string.isRequired,
			buttonName: React.PropTypes.string.isRequired
		})
	},

	children: function() {
		return this.props.button.children.map(function(button, index) {
			return (
				<NavThirdLevel key={index} button={button} />
			)
		});
	},

	render: function () {
		return (
			<li>
				<a href={this.props.button.href}>{this.props.button.buttonName}</a>
			</li>
		)
	}
});

module.exports = NavSecondLevel;
