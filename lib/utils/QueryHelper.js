module.exports = {
	/**
	 * Serialize an object into a string of query parameters. This does not return the beginning ?.
	 *
	 * @param object
	 * @returns {string}
	 */
	serialize: function (object) {
		var parts = [];
		for (var param in object) {
			parts.push(encodeURIComponent(param) + '=' + encodeURIComponent(object[param]));
		}

		return parts.join('&');
	},

	/**
	 * Break apart a query string into an object
	 *
	 * @param queryString
	 * @returns {{}}
	 */
	deserialize: function (queryString) {
		var pairs = queryString.split('&');

		var params = {};
		pairs.forEach(function(pair) {
			pair = pair.split('=');
			params[pair[0]] = decodeURIComponent(pair[1] || '');
		});

		return params;
	}
};
