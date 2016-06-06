var api = require('./ApiService');
var config = require('../config/config').base;

var AuthenticationApi = {
	baseUrl: config.apiVersionedUrl + 'users',

	client: {
		"client_id"     : config.clientId, // @todo real secrets and abstract
		"client_secret" : config.clientSecret,
		"scope"         : config.clientScopes
	},

	login: function (requestObject, cb) {
		var data = Object.assign(this.client, {
			"grant_type" : "password"
		});

		// Apply the unknown set of keys to the data object
		for (var key in requestObject) {
			data[key] = requestObject[key];
		}

		api.post(config.baseUrl + 'oauth/access_token', data, {noAuth: true}, cb);
	},

	refreshToken: function (refreshToken, cb, failedAuthHandler) {
		var data = Object.assign(this.client, {
			"grant_type"    : "refresh_token",
			"refresh_token" : refreshToken,
		});

		api.post(config.baseUrl + 'oauth/access_token', data, {errorHandler: failedAuthHandler}, cb);
	},

	selfAuth: function (cb, failedAuthHandler) {
		var modifiers = {
			include: []
		};

		api.get(config.apiVersionedUrl + 'me', {
			errorHandler: failedAuthHandler,
			dataNode  : 'data',
			modifiers : modifiers
		}, cb);
	},

	forgotPassword: function (requestObject, cb) {
		var options = {
			modifiers: {
				user: {
					app   : 'cms'
				}
			},
			noAuth:    true
		};

		// Apply the unknown set of keys to the options object
		for (var key in requestObject) {
			options.modifiers.user[key] = requestObject[key];
		}

		api.get(config.apiVersionedUrl + 'passwords', options, cb);
		cb(true); // @todo callback
	},

	resetPassword: function (data, options, cb) {
		var data = Object.assign(this.client, data);

		options.noAuth = true;

		api.post(config.apiVersionedUrl + 'passwords/reset', data, options, cb);
	}
};

module.exports = AuthenticationApi;
