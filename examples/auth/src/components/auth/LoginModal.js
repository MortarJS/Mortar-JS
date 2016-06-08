import React from 'react';
var Mortar = require('../../bootstrap').MortarJS;

var Br = Mortar.require('components', 'Modal');

var LoginModal = React.createClass({
	render: function() {
		return (
			<div>
				<Br.Modal
					openWhen={true}
					title="Login"
					closeText="goAway"
					disableConfirm={this.state.workingResource.toggleConfirm}
					options={{
						keepOpen: true
					}}
					width="300px">

					<p>Modals are highly customizable and serve as a shell for many other components.</p>

				</Br.Modal>

			</div>
		);
	}
});

module.exports = LoginModal;
