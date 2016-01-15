// External Requirements
var React = require('react/addons');
var classNames = require('classnames');

// Components
var CharacterCount = require('./CharacterCount');

// Mixins
var FormUtility = require('./FormUtilityMixin');

/**
 * TextArea Component
 * A component used for building long-form text input forms.
 *
 * @class TextArea
 * @type {ReactComponent}
 *
 * @prop  {Number=}    	limit           Max character limit for text area
 * @prop  {String=}    	label
 * @prop  {String=}    	placeholder
 * @prop  {String=}    	helpText
 * @prop  {Boolean=}		disabled
 * @prop  {!String}   	fieldKey
 * @prop 	{Boolean=}		required
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 *
 * @example
 * render: function() { return(
 * 	<Br.Form.TextArea
 * 		fieldKey="userComment"
 * 		label="Comment"
 * 		placeholder="Sample text area component. Type away!"
 * 		required="true"
 *   />
 * )}
 *
 */
var TextArea = React.createClass({
	propTypes: {
		limit: React.PropTypes.number,
		label: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		helpText: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		fieldKey: React.PropTypes.string.isRequired,
		required: React.PropTypes.bool
	},

	mixins: [FormUtility],

	/**
	 * Gets the initial state of the component.
	 *
	 * @memberOf FormComponents.TextArea
	 *
	 * @return {Object}
	 */
	getInitialState: function () {
		return {
			isValid: true,
			renderCharacterCounter: false,
			fieldValue: null
		};
	},

	/**
	 * Set fieldValue through props based on attached resource.
	 *
	 * @memberOf FormComponents.TextArea
	 *
	 * @param  {Object}		nextProps	[description]
	 * @return {null}
	 */
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			fieldValue: this._findValueByPath(nextProps.bindResource, nextProps.fieldKey)
		});
	},

	/**
	 * When the field is out of focus, hide the text area character count.
	 *
	 * @memberOf FormComponents.TextArea
	 *
	 * @param					event
	 * @return 	{null}
	 */
	handleBlur: function (event) {
		this.setState({renderCharacterCounter: false});
	},

	/**
	 * When the field is in focus, show the text area character count.
	 *
	 * @memberOf FormComponents.TextArea
	 *
	 * @param      		event
	 * @return 	{null}
	 */
	handleFocus: function (event) {
		if (typeof this.props.limit !== 'undefined') {
			this.setState({renderCharacterCounter: true});
		}
	},

	/**
	 * Renders the TextArea component.
	 *
	 * @memberOf FormComponents.TextArea
	 *
	 * @return {JSX}
	 */
	render: function () {
		var classes = classNames({
			"form-group": true,
			"has-error": this._checkFieldIsValid()
		});

		return (
			<div className={classes}>
				<label className="control-label">{this.props.label}</label>

				<textarea className="form-control"
					rows={this.props.rows || 3}
					placeholder={this.props.placeholder || ''}
					disabled={this.props.disabled}
					onChange={this.handleChange}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					value={this.state.fieldValue || ''} ></textarea>

				{this.state.renderCharacterCounter && (
					<CharacterCount input={this.state.fieldValue} limit={this.props.limit} />
				)}

				{this._shouldRenderHelpBlock(this.props.helpText)}
			</div>
		);
	}
});

module.exports = TextArea;
