var React = require('react');
var MediumEditor = require('medium-editor');

require('medium-editor/dist/css/themes/mani.min.css');
require('medium-editor/dist/css/medium-editor.min.css');

/**
 * Forking https://github.com/wangzuo/react-medium-editor who did all the heavy lifting. This allows us to control
 * the medium-editor version.
 */
module.exports = React.createClass({
	displayName: 'MediumEditor',

	/**
	 * Register a new MediumEditor
	 */
	componentDidMount: function componentDidMount() {
		var _this = this;

		var dom = this.getDOMNode();
		this.medium = new MediumEditor(dom, this.props.options);
	},

	/**
	 * Don't re-render component. Ever.
	 *
	 * @param nextProps
	 * @param nextState
	 * @returns {boolean}
	 */
	shouldComponentUpdate: function(nextProps, nextState){
		return nextProps.text !== this.getDOMNode().innerHTML;
	},

	/**
	 * Remove the MediumEditor instance
	 */
	componentWillUnmount: function componentWillUnmount() {
		this.medium.destroy();
	},

	/**
	 * Change handler
	 * @param event
	 */
	onChange: function (event) {
		this.props.onChange(React.findDOMNode(this).innerHTML)
	},

	render: function render() {
		return (
			<div className={'medium-editor ' + this.props.className} onInput={this.onChange} onBlur={this.onChange}
				contentEditable={true} dangerouslySetInnerHTML={{__html: this.props.text}} />
		)
	}
});
