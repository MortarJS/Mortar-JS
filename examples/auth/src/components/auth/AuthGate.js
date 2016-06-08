import React from 'react';
import AuthStore from './AuthStore';

var Authenticate = React.createClass({

	shouldRender: function() {
		if (this.props.deny && AuthStore.isUserAuthenticated()) {
			return false;
		}

		if (AuthStore.isUserAuthenticated()) {
			return true;
		}
	},

	render: function() {
		return (
			<div>
				{(() => {
					switch (this.shouldRender()) {
							case true  : return this.props.children;
							case false : return null;
							default    : return null;
					}
				})()}
			</div>
		);
	}
});

module.exports = Authenticate;
