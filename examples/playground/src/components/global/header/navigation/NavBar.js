var navbarConfig = require('../../../../config/config').navbar;
var React = require('react');
var NavButtons = require('./NavButtons')(navbarConfig);

var NavBar = React.createClass({
	render: function () {
		return (
			<div className="nav navbar-nav">
				<NavButtons />
			</div>
		)
	}
});

module.exports = NavBar;
