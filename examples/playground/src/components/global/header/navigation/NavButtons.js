module.exports = function (navbarConfig) {
	var React = require('react/addons');
	var NavButton = require('./NavButton');
	var NavSearch = require('./NavSearch');
	var RequirePermissions = require('../../../authentication/RequirePermissions');

	return React.createClass({
		buttons: function () {
			return navbarConfig.map(function (button, index) {
				if (Array.isArray(button.permissions)) {
					return (
						<RequirePermissions key={index} requiredPermissions={button.permissions}>
							<NavButton key={index} button={button} />
						</RequirePermissions>
					);
				} else {
					return (
						<NavButton key={index} button={button} />
					)
				}
			});
		},

		render:  function () {
			return (
				<ul className="nav navbar-nav">
				{this.buttons()}
				</ul>
			)
		}
	});
};
