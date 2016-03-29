var React = require('react/addons');
var HeaderButtonDropDownItem = require('./HeaderButtonDropdownItem');
var SignOutLink = require('../../authentication/login/SignOutHeaderLink');
var RequirePermissions = require('../../authentication/RequirePermissions');

var HeaderButtonDropdown = React.createClass({
	buildItems: function () {
		return this.props.items.map(function (item, index) {
			if (Array.isArray(item.permissions)) {
				return (
					<RequirePermissions key={index} requiredPermissions={item.permissions}>
						<HeaderButtonDropDownItem key={index} {...item} />
					</RequirePermissions>
				)
			} else {
				return <HeaderButtonDropDownItem key={index} {...item} />;
			}
		});
	},

	render: function () {
		return (
			<ul className="dropdown-menu dropdown-user">
				{this.buildItems()}
				<SignOutLink />
			</ul>
		)
	}
});

module.exports = HeaderButtonDropdown;
