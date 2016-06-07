var Rows       = require('./Rows');
var React      = require('react');
var Modal      = require('../../global/modal/ModalContainer');
var SumRow     = require('./SumRow');
var Spinner    = require('../../global/spinner/Spinner');
var Tooltip    = require('../../global/tooltip/Tooltip');
var SortButton = require('./SortButton');

/**
 * Table component
 *
 * @class Table
 *
 * @prop {array}  data     The data that is displayed. Each index is one row of the table.
 * @prop {object} dataKeys The keys of the table. Each key on the object corresponds to a table header.
 * @prop {object} options  Optional configuration options for the table
 *
 * @memberOf TableComponents
 * @see {@link TableComponents}
 *
 */
var Table = React.createClass({
	propTypes: {
		data     : React.PropTypes.array.isRequired,
		dataKeys : React.PropTypes.object.isRequired,
		options  : React.PropTypes.shape({
			actionableRows  : React.PropTypes.bool,
			draggable       : React.PropTypes.bool,
			actionsCallback : React.PropTypes.func,
			bulkActions     : React.PropTypes.bool,
			summableRows    : React.PropTypes.array,
			tooltips        : React.PropTypes.objectOf(
				React.PropTypes.oneOfType([
					React.PropTypes.string,
					React.PropTypes.shape({
						text        : React.PropTypes.string.isRequired,
						width       : React.PropTypes.string.isRequired,
						height      : React.PropTypes.string.isRequired,
						orientation : React.PropTypes.string.isRequired
					})
				])
			)
		}).isRequired,
		actionCreator: React.PropTypes.object
	},

	/**
	 * getDefaultProps
	 *
	 * @memberOf TableComponents.Table
	 *
	 * @return {object}
	 */
	getDefaultProps: function () {
		return {
			data: []
		};
	},

	/**
	 * getInitialState
	 *
	 * @memberOf TableComponents.Table
	 *
	 * @return {object}
	 */
	getInitialState: function () {
		return {
			selected: false
		};
	},

	/**
	 * componentDidMount
	 *
	 * @memberOf TableComponents.Table
	 *
	 * @return {null}
	 */
	componentDidMount: function () {
		// Do Nothing
	},

	columns: 0,

	/**
	 * Build table columns based on user provided data keys
	 *
	 * @memberOf TableComponents.Table
	 *
	 * @return {jsx}
	 */
	buildTableColumns: function () {
		var columns = Object.keys(this.props.dataKeys).map(function (value, index) {
			return (
				<th key={index}>{value} {this._shouldRenderInfoIcon(value, this.props.dataKeys[value])}</th>
			);
		}.bind(this));

		if (this.props.options && this.props.options.actionableRows) {
			columns.push(
				<th key={99}>Actions</th>
			);
		}

		// If bulk actions are enabled, add a checkbox to the top of the table
		if (this.props.options && this.props.options.bulkActions) {
			var value = this.state.selected;
			columns.unshift(<th key={101}><input type="checkbox" value={value} onChange={this.toggleAllCheckboxes} /></th>);
		}

		this.columns = columns.length;

		return (
			<thead>
				<tr>
				{columns}
				</tr>
			</thead>
		);
	},

	/**
	 * When the top checkbox is selected, all rows should be (de)selected accordingly
	 * Sets state with the proper selected selected status, and sets all children as well.
	 * Fires the 'selectAllRows' action for the actionsCallback
	 *
	 * @memberOf TableComponents.Table
	 *
	 * @return {null}
	 */
	toggleAllCheckboxes: function() {
		var selected = ! this.state.selected;

		this.setState({
			selected: selected
		});

		this.props.data.forEach(function(item) {
			item.selected = selected;
		});

		this.props.options.actionsCallback('selectAllRows', this.props.data);
	},

	/**
	 * _shouldRenderInfoIcon
	 *
	 * @private
	 * @memberOf TableComponents.Table
	 *
	 * @param {number} column The column
	 * @param {*}      value  The contents of the table cell.
	 *
	 * @return {jsx}
	 */
	_shouldRenderInfoIcon: function (column, value) {
		var options = this.props.options || {};
		var icons = [];

		if (typeof options.tooltips === 'object' && options.tooltips.hasOwnProperty(column)) {
			let tooltip = this.props.options.tooltips[column],
				text, length, width, height, orientation;

			// If the user only supplies the tooltip text, try to guess the tooltip dimensions
			if (typeof tooltip === "string") {
				text        = tooltip;
				orientation = "top";
				length      = tooltip.length;
				width       = "250px";
				height      = 18 + (17 * (Math.ceil(length / 20))) + "px";

			// Otherwise, we pass down all their options directly into the tooltip.
			} else {
				text        = tooltip.text;
				width       = tooltip.width;
				height      = tooltip.height;
				orientation = tooltip.orientation;
			}

			icons.push(
				<Tooltip key={column} text={text} width={width} height={height} orientation={orientation}>
					<button key={column} className="icon-info-circle pull-right mortar-tooltip-icon" type="button" data-key={column}></button>
				</Tooltip>
			);
		}

		// If developer specifies an array of sortable columns
		if (Object.prototype.toString.call(options.sortable) === '[object Array]' && options.sortable.indexOf(value) > -1) {
			icons.push(<SortButton key={options.sortable.indexOf(value)} actionsCallback={options.actionsCallback} sortProperty={value} />);
		}

		return icons;
	},

	/**
	 * _shouldLoadSpinner
	 *
	 * @private
	 * @memberOf TableComponents.Table
	 *
	 * @return {jsx|boolean}
	 */
	_shouldLoadSpinner: function () {
		var options = this.props.options || {};
		if (! options.hideSpinner) {
			return (
				<tbody>
					<tr>
						<td colSpan={this.columns}>
							<Spinner type="spinner" text="Loading.." classes="table-loader" />
						</td>
					</tr>
				</tbody>
			);
		} else if (options.hideSpinner) {
			return (
				<tbody>
					<tr>
						<td colSpan={this.columns} className="table-empty-row">
							{options.emptyText || 'No results :(.'}
						</td>
					</tr>
				</tbody>
			);
		}

		return false;
	},

	/**
	 * render
	 *
	 * @memberOf TableComponents.Table
	 *
	 * @return {jsx}
	 */
	render: function () {
		return (
			<div className="table-modal-container">
				<table className="table-data table table-bordered table-hover table-striped">
					{this.buildTableColumns()}

					{this.props.data.length < 1 && (
						this._shouldLoadSpinner()
					)}

					{this.props.data.length >= 1 && (
						<Rows data={this.props.data}
							dataKeys={this.props.dataKeys}
							options={this.props.options}
							actionCreator={this.props.actionCreator} />
					)}

					{this.props.options.summableRows && (
						<SumRow key="sumRow" data={this.props.data} dataKeys={this.props.dataKeys} options={this.props.options} rows={this.props.options.summableRows} />
					)}
				</table>
			</div>
		);
	}
});

module.exports = Table;
