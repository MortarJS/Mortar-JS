var _      = require('lodash');
var Row    = require('./Row');
var React  = require('react/addons');
var SumRow = require('./SumRow');

/**
 * Table rows component
 *
 * @type {*|Function}
 */
var Rows = React.createClass({
	propTypes: {
		data     : React.PropTypes.array.isRequired,
		dataKeys : React.PropTypes.object.isRequired,
		options  : React.PropTypes.shape({
			editableRows    : React.PropTypes.bool,
			summableRows    : React.PropTypes.array,
			draggable       : React.PropTypes.bool,
			actionsCallback : React.PropTypes.func,
			mutators        : React.PropTypes.object
		}),
		actionCreator: React.PropTypes.object
	},

	getInitialState: function () {
		return {
			sortOrder: []
		}
	},

	getDefaultProps: function () {
		return {
			data: [],
			sortOrder: []
		}
	},

	/**
	 * Set up props when passed down
	 *
	 * @param nextProps
	 */
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			sortOrder: nextProps.data.map(function(item) {
				return item.id;
			})
		});
	},

	/**
	 * Render a placeholder for drag sorting
	 *
	 * @returns {HTMLElement|*}
	 * @private
	 */
	_renderPlaceHolder: function () {
		if (! this.placeholder) {
			var tr = document.createElement('tr');
			tr.className = "placeholder";

			var td = document.createElement('td');
			td.colSpan = this.props.data.length;
			tr.appendChild(td);

			this.placeholder = tr;
		}

		return this.placeholder;
	},

	/**
	 * Set up drag sorting once user begins to drag
	 *
	 * @param event
	 */
	handleDragStart: function (event) {
		// Set the currently dragged resource
		this.dragged = event.currentTarget;
		this.dragged.style.opacity = 0.5;
		event.dataTransfer.effectAllowed = 'move';

		// Firefox requires calling dataTransfer.setData for the drag to properly work
		event.dataTransfer.setData('text/html', event.currentTarget);
	},

	/**
	 * Handle events when a resource is dragged over another table row
	 *
	 * @param event
	 */
	handleDragOverRow: function (event) {
		event.preventDefault();

		// Ignore the placeholder
		if (event.target.className === 'placeholder') {
			return;
		}

		// The row we're currently hovering over
		this.over = event.currentTarget;

		var relativeY = event.pageY - this.over.offsetTop;
		var lastChildY = event.pageY - this.over.parentNode.lastChild.offsetTop;

		var parent = event.currentTarget.parentNode;

		// Determine if we need to place this row after the last row of the table and react accordingly
		// @todo the math here doesn't work
		//if (relativeY > parent.offsetHeight) {
		//	// Beyond the parent element. Invalid sort.
		//	return;
		//} else
		if (relativeY == lastChildY) {
			this.nodePlacement = 'after';
			parent.insertBefore(this._renderPlaceHolder(), event.currentTarget.nextElementSibling);
		} else {
			this.nodePlacement = 'before';
			parent.insertBefore(this._renderPlaceHolder(), event.currentTarget);
		}
	},

	/**
	 * Finalize the drag sort
	 *
	 * Source of truth for sort order is in the developer's parent component. Here we just determine and bubble up
	 * the 'proposed' sortOrder.
	 *
	 * @param event
	 */
	handleDragEnd: function (event) {
		this.dragged.style.opacity = 1;

		// Remove the dummy row
		this.dragged.parentNode.removeChild(this._renderPlaceHolder()); // @todo probably errors

		var sortOrder = this.props.data;
		var cutFrom = Number(this.dragged.dataset.resourceIndex);
		var insertAt = Number(this.over.dataset.resourceIndex);

		// If we're dragging above the original position, decrement insertAt so we can insert before
		if (cutFrom < insertAt) {
			insertAt--;
		}

		if (this.nodePlacement === 'after') {
			insertAt++;
		}

		sortOrder.splice(insertAt, 0, sortOrder.splice(cutFrom, 1)[0]);

		this.setState({
			sortOrder: sortOrder,
		}, function () {
			this.props.options.actionsCallback('dragSort', this.state.sortOrder);
		});
	},

	render: function () {
		// Set up draggable table callbacks to pass down
		var draggable = {
			handleDragStart: this.handleDragStart,
			handleDragEnd: this.handleDragEnd,
			handleDragOverRow: this.handleDragOverRow
		};

		var dataKeys = this.props.dataKeys;
		var options = this.props.options;
		var rows = this.props.data.map(function (data, index) {
			// Key should not be accessed from component
			return (
				<Row key={index} index={index} data={data} dataKeys={dataKeys} options={options} {...draggable} />
			);
		}.bind(this));

		// If there are summable rows, we need to add them to the table
		if (this.props.options.summableRows) {
			rows.push(<SumRow key="sumRow" data={this.props.data} dataKeys={this.props.dataKeys} options={this.props.options} rows={this.props.options.summableRows} />)
		}

		return (
			<tbody className="table-rows" ref="tableBody">
				{rows}
			</tbody>
		);
	}
});

module.exports = Rows;
