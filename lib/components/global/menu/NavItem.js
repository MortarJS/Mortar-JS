// External Requirements
import React from 'react';
import {Link} from 'react-router';

/**
 * NavItem
 *
 * @type {*|Function}
 */
var NavItem = React.createClass({
	propTypes: {
		index : React.PropTypes.number,
		item  : React.PropTypes.shape({
			uri         : React.PropTypes.string,
			text        : React.PropTypes.any.isRequired,
			children    : React.PropTypes.array,
			conditional : React.PropTypes.oneOfType([
				React.PropTypes.func,
				React.PropTypes.bool
			])
		}).isRequired
	},

	createClassName: function(uri) {

		let isActive = window.location.hash.indexOf(uri) > -1 ? 'active' : '',
			classes = `nav-item ${isActive}`;

		if (this.props.index) {
			let placement = this.props.index % 2 ? "even" : "odd";
			return classes + ` ${placement}`;
		}

		return classes + " first-child";
	},

	renderLinkItem: function() {
		return (
			<li className={this.createClassName(this.props.item.uri)}><Link to={this.props.item.uri}><span dangerouslySetInnerHTML={{__html: this.props.item.text}}></span></Link></li>
		);
	},

	render: function() {
		if (this.props.item.hasOwnProperty('conditional')) {
			let conditional = this.props.item.conditional;

			if (typeof conditional === 'function' && conditional()) {
				return this.renderLinkItem();
			} else if (typeof conditional === 'boolean' && conditional) {
				return this.renderLinkItem();
			}

			return null;
		}

		if (this.props.item.uri) {
			return this.renderLinkItem();
		}

		return (
			<li className={this.createClassName()}>
				<span className="nav-text">{this.props.item.text}</span>
			</li>
		);

	}
});

module.exports = NavItem;
