var Rows       = require('./Rows');
var React      = require('react/addons');
var Modal      = require('../../global/modal/ModalContainer');
var Spinner    = require('../../global/spinner/Spinner');
var SortButton = require('./SortButton');

/**
 * Table component
 *
 * @type {*|Function}
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
			summableRows    : React.PropTypes.array
		}).isRequired,
		actionCreator: React.PropTypes.object
	},

	getDefaultProps: function () {
		return {
			data: []
		}
	},

	getInitialState: function () {
		return {
			showTooltip : false,
			selected    : false,
			tooltipKey  : null
		}
	},

	componentDidMount: function () {
		// Do Nothing
	},

	columns: 0,

	/**
	 * Build table columns based on user provided data keys
	 *
	 * @returns {XML}
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

		if (this.props.options && typeof this.props.options.mainAction === 'object') {
			columns.unshift(<th key={100}></th>);
		}

		// If bulk actions are enabled, add a checkbox to the top of the table
		if (this.props.options && this.props.options.bulkActions) {
			var value = this.state.selected;
			columns.unshift(<th key={101}><input type="checkbox" value={value} onChange={this.toggleAllCheckboxes} /></th>)
		}

		this.columns = columns.length;

		return (
			<thead>
				<tr>
				{columns}
				</tr>
			</thead>
		)
	},

	/**
	 * When the top checkbox is selected, all rows should be (de)selected accordingly
	 * Sets state with the proper selected selected status, and sets all children as well.
	 * Fires the 'selectAllRows' action for the actionsCallback
	 *
	 * @param event    The event that triggered the click
	 * @return null
	 */
	toggleAllCheckboxes: function(event) {
		var selected= !this.state.selected;
		this.setState({
			selected: selected
		});

		this.props.data.forEach(function(item) {
			item.selected = selected
		}.bind(this));

		this.props.options.actionsCallback('selectAllRows', this.props.data);
	},

	toggleTooltip: function (event) {
		event.preventDefault();
		this.setState({
			showTooltip: ! this.state.showTooltip,
			tooltipKey: event.target.dataset.key
		});
	},

	closeModal: function () {
		this.setState({
			showTooltip: false,
			tooltipKey: null
		})
	},

	_shouldRenderInfoIcon: function (column, value) {
		var options = this.props.options || {};
		var icons = [];

		if (typeof options.tooltips === 'object' && options.tooltips.hasOwnProperty(column)) {
			icons.push(<button key={column} className="fa fa-info-circle pull-right" type="button"
				onClick={this.toggleTooltip} data-key={column}></button>);
		}

		// If developer specifies an array of sortable columns
		if (Object.prototype.toString.call(options.sortable) === '[object Array]' && options.sortable.indexOf(value) > -1) {
			icons.push(<SortButton key={options.sortable.indexOf(value)} actionsCallback={options.actionsCallback} sortProperty={value} />);
		}

		return icons;
	},

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
	},

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
				</table>

				{this.state.showTooltip && (
					<Modal openWhen={this.state.showTooltip} options={{width: '40%'}}
						afterClose={this.closeModal}
						afterSave={this.closeModal}
						title={this.state.tooltipKey}
						closeText="Close" saveText="OK">
						<p>{this.props.options.tooltips[this.state.tooltipKey]}</p>
					</Modal>
				)}
			</div>
		);
	}
});

module.exports = Table;
