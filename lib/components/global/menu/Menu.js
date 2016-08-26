// External Requirements
import React from 'react';

var NavItem = require('./NavItem');
var NavGroup = require('./NavGroup');

/**
 * Dashboard
 *
 * @type {*|Function}
 */
var Menu = React.createClass({
	propTypes: {
		items: React.PropTypes.array
	},

	buildNavItems: function() {
		return this.props.items.map((item, i) => {
			if (item.children) {
				return (
					<NavGroup key={i} item={item} />
				);
			}

			return (
				<NavItem key={i} item={item} />
			);
		});
	},

	render: function() {
		return (
			<section className="mortar-header top">
				<nav className="mortar-navigation">
					<ul className="nav-items">
						{this.buildNavItems()}
					</ul>
				</nav>
			</section>
		);

	}
});

module.exports = Menu;
