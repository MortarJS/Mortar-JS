var React = require('react');
var MortarJS = require('../../../bootstrap').MortarJS;
var GeneralCmsActionCreators = MortarJS.Actions.GeneralCmsActionCreators;

var SignOutHeaderLink = React.createClass({
	toggleSignOutModal: function (event) {
		GeneralCmsActionCreators.requestSignOut();
	},

	render: function () {
		return (
			<li>
				<a href="javascript:void(0)" onClick={this.toggleSignOutModal}>
					<i className={'fa fa-sign-out fa-fw'}></i>
					Sign Out
				</a>
			</li>
		)
	}
});

module.exports = SignOutHeaderLink;
