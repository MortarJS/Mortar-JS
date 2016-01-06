var React = require('react/addons');
var FormUtility = require('./FormUtilityMixin');
var CharacterCount = require('./CharacterCount');
var classNames = require('classnames');
var Editor = require('./MediumEditor');

var FizzyWig = React.createClass({
	mixins: [FormUtility],

	propTypes: {
		label: React.PropTypes.string,
		helpText: React.PropTypes.string,
		className: React.PropTypes.string,
		fieldKey: React.PropTypes.string.isRequired,
		// Possible buttons: https://github.com/yabwe/medium-editor/tree/5.6.0#all-buttons
		options: React.PropTypes.object
	},

	getInitialState: function () {
		return {
			isValid: true,
			renderCharacterCounter: false,
			fieldValue: 'This is some sample text to edit'
		}
	},

	/**
	 * Determine component state based on form field updates
	 *
	 * @param nextProps
	 */
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			fieldValue: this._findValueByPath(nextProps.bindResource, nextProps.fieldKey)
		})
	},

	/**
	 * Build the medium editor options object
	 *
	 * @returns {*}
	 * @private
	 */
	_buildOptions: function () {
		return typeof this.props.options !== 'undefined' ? this.props.options : {};
	},

	/**
	 * Bubble text back up to the changeCallback
	 *
	 * @param text
	 * @private
	 */
	_customHandleChange: function (text) {
		this.props.changeCallback(this.props.fieldKey, text, this);
	},

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
