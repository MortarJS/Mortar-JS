var _          = require('lodash');
var React      = require('react');

/**
 * Table sum rows component
 * If the `summableRows` option is a property of the options object on a table,
 * this component will sum the value for that column, and add it to the last row
 * of the table.  Any columns that are not summable are rendered as an empty cell.
 *
 * Adjacent empty cells will be collapsed into a single cell.
 *
 * @class SumRow
 * @type {ReactComponent}
 *
 * @prop {!object} data     The data to display for this row.
 * @prop {!object} dataKeys The data keys to display from data.  Each key maps to a single cell.
 * @prop {!array}  rows     All the rows for the table.
 * @prop {object=} options  Additional options to configure that data.
 *
 * @memberOf TableComponents
 * @see {@link TableComponents}
 */
var SumRow = React.createClass({
	propTypes: {
		data     : React.PropTypes.array.isRequired,
		dataKeys : React.PropTypes.object.isRequired,
		rows     : React.PropTypes.array.isRequired,
		options  : React.PropTypes.object
	},

	/**
	 * Builds the data for the row one step at a time.
	 * First, loop through the keys to find all summable rows.
	 * Then, start adding the `jsx` to an array to be rendered as the final row.
	 *
	 * @memberOf TableComponents.SumRow
	 *
	 * @return {jsx}
	 */
	buildRowData: function () {
		var dataKeys = this.props.dataKeys,
			sumRows  = this.props.rows,
			data     = _.cloneDeep(this.props.data[0]),
			sums     = {},
			self     = this;

		// First, we start by getting the sum of all keys that are summable.
		// We loop through all the data keys, and each summable row,
		// take the value of any keys that match, and add them to our running total
		this.props.data.forEach(function (datum) {
			sumRows.forEach(function (key) {
				sums[key] = sums[key] || 0; // if it doesn't have a value, we need to set it to 0 so we don't get NAN
				sums[key] += datum[key];
			});
		});

		// Next, we create the data for our table cells.
		// Any data key that is in the table is either given it's summed value or an empty string.
		// @TODO can we avoid this nested loop?
		for (var key in dataKeys) {
			if (dataKeys.hasOwnProperty(key)) {
				sumRows.forEach(function (total) {
					if (dataKeys[key] === total) {
						data[total] = sums[total];
					} else {
						data[dataKeys[key]] = '';
					}
				});
			}
		}

		var colSpan = 0;

		var rowKeys = Object.keys(dataKeys).map(function (value) {
			return dataKeys[value];
		});

		// Finally, we construct the table row with the sum data.
		var rowData = rowKeys.map(function (column, index) {
			var cellValue = _.get(data, column);

			// If it's the last cell, and empty then we put a cell on the table.
			if (cellValue === '' && index + 1 === rowKeys.length) {
				return <td colSpan={colSpan + 1} />;

			} else if (cellValue === '') { // If the cell has no value, we don't put a cell.
				colSpan ++;

				return false;
			}

			// If a cell has value we put an empty cell before it for spacing, and then the summed value
			var cols = _.clone(colSpan),
				content = [];

			colSpan = 0;

			if (cols) {
				content.push(<td colSpan={cols} />);
			}

			content.push(<td key={index}>{self.mutateData(column, cellValue, rowData) || cellValue}</td>);
			return content;

		});

		// Finally, if ther are actionable rows, or bulk actions, we want to add columns for those
		if (this.props.options && this.props.options.actionableRows) {
			rowData.push(<td />);
		}

		if (this.props.options && this.props.options.bulkActions) {
			rowData.unshift(<td />);
		}

		return rowData;
	},

	/**
	 * Handle any custom data presentation mutators
	 *
	 * @memberOf TableComponents.SumRow
	 *
	 * @param {object} column The column to mutate.
	 * @param {*}      value  The value that is being mutated.
	 * @param {object} row    The row being mutated.
	 *
	 * @returns {*}
	 */
	mutateData: function (column, value, row) {
		if (value === '') {
			return value;
		}

		var mutators = this.props.options.mutators || {};
		var mutatorFx = mutators[column];
		// @todo necessary to pass the object back? Could be convenient..
		return mutatorFx ? mutatorFx(value, row) : value;
	},

	/**
	 * Renders the finished SumRow component.
	 *
	 * @memberOf TableComponents.SumRow
	 *
	 * @return {jsx}
	 */
	render: function () {
		var tableCols = 0, key;
		for (key in this.props.dataKeys) {
			if (this.props.dataKeys.hasOwnProperty(key)) {
				tableCols ++;
			}
		}

		if (this.props.options.actionableRows) {
			tableCols ++;
		}

		if (this.props.options.bulkActions) {
			tableCols ++;
		}

		return (
			<tbody>
				<tr className={'table-row'}>
					<th colSpan={tableCols}> Total: </th>
				</tr>
				<tr className={'table-row'}>
					{this.buildRowData()}
				</tr>
			</tbody>
		);
	}
});

module.exports = SumRow;
