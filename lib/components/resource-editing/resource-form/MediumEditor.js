// External Requirements
var React = require('react');
var MediumEditor = require('medium-editor');

// Stylesheets for the medium-editor
require('medium-editor/dist/css/themes/mani.min.css');
require('medium-editor/dist/css/medium-editor.min.css');

/**
 * MediumEditor Component
 * Forking the [react-medium-editor](https://github.com/wangzuo/react-medium-editor) by [Wang Zuo](https://github.com/wangzuo) who did all the heavy lifting.
 * This fork is meant to ensure a constant medium-editor version.
 *
 * @class MediumEditor
 * @type {ReactComponent}
 *
 * @param  	{String}		className
 * @param  	{!String}   fieldKey
 * @param  	{Object}    options
 * @param 	{Function}	onChange
 * @param  	{String}    text
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 */
module.exports = React.createClass({
	displayName: 'MediumEditor',

	propTypes: {
		className: React.PropTypes.string,
		fieldKey: React.PropTypes.string.isRequired,
		options: React.PropTypes.object,
		onChange: React.PropTypes.function,
		text: React.PropTypes.string
	},

	/**
	 * Register a new MediumEditor.
	 *
	 * @memberOf FormComponents.MediumEditor
	 *
	 * @return {null}
	 */
	componentDidMount: function componentDidMount() {
		var _this = this;

		var dom = this.getDOMNode();
		this.medium = new MediumEditor(dom, this.props.options);
	},

	/**
	 * Don't re-render component. Ever.
	 *
	 * @memberOf FormComponents.MediumEditor
	 *
	 * @param {Object}	nextProps
	 * @param 					nextState
	 *
	 * @returns {Boolean}
	 */
	shouldComponentUpdate: function(nextProps, nextState){
		return nextProps.text !== this.getDOMNode().innerHTML;
	},

	/**
	 * Remove the MediumEditor instance.
	 *
	 * @memberOf FormComponents.MediumEditor
	 *
	 * @return {null}
	 */
	componentWillUnmount: function componentWillUnmount() {
		this.medium.destroy();
	},

	/**
	 * Change handler.
	 *
	 * @memberOf FormComponents.MediumEditor
	 *
	 * @param event
	 *
	 * @return {null}
	 */
	onChange: function (event) {
		this.props.onChange(React.findDOMNode(this).innerHTML)
	},

	/**
	 * Renders the MediumEditor component.
	 *
	 * @memberOf FormComponents.MediumEditor
	 *
	 * @return {JSX}
	 */
	render: function render() {
		return (
			<div className={'medium-editor ' + this.props.className} onInput={this.onChange} onBlur={this.onChange}
				contentEditable={true} dangerouslySetInnerHTML={{__html: this.props.text}} />
		)
	}
});
