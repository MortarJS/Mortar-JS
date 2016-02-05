// External Requirements
var _                  = require('lodash');
var React              = require('react/addons');
var isEmpty            = require('../../../utils/isEmpty');
var className          = require('classnames');

// Components
var Input              = require('./Input');
var Button             = require('../../Global/button/Button');
var AppActionConstants = require('../../../constants/AppActionConstants');

// Stores
var FormStore          = require('../../../stores/FormStore');

// Mixins
var FormUtility        = require('./FormUtilityMixin');

/**
 * DropdownSelect class.
 *
 * The dropdown select component is used to...
 *
 * @class DropdownSelect
 * @type {ReactComponent}
 *
 * @prop {!string}          fieldKey
 * @prop {string=}          placeholder
 * @prop {function=}        callback
 * @prop {function=}        changeCallback
 * @prop {!array}           options
 * @prop {string=}          unique
 * @prop {string|function=} label
 * @prop {string=}          inputLabel
 * @prop {boolean=}         multiple
 * @prop {boolean=}         disabled
 * @prop {boolean=}         debug
 *
 *
 * @memberOf FormComponents
 * @see {@link FormComponents}
 *
 * @example
 * <Br.Form.DropdownSelect fieldKey='Ages'
 *	options={['1-10', '11-20', '21-30']}
 *	multiple={false} placeholder='Select an Age'
 *	required="true" />
 */
var DropdownSelect = React.createClass({

	propTypes: {
		fieldKey         : React.PropTypes.string.isRequired,
		placeholder      : React.PropTypes.string,
		callback         : React.PropTypes.func,
		changeCallback   : React.PropTypes.func,

		options          : React.PropTypes.array.isRequired,
		unique           : React.PropTypes.string,
		label            : React.PropTypes.oneOfType([ // The label displayed in the dropdown
			React.PropTypes.string, // The key on the options object to display
			React.PropTypes.func    // A callback function to do more complex label displays
		]),
		inputLabel       : React.PropTypes.string, // The label for the input field
		multiple         : React.PropTypes.bool,
		disabled         : React.PropTypes.bool,
		debug            : React.PropTypes.bool
	},

	mixins: [FormUtility],

	getInitialState: function() {
		if (this.props.debug) {
			console.log('DropdownSelect Debug Information:');
			console.log('OPTIONS:')
			console.table(this.props.options);
			console.log('LABEL:', this.props.label)
		};

		return {
			isValid: true,
			expandDropdown: false,
			fieldValue: []
		}
	},

	/**
	 * When the component mounts, an event listener is attached to the app container
	 * to track click events, and filter them into this component's handleClick function.
	 *
	 * @memberOf FormComponents.DropdownSelect
	 *
	 * @return {null}
	 */
	componentDidMount: function() {
		window.__app_container.addEventListener('click', this.handleClick);
	},

	/**
	 * When the component is unmounted, the app container's click listener is removed
	 *
	 * @memberOf FormComponents.DropdownSelect
	 *
	 * @return {null}
	 */
	componentWillUnmount: function() {
		window.__app_container.removeEventListener('click', this.handleClick);
	},

	/**
	 * Grabs the fieldValue from this.props and sets those values as this.state.fieldValue
	 * This is used to grab the initial value of the resource, as well as grab any updated made through
	 * the form store, and refresh the selected bubbles with the appropriate elements.
	 *
	 * @memberOf FormComponents.DropdownSelect
	 *
	 * @return {null}
	 */
	componentWillReceiveProps: function(nextProps) {
		this.setState({
			fieldValue: this._findValueByPath(nextProps.bindResource, nextProps.fieldKey)
		});
	},

	/**
	 * After clicks, handles updating the selected array in this.state
	 *
	 * If we're allowing multiple selections, it pushes the selection to the array,
	 * then checks to make sure that all values are unqiue before setting state.
	 *
	 * If we're not allowing multiple selections, it simply swaps the selections.
	 *
	 * @memberOf FormComponents.DropdownSelect
	 *
	 * @param {*} option The selected value in the dropdown
	 *
	 * @return {null}
	 */
	setSelected: function(option) {
		var unique = this.props.unique || (this.props.label || 'label');
		if (this.props.multiple) {
			var selected = this.state.fieldValue || [];
			selected.push(option);

			// Making sure that there are no duplicate entries in the selected array
			if (typeof option === 'object') {
				selected = _.uniq(selected, this.props.label || 'label');
			} else {
				selected = _.uniq(selected);
			}

			this.props.changeCallback(this.props.fieldKey, selected, this);
			if (this.props.callback) { this.props.callback(); }
		} else {
			this.setState({
				expandDropdown: false
			});

			this.props.changeCallback(this.props.fieldKey, option, this);
			if (this.props.callback) { this.props.callback(); }
		}

	},

	/**
	 * Removes the clicked item from the selected list, and updates state
	 *
	 * @memberOf FormComponents.DropdownSelect
	 *
	 * @param {number} index The index in the selected array of the item we're removing
	 *
	 * @return {null}
	 */
	removeOption: function(index) {
		var selected = this.state.fieldValue;
		if (this.props.multiple) {
			selected.splice(index, 1);
		} else if (index === -1) {
			selected = '';
		} else {
			selected = {};
		}

		this.props.changeCallback(this.props.fieldKey, selected, this);
		if (this.props.callback) { this.props.callback(); }
	},

	/**
	 * A click listener attached to the app container.
	 *
	 * Any time there's a click, it checks to see if there's an open dropdown,
	 * and if the click occurred outside of the open dropwn.
	 *
	 * If both of these conditions are true, the dropdown is closed.
	 *
	 * @memberOf FormComponents.DropdownSelect
	 *
	 * @param event {event} The window's click event
	 *
	 * @return {null}
	 */
	handleClick: function(event) {
		var clickArea = this.refs.dropdown.getDOMNode();

		if (this.state.expandDropdown && ! clickArea.contains(event.target)) {
			this.toggleDropdown();
		}
	},

	/**
	 * Toggles the visibility of the dropdown by setting 'expandDropdown' in state.
	 * If the dropdown has no content, we don't try to open it up
	 *
	 * @memberOf FormComponents.DropdownSelect
	 *
	 * @return {null}
	 */
	toggleDropdown: function() {
		if (isEmpty(this.props.options)) { return }

		this.setState({
			expandDropdown: ! this.state.expandDropdown
		})
	},

	/**
	 * Handles events and fires the correct action based off the event.
	 *
	 * @memberOf FormComponents.DropdownSelect
	 *
	 * @param {string} action   The action that is being passed from the event
	 * @param {*}      resource The resource that the action will act on.
	 * @param {event}  event    The event that triggered the action.
	 *
	 * @return {null}
	 */
	handleAction: function(action, resource, event) {
		switch(action) {
			case 'select':
				this.setSelected(resource);
				break;
			case 'remove':
				event.stopPropagation();
				this.removeOption(resource);
				break;
			default:
				break;
		}
	},

	/**
	 * Builds a selected bubble for each selected option
	 *
	 * @memberOf FormComponents.DropdownSelect
	 *
	 * @return {jsx}
	 */
	displaySelected: function() {
		if (isEmpty(this.state.fieldValue)) {
			return (
				<div>{this.props.placeholder || 'Make a selection'}</div>
			)
		}

		var label = this.props.label || 'label';
		if (! this.state.fieldValue[0]) {
			var selected = [this.state.fieldValue]
		} else {
			var selected = this.state.fieldValue;
		}

		if (typeof selected === 'object') {
			return selected.map(function(option, index) {

				if (typeof option === 'object') {
					if (typeof(label) === 'function') {
						var displayLabel = label(option, index);
					} else {
						var displayLabel = option[label]
					}

					return (
						<div className={'selected-option'}>
							{displayLabel}
							<a href="javascript:void(0)" className={'icon-times'} onClick={this.handleAction.bind(null, 'remove', index)} />
						</div>
					)
				} else {
					return (
						<div className={'selected-option'}>
							{option}
							<a href="javascript:void(0)" className={'icon-times'} onClick={this.handleAction.bind(null, 'remove', index)} />
						</div>
					)
				}
			}.bind(this));

		} else {
			return (
					<div className={'selected-option'}>
						{selected}
						<a href="javascript:void(0)" className={'icon-times'} onClick={this.handleAction.bind(null, 'remove', -1)} />
					</div>
			)
		}
	},

	/**
	 * Builds the selectable option list.
	 * The label property is grabbed from this.props, else we default to label
	 *
	 * @memberOf FormComponents.DropdownSelect
	 *
	 * @return {jsx}
	 */
	buildSelectOptions: function() {
		var options = this.props.options || [];
		var label = this.props.label || 'label';

		return options.map(function(option, index) {
			var displayLabel;

			if (typeof option === 'object') {
				if (typeof(label) === 'function') {
					displayLabel = label(option, index);
				} else {
					displayLabel = option[label]
				}
			} else {
				displayLabel = option;
			}

			return (
				<li onClick={this.handleAction.bind(null, 'select', option)} className={'dropdown-option list-group-item'}> {displayLabel} </li>
			)
		}.bind(this));
	},

	/**
	 * Sets the classes for the header
	 *
	 * @memberOf FormComponents.DropdownSelect
	 *
	 * @return {object}
	 */
	headerClasses: function() {
		return {
			'pull-right'      : true,
			'icon-chevron-down' : true,
		}
	},

	/**
	 * Sets the classes for the dropdown container
	 *
	 * @memberOf FormComponents.DropdownSelect
	 *
	 * @return {object}
	 */
	dropdownContainerClasses: function() {
		return {
			'dropdown-container' : true,
			'panel'              : true,
			'open'               : this.state.expandDropdown,
			'closed'             : ! this.state.expandDropdown,
			'disabled'           : this.props.disabled || ! this.props.options.length
		}
	},

	/**
	 * Sets the classes for the dropdown
	 *
	 * @memberOf FormComponents.DropdownSelect
	 *
	 * @return {object}
	 */
	dropdownClasses: function() {
		return {
			'dropdown-drawer' : true,
			'visible'         : this.state.expandDropdown,
			'hidden'          : ! this.state.expandDropdown,
			'fill'            : true
		}
	},

	/**
	 * Renders the Dropdown to the page
	 *
	 * @memberOf FormComponents.DropdownSelect
	 *
	 * @return {jsx}
	 */
	render: function() {
		var state = this.state,
			options = this.props.options;

		/**
		 * Sets the max-height property of the dropdown dynamically.
		 * We are animating the drawer with the max-height property,
		 * so we need it to be accurate for each unique drawer.
		 *
		 * If it's too high, the animation closes weirdly.
		 * Too large, and content will be cut off.
		 *
		 * @return object
		 */
		var dropdownStyle = function() {
			switch (state.expandDropdown) {
				case true:
					return {
						maxHeight: options.length * 45
					}
					break;
				case false:
					return {
						maxHeight: 0
					}
					break;
				default:
					break;
			}
		};

		return (
			<div ref="dropdown">
				{this.props.inputLabel && (
					<label className="control-label">{this.props.inputLabel}</label>
				)}
				<div className={className(this.dropdownContainerClasses())}>
					<div className="panel-heading" onClick={this.toggleDropdown}>
						<span className={className(this.headerClasses())} />
						{this.displaySelected()}
					</div>
					<ul className={className(this.dropdownClasses())} style={dropdownStyle()}>
						{this.buildSelectOptions()}
					</ul>
				</div>
			</div>
		)
	}

});

module.exports = DropdownSelect;
