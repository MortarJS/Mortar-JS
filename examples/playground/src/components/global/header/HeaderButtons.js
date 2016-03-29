var React = require('react/addons');
var HeaderButton = require('./HeaderButton');
var RequirePermissions = require('../../authentication/RequirePermissions');

var HeaderButtons = React.createClass({
	buildButtons: function () {
		return this.props.buttons.map(function(button, index) {
			if (Array.isArray(button.permissions)) {
				return (
					<RequirePermissions key={index} requiredPermissions={button.permissions}>
						<HeaderButton key={index} {...button} />
					</RequirePermissions>
				)
			} else {
				return <HeaderButton key={index} {...button} />;
			}
		})
	},

	render: function () {
		return (
			<ul className="nav navbar-nav navbar-right">
				{this.buildButtons()}
			</ul>
		)
	}
});

module.exports = HeaderButtons;
