/**
 * Generates a 16 character string to be used as a unique formKey
 * for components that do not inherit formKeys as a prop.
 *
 * @mixin
 */
var FormKeyMixin = {
	/**
	 * Creates a unique 16 character string to use as the interal formKey
	 *
	 * @private
	 * @return {String}
	 */
	_generateFormKey: function() {
		var formKey = '',
			possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 16; i++) {
			formKey += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return formKey;
	}

};

module.exports = FormKeyMixin;
