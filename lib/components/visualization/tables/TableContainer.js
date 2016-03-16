/**
 * Table components are responsible for displaying tabular data.
 *
 * The only component that is typically used by the developer is "TableContainer".
 * The table container takes in the data to be displayed as rows, the data keys to display
 * as columns, a table title, and then additional configuration options to change the display.
 *
 * All of these values are passed down as properties from
 * TableContainer -> Table -> Rows -> Row where it is ultimately finally rendered.
 *
 * @example
 * var Br = MortarJS.require('components', 'Table');
 *
 * // in component.render
 * var data = []; // An array of objects to be displayed in the table
 * var dataKeys = {}; // An object, where every key is the name of a field in data
 *
 * return { <Br.Table data={data} dataKeys={dataKeys} title="My table" /> }
 *
 * @namespace TableComponents
 */

var React           = require('react/addons');
var Table           = require('./Table');

/**
 * Wrapper component for tables
 *
 * @class TableContainer
 * @type {object}
 *
 * @prop {boolean} title    The title of the table
 * @prop {array}   data     The data that will be displayed. Each index is one row of the table.
 * @prop {object}  dataKeys The keys of the table. Each key on the object corresponds to a table header.
 * @prop {object}  options  Optional configuration options for the table
 *
 * @memberOf TableComponents
 * @see {@link TableComponents}
 */
var TableContainer = React.createClass({
	propTypes: {
		title    : React.PropTypes.string.isRequired,
		data     : React.PropTypes.array.isRequired,
		dataKeys : React.PropTypes.object.isRequired,

		// Object of table column names and resource property keys
		options: React.PropTypes.shape({
			editableRows    : React.PropTypes.bool,
			// Whether to include Edit/Deactivate buttons
			actionableRows  : React.PropTypes.bool,
			// Is the table drag sortable
			draggable       : React.PropTypes.bool,
			// Callback to handle Edit/Deactivate @todo they should be standardized and automated
			actionsCallback : React.PropTypes.func,
			// Array of button actions
			actions         : React.PropTypes.array,
			// Data presentation mutators
			mutators        : React.PropTypes.object,
			summableRows    : React.PropTypes.array,
			noPanel         : React.PropTypes.bool
		}),
		// The action creator through which to call actions such as table sort, deletion, etc
		actionCreator: React.PropTypes.object
	},

	/**
	 * getDefaultProps
	 *
	 * @memberOf TableComponents.TableContainer
	 *
	 * @return {object}
	 */
	getDefaultProps: function () {
		return {
			data: []
		};
	},

	/**
	 * render
	 *
	 * @memberOf TableComponents.TableContainer
	 *
	 * @return {jsx}
	 */
	render: function () {
		if (this.props.options && this.props.options.noPanel) {
			return (
				<div className="table-responsive">
					<Table key={this.props.title} {...this.props} />
				</div>
			);
		}

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<i className="icon-table"></i> {this.props.title}
				</div>

				<div className="panel-body">
					<div className="row">
						<div className="col-lg-12">
							<div className="table-responsive">
								<Table key={this.props.title} {...this.props} />
							</div>

						</div>
					</div>
				</div>

			</div>
		);
	}
});

module.exports = TableContainer;
