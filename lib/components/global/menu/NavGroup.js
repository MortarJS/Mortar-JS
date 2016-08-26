// External Requirements
import React from 'react';
import NavItem from './NavItem';

/**
 * NavGroup
 *
 * @type {*|Function}
 */
var NavGroup = React.createClass({
	propTypes: {
		item: React.PropTypes.shape({
			uri         : React.PropTypes.string,
			text        : React.PropTypes.any,
			children    : React.PropTypes.array,
			conditional : React.PropTypes.oneOfType([
				React.PropTypes.bool,
				React.PropTypes.func
			])
		}).isRequired
	},

	renderNavGroup: function(item, index, c) {
		return (
				<div key={item.text + index} className={c}>
					<NavItem item={item} index={index} />
					<ul className='nav-group-items'>
						{this.buildNavGroupItems(item, index, false)}
					</ul>
				</div>
		);
	},

	/**
	 * Builds the nav-group for nested navigation elements.
	 * Then passes the parent `item` into `buildNavGroupItems` to build the individual nav-items
	 *
	 * @param {object}  item  The nav-item that has child nav-items
	 * @param {number}  index The index of the parent.
	 * @param {boolean} root  If this nav-group is a direct descendent of the root navigation
	 *
	 * @return {JSX}
	 */
	buildNavGroup: function(item, index, root = true) {
		let c = "nav-group";
		if (root) {
			c += " root";
		}

		if (this.props.item.hasOwnProperty('conditional')) {
			let conditional = this.props.item.conditional;

			if (typeof conditional === 'function' && conditional()) {
				return this.renderNavGroup(item, index, c);
			} else if (typeof conditional === 'boolean' && conditional) {
				return this.renderNavGroup(item, index, c);
			}

			return null;
		}

		return this.renderNavGroup(item, index, c);

	},

	/**
	 * Builds each individual nav-item.
	 * If the nav-item has `children`, passes it back into `buildNavGroup` to build all dropdown items
	 *
	 * @param {object} item  The nav-item that has hild nav-items
	 * @param {number} index The index of the nav group.  Defaults to 0 if no argument is passed.
	 *
	 * @return {Array<JSX>}  The nav items.
	 */
	buildNavGroupItems: function(item, index = 0) {
		if (index > 0) {
			index++;
		}

		return item.children.map((child, i) => {

			if (child.children) {
				return this.buildNavGroup(child, index + i, false);
			}

			return (
				<NavItem key={i} item={child} index={index + i} />
			);
		});
	},

	/**
	 * Renders the final NavGroup
	 *
	 * @return {JSX} The NavGroup component
	 */
	render: function() {
		return this.buildNavGroup(this.props.item);
	}
});

module.exports = NavGroup;
