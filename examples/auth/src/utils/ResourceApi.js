var config = require('../config/config');
var api = require('./ApiService');

var ResourceApi = {
	baseUrl: config.base.apiVersionedUrl + 'users',

	applyGlobalHeaders: function (options) {
		if (typeof config.globalHeaders === 'undefined') {
			return options;
		}

		options.headers = options.headers || {};

		var globalHeaders = config.globalHeaders;

		for (var key in globalHeaders) {
			options.headers[key] = globalHeaders[key];
		}
		return options;
	},

	// @todo build options query string
	getResource: function (resource, id, options, cb) {
		var method = options.overrideMethod || 'get';
		options = this.applyGlobalHeaders(options);
		api[method](config.base.apiVersionedUrl + resource + '/' + id, options, cb);
	},

	listResource: function (resource, options, cb) {
		var method = options.overrideMethod || 'get';
		options = this.applyGlobalHeaders(options);
		api[method](config.base.apiVersionedUrl + resource, options, cb);
	},

	deactivateResource: function (resource, data, options, cb) {
		var method = options.overrideMethod || 'delete';
		options = this.applyGlobalHeaders(options);
		api[method](config.base.apiVersionedUrl + resource + '/' + data.id, data, options, cb);
	},

	updateResource: function (resource, data, options, cb) {
		var method = options.overrideMethod || 'put';
		options = this.applyGlobalHeaders(options);
		api[method](config.base.apiVersionedUrl + resource + '/' + data.id, data, options, cb);
	},

	createResource: function (resource, data, options, cb) {
		var method = options.overrideMethod || 'post';
		options = this.applyGlobalHeaders(options);
		api[method](config.base.apiVersionedUrl + resource, data, options, cb);
	}
};

module.exports = ResourceApi;

