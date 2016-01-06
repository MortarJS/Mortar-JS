var _          = require('lodash');
var React      = require('react/addons');
var Modal      = require('../../global/modal/ModalContainer');
var Input      = require('../../resource-editing/resource-form/Input');
var classNames = require('classnames');

/**
 * Table row component
 *
 * @type {*|Function}
 */
var Row = React.createClass({
	propTypes: {
		data:              React.PropTypes.object.isRequired,
		dataKeys:          React.PropTypes.object.isRequired,
		options:           React.PropTypes.shape({
			actionableRows:  React.PropTypes.bool,
			editableRows:    React.PropTypes.oneOfType([
				React.PropTypes.bool,
				React.PropTypes.arrayOf(React.PropTypes.string)
			]),
			actions:         React.PropTypes.array,
			draggable:       React.PropTypes.bool,
			actionsCallback: React.PropTypes.func
		}),
		handleDragStart:   React.PropTypes.func,
		handleDragEnd:     React.PropTypes.func,
		handleDragOverRow: React.PropTypes.func
	},

	/**
	 * Row classes
	 *
	 * @returns {{table-row: boolean, table-row-sortable: *}}
	 */
	rowClasses: function () {
		return {
			'table-row':          true,
			'table-row-sortable': this.props.options.draggable
		}
	},

	getInitialState: function () {
		return {
			bindResource: {},
			showSave:     false
		}
	},

	/**
	 * Fire a named action event to the parent component's registered callback
	 *
	 * @param action
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
	 * Create action buttons for the row
	 *
	 * @returns {JSX}
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
			)
		}

		buttons.push(
			this.props.options.actions.map(function (action, index) {
				// ex: deactivate:danger
				var actionArgs = action.split(':');
				var actionName = actionArgs[0];
				var buttonType = actionArgs[1] || 'primary';

				if (actionName === 'deactivate') {
					var alterations = this._determineDeactivateStrings()
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
	 * @param {object} classes
	 * @returns {object}
	 * @private
	 */
	_shouldHighlightRow: function (classes) {
		if (typeof this.props.options.highlightRow === 'undefined') {
			return classes;
		}

		classes[this.props.options.highlightRow.class] = this.props.options.highlightRow.test(this.props.data);
		return classes
	},

	/**
	 * Determine if this row has been soft deleted and return the appropriate action name and button type.
	 *
	 * @returns {{action: string, buttonType: string}}
	 * @private
	 */
	_determineDeactivateStrings: function () {
		// Has been deleted and is eligible for deactivation
		if (typeof this.props.data.deleted_at === 'string') {
			return {action: 'reactivate', buttonType: 'success'};
		}

		return {action: 'deactivate', buttonType: 'danger'};;
	},

	/**
	 * The row component is only mounted when data exists (retrieved from the API or wherever its source is). This
	 * means that there is no componentWillReceiveProps being fired as it does not fire on mount but when there is
	 * a new set of props to compare to an old set. We can require props.data to be present and then be sure that
	 * data props exist in this component on mount and handle any componentWillReceiveProps-esque logic here.
	 *
	 * (See https://facebook.github.io/react/tips/componentWillReceiveProps-not-triggered-after-mounting.html).
	 */
	componentDidMount: function () {
		this.setState({
			// The current row's data object
			bindResource: this.props.data
		});
	},

	/**
	 * For subsequent updates (user presses cancel, etc)
	 *
	 * @param nextProps
	 */
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			bindResource: nextProps.data
		})
	},

	/**
	 * Receive changes to row's inputs
	 *
	 * @param key
	 * @param value
	 * @param component
	 */
	handleChange: function (key, value, component) {
		var row = this.state.bindResource;
		row[key] = value;
		this.setState({bindResource: row});
	},

	/**
	 * Can't toggle because of repeated onFocus events from the Input
	 */
	hideSave: function () {
		this.setState({
			showSave: false
		});
	},

	/**
	 * Can't toggle because of repeated onFocus events from the Input
	 */
	showSave: function () {
		this.setState({
			showSave: true
		});
	},

	/**
	 * Cancel an edit action
	 *
	 * @param event
	 */
	cancelEdit: function (event) {
		this.doActionOnResource(event);
	},

	/**
	 * Build row data based on state passed from user parent component
	 *
	 * @returns {Array}
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
	 * @param event
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
	 * Handle any custom data presentation mutators
	 *
	 * @param object
	 * @returns {*}
	 */
	mutateData: function (column, value, index) {
		var mutators = this.props.options.mutators || {};
		var mutatorFx = mutators[column];
		// @todo necessary to pass the object back? Could be convenient..
		return mutatorFx ? mutatorFx(value, this.state.bindResource, index) : value;
	},

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
