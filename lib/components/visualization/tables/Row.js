// External Requirements
var _          = require('lodash');
var React      = require('react/addons');
var classNames = require('classnames');

// Components
var Input      = require('../../resource-editing/resource-form/Input');

/**
 * Table row component
 *
 * @class Row
 * @type {ReactComponent}
 *
 * @prop {!object}  data
 * @prop {!array}   dataKeys
 * @prop {object=}  options
 * @prop {function} handleDragStart
 * @prop {function} handleDragEnd
 * @prop {function} handleDragOverRow
 *
 * @memberOf TableComponents
 * @see {@link TableComponents}
 */
var Row = React.createClass({
	propTypes: {
		data     : React.PropTypes.object.isRequired,
		dataKeys : React.PropTypes.object.isRequired,
		options  : React.PropTypes.shape({
			actionableRows : React.PropTypes.bool,
			editableRows   : React.PropTypes.oneOfType([
				React.PropTypes.bool,
				React.PropTypes.arrayOf(React.PropTypes.string)
			]),
			actions         : React.PropTypes.array,
			draggable       : React.PropTypes.bool,
			actionsCallback : React.PropTypes.func
		}),
		handleDragStart   : React.PropTypes.func,
		handleDragEnd     : React.PropTypes.func,
		handleDragOverRow : React.PropTypes.func
	},

	/**
	 * Classes for styling the table rows.
	 *
	 * @memberOf TableComponents.Row
	 *
	 * @returns {object}
	 */
	rowClasses: function () {
		return {
			'table-row'          : true,
			'table-row-sortable' : this.props.options.draggable
		};
	},

	/**
	 * Gets the initial state of the component
	 *
	 * @memberOf TableComponents.Row
	 *
	 * @return {object}
	 */
	getInitialState: function () {
		return {
			bindResource: {},
			showSave:     false
		};
	},

	/**
	 * Fire a named action event to the parent component's registered callback
	 *
	 * @memberOf TableComponents.Row
	 *
	 * @param {string } action The action that is getting fired. Determines the path through this function
	 *
	 * @return {null}
	 */
	doActionOnResource: function (action) {
		// Access data-* attributes with dataset
		if (action === 'saveRow' || action === 'cancelEditRow') {
			// @todo determine what is a better interface: 1) the handleAction callback or 2) a more flux-y firing an abstract action
			this.props.options.actionsCallback(action, this.state.bindResource);
			this.hideSave();
		} else {
			this.props.options.actionsCallback(action, this.props.data);
		}
	},

	/**
	 * Create action buttons for the row.
	 * For example, an "edit" button will be added if the resource is editable.
	 * When edit is clicked, renders a "save" and "cancel" button.
	 *
	 * Adds any buttons to the last column in the row.
	 *
	 * @memberOf TableComponents.Row
	 *
	 * @returns {jsx}
	 */
	buildActionOptions: function () {
		var buttons = [];

		if (this.state.showSave) {
			buttons.push(
				<div className="editable-row-action-buttons">
					<button className={'btn btn-outline btn-success btn-xs action-button'}
						onClick={this.doActionOnResource} data-action="saveRow">Save</button>
					<button className={'btn btn-outline btn-warning btn-xs action-button'}
						onClick={this.cancelEdit} data-action="cancelEditRow">Cancel</button>
				</div>
			);
		}

		buttons.push(
			this.props.options.actions.map(function (action, index) {
				// ex: deactivate:danger
				var actionArgs = action.split(':'),
					actionName = actionArgs[0],
					buttonType = actionArgs[1] || 'primary';

				if (actionName === 'deactivate') {
					var alterations = this._determineDeactivateStrings();
					actionName = alterations.action;
					buttonType = alterations.buttonType;
				}

				return (
					<button key={index} className={'btn btn-outline btn-' + buttonType + ' btn-xs action-button'}
						onClick={this.doActionOnResource.bind(null, actionName)} data-action={actionName}>{actionName}</button>
				);
			}.bind(this))
		);

		return (
			<td key={99}>
				{buttons}
			</td>
		);
	},

	/**
	 * Run tests to determine if this row is special
	 *
	 * @memberOf TableComponents.Row
	 * @private
	 *
	 * @param {object} classes Any classes that should be added to the html
	 *
	 * @returns {object}       The classes to be added.
	 */
	_shouldHighlightRow: function (classes) {
		if (typeof this.props.options.highlightRow === 'undefined') {
			return classes;
		}

		classes[this.props.options.highlightRow.class] = this.props.options.highlightRow.test(this.props.data);

		return classes;
	},

	/**
	 * Determine if this row has been soft deleted and return the appropriate action name and button type.
	 *
	 * @memberOf TableComponents.Row
	 * @private
	 *
	 * @returns {object}
	 */
	_determineDeactivateStrings: function () {
		// Has been deleted and is eligible for deactivation
		if (typeof this.props.data.deleted_at === 'string') {
			return {action: 'reactivate', buttonType: 'success'};
		}

		return {action: 'deactivate', buttonType: 'danger'};
	},

	/**
	 * The row component is only mounted when data exists (retrieved from the API or wherever its source is). This
	 * means that there is no componentWillReceiveProps being fired as it does not fire on mount but when there is
	 * a new set of props to compare to an old set. We can require props.data to be present and then be sure that
	 * data props exist in this component on mount and handle any componentWillReceiveProps-esque logic here.
	 *
	 * @memberOf TableComponents.Row
	 *
	 * @return {null}
	 *
	 * @see {@link https://facebook.github.io/react/tips/componentWillReceiveProps-not-triggered-after-mounting.html}
	 */
	componentDidMount: function () {
		this.setState({
			// The current row's data object
			bindResource: this.props.data
		});
	},

	/**
	 * Set up props when passed down
	 * For subsequent updates (user presses cancel, etc)
	 *
	 * @memberOf TableComponents.Row
	 *
	 * @param {object} nextProps
	 *
	 * @return {null}
	 */
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			bindResource: nextProps.data
		});
	},

	/**
	 * Receive changes to row's inputs and updates state.
	 *
	 * @memberOf TableComponents.Row
	 *
	 * @param {string} key
	 * @param {*}      value
	 *
	 * @return {null}
	 */
	handleChange: function (key, value) {
		var row = this.state.bindResource;

		row[key] = value;
		this.setState({bindResource: row});
	},

	/**
	 * Handles hiding the save button by updating state.
	 * This can't be a simple toggle because of repeated onFocus events from the Input.
	 *
	 * @memberOf TableComponents.Row
	 *
	 * @return {null}
	 */
	hideSave: function () {
		this.setState({
			showSave: false
		});
	},

	/**
	 * Handles showing the save button by updating state.
	 * This can't be a simple toggle because of repeated onFocus events from the Input.
	 *
	 * @memberOf TableComponents.Row
	 *
	 * @return {null}
	 */
	showSave: function () {
		this.setState({
			showSave: true
		});
	},

	/**
	 * Cancels an edit action
	 *
	 * @memberOf TableComponents.Row
	 *
	 * @param {event} event
	 *
	 * @return {null}
	 */
	cancelEdit: function (event) {
		this.doActionOnResource(event);
	},

	/**
	 * Build row data based on state passed from user parent component
	 *
	 * @memberOf TableComponents.Row
	 *
	 * @returns {Array.<jsx>}
	 */
	buildRowData: function () {
		var rowData = this.props.data;
		var dataKeys = this.props.dataKeys;
		var rowKeys = Object.keys(dataKeys).map(function (value, index) {
			return dataKeys[value];
		});

		// Create an array of editable td elements
		if (this.props.options.editableRows) {
			if (typeof this.props.options.editableRows === 'boolean') {
				var rowData = rowKeys.map(function (key, index) {
					var cellValue = _.get(rowData, key);
					return (
						<td key={index}>
							<Input fieldKey={key} type="text" changeCallback={this.handleChange} onFocus={this.showSave}
								bindResource={this.state.bindResource} placeholder="Click to Edit.." {...this.mutateData(key, cellValue, index)}  />
						</td>
					)
				}.bind(this));

			} else if (typeof this.props.options.editableRows === 'object') {
				var rowData = rowKeys.map(function (key, index) {
					var cellValue = _.get(rowData, key);
					if (_.contains(this.props.options.editableRows, key)) {
						return (
							<td key={index}>
								<Input fieldKey={key} type="text" changeCallback={this.handleChange} onFocus={this.showSave}
									bindResource={this.state.bindResource} placeholder="Click to Edit.." {...this.mutateData(key, cellValue, index)}  />
							</td>
						)
					} else {
						return (
							<td key={index}>{this.mutateData(key, cellValue, index) || cellValue}</td>
						)
					}
				}.bind(this));
			}
		} else {
			// Or a non-editable table row
			var rowData = rowKeys.map(function (column, index) {
				var cellValue = _.get(rowData, column);
				return (
					<td key={index}>{this.mutateData(column, cellValue, index) || cellValue}</td>
				)
			}.bind(this));
		}

		if (this.props.options && this.props.options.actionableRows) {
			rowData.push(
				this.buildActionOptions()
			);
		}

		if (this.props.options && typeof this.props.options.mainAction === 'object') {
			rowData.unshift(<td key={99}>{this.props.options.mainAction.button}</td>);
		}

		// If bulk actions are enabled, add a checkbox to the first cell
		if (this.props.options && this.props.options.bulkActions) {
			var selected = this.state.bindResource.selected || false;
			rowData.unshift(<th key={101}><input type="checkbox" value={selected} checked={selected} onChange={this.selectRow} /></th>)
		}

		return rowData;
	},

	/**
	 * Selecting a checkbox will set its bind resource's 'selected' property to selected true
	 * fires the 'selectedRow' action
	 *
	 * @memberOf TableComponents.Row
	 *
	 * @param {event} event
	 *
	 * @return null
	 */
	selectRow: function(event) {
		this.setState(function(previousState) {
			previousState.bindResource.selected = ! previousState.bindResource.selected;
			this.props.options.actionsCallback('selectedRow', previousState.bindResource);
			return previousState;
		});
	},

	/**
	 * Handle any custom data presentation mutators.
	 *
	 * @memberOf TableComponents.Row
	 *
	 * @param {object} column
	 * @param {*}      value
	 * @param {number} index
	 *
	 * @returns {*}
	 */
	mutateData: function (column, value, index) {
		var mutators = this.props.options.mutators || {};
		var mutatorFx = mutators[column];
		// @todo necessary to pass the object back? Could be convenient..
		return mutatorFx ? mutatorFx(value, this.state.bindResource, index) : value;
	},

	/**
	 * Renders the component.
	 *
	 * @memberOf TableComponents.Row
	 *
	 * @return {jsx}
	 */
	render: function () {
		var classes = classNames(this._shouldHighlightRow(this.rowClasses()));

		return (
			<tr className={classes}
				key={this.props.key}
				draggable={this.props.options.draggable}
				onDragStart={this.props.handleDragStart}
				onDragEnd={this.props.handleDragEnd}
				onDragOver={this.props.handleDragOverRow}
				data-resource-index={this.props.index} >

				{this.buildRowData()}
				{this.props.children}

			</tr>
		);
	}
});

module.exports = Row;
