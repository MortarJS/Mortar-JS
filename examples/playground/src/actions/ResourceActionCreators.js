var AppDispatcher = require('../bootstrap').MortarJS.Dispatcher;
var AppActionConstants = require('../constants/AppActionConstants');
var ResourceApi = require('../utils/ResourceApi');

var ResourceActions = function (resource) {
	this.resource = resource;
};

/**
 * Options to modify the request:
 *
 * dataNode: name of property of data if nested JSON object
 * modifiers: query params to modify request, e.g. filters, include, query, etc
 */
ResourceActions.prototype.options = {};

/**
 * The resource operation currently being performed. One of: ['receive', 'create', 'update', 'deactivate']
 */
ResourceActions.prototype.resourceOperation = '';

/**
 * Count returned objects to properly name events
 *
 * @param data
 * @returns {string}
 * @todo remove and leave an event name override
 */
ResourceActions.prototype.count = function (data) {
	return data.length === 1 ? 'ONE' : 'ALL';
};

/**
 * Build an event name string for the dispatcher
 *
 * @returns {string}
 * @private
 */
ResourceActions.prototype._buildEventName = function () {
	var operation = this.resourceOperation.toUpperCase();
	return operation[operation.length - 1] === 'E' ? operation + 'D' : operation + 'ED';
};

/**
 * Determine an appropriate callback based on how we want to handle responses
 *
 * @param options
 * @returns {function(this:ResourceActions)}
 * @private
 */
ResourceActions.prototype._findAppropriateCallback = function (options) {
	if (typeof options.refresh === 'undefined') {
		return this.receiveResource.bind(this);
	} else if (options.refresh === 'list') {
		return this.refreshResourceList.bind(this);
	} else if (options.refresh === 'single') {
		return this.refreshResource.bind(this);
	}
};

/**
 * Accept response and dispatch an appropriately named event.
 *
 * @param data
 */
ResourceActions.prototype.receiveResource = function (data, paginationData) {
	paginationData = paginationData || {};

	var eventName = this.eventName ||
			this.resource.toUpperCase() + '_' + this._buildEventName(),
		eventData = this.eventData || null;
	// If this.resource isn't available here to dispatch an event, save it in a separate store?
	AppDispatcher.dispatch({
		type: eventName,
		eventData: eventData,
		data: data,
		paginationData: paginationData
	});
};

/**
 * Retrieve a resource by ID (GET)
 *
 * @param resource
 * @param options
 */
ResourceActions.prototype.getResource =  function (id, options) {
	this.options = options;
	this.resourceOperation = 'receive';
	if (options.eventName) this.eventName = options.eventName;
	if (options.eventData) this.eventData = options.eventData;

	ResourceApi.getResource(this.resource, id, options, this.receiveResource.bind(this));
};

/**
 * Retreive a list of resources (GET)
 *
 * @param options
 */
ResourceActions.prototype.listResource = function (options) {
	this.options = options;
	this.resourceOperation = 'list';
	if (options.eventName) this.eventName = options.eventName;
	if (options.eventData) this.eventData = options.eventData;

	ResourceApi.listResource(this.resource, options, this.receiveResource.bind(this));
};

/**
 * Create a resource (POST)
 *
 * @param resource
 * @param data
 * @param options
 * @todo should this refresh?
 */
ResourceActions.prototype.createResource = function (resource, options) {
	this.options = options;
	this.resourceOperation = 'create';
	ResourceApi.createResource(this.resource, resource, options, this._findAppropriateCallback(options));
};

/**
 * Update a resource (PUT)
 *
 * @param resource
 * @param data
 * @param options
 */
ResourceActions.prototype.updateResource = function (resource, options) {
	this.options = options;
	this.resourceOperation = 'update';
	ResourceApi.updateResource(this.resource, resource, options, this._findAppropriateCallback(options));
};

/**
 * Deactivate a resource (DELETE)
 *
 * @param resource
 * @param data
 * @param options
 */
ResourceActions.prototype.deactivateResource = function (resource, options) {
	this.options = options;
	this.resourceOperation = 'deactivate';
	ResourceApi.deactivateResource(this.resource, resource, options, this._findAppropriateCallback(options));
};

/**
 * Accept a response, filter it through, and begin a request to refresh data
 *
 * @param data
 */
ResourceActions.prototype.refreshResource = function (data) {
	this.receiveResource(data);
	this.getResource(this.resource, this.options);
};

/**
 * Accept a response, filter it through, and begin a request to refresh data
 *
 * @param data
 */
ResourceActions.prototype.refreshResourceList = function (data) {
	this.listResource(this.options);
};

module.exports = ResourceActions;;

