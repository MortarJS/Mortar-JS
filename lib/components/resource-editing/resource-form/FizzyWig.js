// External Requirements
var React = require('react/addons');
var classNames = require('classnames');

// Components
var Editor = require('./MediumEditor');
var CharacterCount = require('./CharacterCount');

// Mixins
var FormUtility = require('./FormUtilityMixin');

/**
 * FizzyWig Component
 * A 'what-you-see-is-what-you-get' style text editor component using a fork from the [react-medium-editor](https://github.com/wangzuo/react-medium-editor).
 *
 * @class FizzyWig
 * @type {ReactComponent}
 *
 * @param  {String}    label
 * @param  {String}    helpText
 * @param  {String}    className
 * @param  {String!}   fieldKey
 * @param  {Object}    options   Config options for the text editor, all possible options can be found [here](https://github.com/yabwe/medium-editor/tree/5.6.0#options-example).
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 */
var FizzyWig = React.createClass({

	propTypes: {
		label: React.PropTypes.string,
		helpText: React.PropTypes.string,
		className: React.PropTypes.string,
		fieldKey: React.PropTypes.string.isRequired,
		options: React.PropTypes.object
	},

	mixins: [FormUtility],

	/**
	 * Gets the initial state of the component.
	 *
	 * @memberOf FormComponents.FizzyWig
	 *
	 * @return {Object}
	 */
	getInitialState: function () {
		return {
			isValid: true,
			renderCharacterCounter: false,
			fieldValue: 'This is some sample text to edit'
		}
	},

	/**
	 * Called anytime this component receives new props.  Not called on initial render.
	 *
	 * @memberOf FormComponents.FizzyWig
	 *
	 * @param {array} nextProps An array of the properties this component will receive
	 *
	 * @return {null}
	 */
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			fieldValue: this._findValueByPath(nextProps.bindResource, nextProps.fieldKey)
		});
	},

	/**
	 * Build the medium editor options object
	 *
	 * @memberOf FormComponents.FizzyWig
	 *
	 * @return {*}
	 *
	 * @private
	 */
	_buildOptions: function () {
		return typeof this.props.options !== 'undefined' ? this.props.options : {};
	},

	/**
	 * Bubble text back up to the changeCallback
	 *
	 * @memberOf FormComponents.FizzyWig
	 *
	 * @param {!String} text
	 *
	 * @private
	 */
	_customHandleChange: function (text) {
		this.props.changeCallback(this.props.fieldKey, text, this);
	},

	/**
	 * Renders the FizzyWig component.
	 *
	 * @memberOf FormComponents.FizzyWig
	 *
	 * @return {JSX}
	 */
	render: function() {
		var buttons = this.buttons;
		return (
			<div>
				<label className="control-label">{this.props.label}</label>

				{this._shouldRenderHelpBlock(this.props.helpText)}

				<Editor text={this.state.fieldValue} className={this.props.className} onChange={this._customHandleChange}
					options={this._buildOptions()} />
			</div>
		);
	}
});

module.exports = FizzyWig;
