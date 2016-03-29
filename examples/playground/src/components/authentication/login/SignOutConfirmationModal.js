var React = require('react/addons');
var Router= require('react-router');
var MortarJS = require('../../../bootstrap').MortarJS;
var Modal = MortarJS.Components.Global.Modal;
var GeneralCmsActionCreators = MortarJS.Actions.GeneralCmsActionCreators;

var SignOutConfirmationModal = React.createClass({
	/**
	 * Require the React router as a mixin to help with redirects
	 */
	mixins: [Router.Navigation],

	signUserOut: function () {
		this.replaceWith('/logout');
	},

	closeModal: function () {
		GeneralCmsActionCreators.cancelSignOutAction();
	},

	render: function () {
		return (
			<Modal openWhen={this.props.openWhen} title="Sign Out?"
				closeText="Cancel" saveText="Sign Out"
				beforeClose={this.closeModal}
				beforeSave={this.signUserOut} >

				<p>Are you sure you want to sign out&#63; You will have to login again in order to access any part of the CMS.</p>
				<p>If you have not saved your edits they will be lost.</p>

			</Modal>
		)
	}
});

module.exports = SignOutConfirmationModal;
