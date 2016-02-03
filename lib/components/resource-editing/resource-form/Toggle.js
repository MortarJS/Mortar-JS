// External Requirements
var React          = require('react/addons');
var className      = require('classnames');

// Components
var CharacterCount = require('./CharacterCount');

// Stores
var FormStore      = require('../../../stores/FormStore');

// Mixins
var FormUtility    = require('./FormUtilityMixin');
var FormKeyMixin   = require('../../../mixins/FormKeyMixin');

/**
 * Form Toggle Component
 * Responsible for handling simple keyboard inputs.
 *
 * @class Toggle
 * @type {ReactComponent}
 *
 * @prop {!String}       fieldKey
 * @prop {String=}       fieldLabel
 * @prop {Boolean=}      disabled
 * @prop {Boolean=}      checked        A custom checked value if we don't want to rely on fieldValue
 * @prop {Array<string>} mods
 * @prop {Function=}     changeCallback
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 *
 */
var Toggle = React.createClass({
	propTypes: {
		fieldKey   : React.PropTypes.string.isRequired,
		fieldLabel : React.PropTypes.string,
		disabled   : React.PropTypes.bool,
		mods       : React.PropTypes.array,
		checked    : React.PropTypes.bool
	},

	mixins: [FormUtility, FormKeyMixin],

	/**
	 * Gets the initial state of the component
	 *
	 * @memberOf FormComponents.Toggle
	 *
	 * @return {Object}
	 */
	getInitialState: function () {
		return {
			isValid: true,
			fieldValue: false,
			id: ''
		};
	},

	componentDidMount: function() {
		this.setState({
			id: this._generateFormKey()
		})
	},

	/**
	 * Set fieldValue through props based on attached resource.
	 *
	 * @memberOf FormComponents.Toggle
	 *
	 * @param  {Object}
	 * @return {null}
	 */
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			fieldValue: this._findValueByPath(nextProps.bindResource, nextProps.fieldKey)
		});
	},

	/**
	 * Handles user input into the input component.
	 * Sets `fieldValue` in the component state to equal the keyboard input and syncs with the provided remote through a callback.
	 *
	 * @memberOf FormComponents.Toggle
	 *
	 * @return {null}
	 */
	handleInput: function(event) {
		this.props.changeCallback(this.props.fieldKey, event.target.checked, this);

		this.setState({
			fieldValue: event.target.checked
		});
	},

	/**
	 * Renders the Toggle component.
	 *
	 * @memberOf FormComponents.Toggle
	 *
	 * @return {JSX}
	 */
	render: function () {
		var classes = {
			"form-group"    : true,
			"has-error"     : this._checkFieldIsValid(),
			'mortar-toggle' : true,
			'disabled'      : this.props.disabled
		};

		if (this.props.mods) {
			this.props.mods.forEach(function(mod) {
				classes[mod] = true;
			});
		}

		return (
			<div className={className(classes)}>
				{this.props.fieldLabel && (
					<label className="control-label">{this.props.fieldLabel}</label>
				)}

				<input
					id       = {this.state.id}
					type     = "checkbox"
					onChange = {this.handleInput}
					checked  = {this.props.checked || this.state.fieldValue}
					disabled = {this.props.disabled} />

				<label htmlFor={this.state.id} />
			</div>
		);
	}
});

module.exports = Toggle;


